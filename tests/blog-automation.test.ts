import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import {
  buildContextMarkdown,
  prepareDailyBlogContext,
  type BlogAutomationHistoryEntry,
} from '../scripts/prepare-daily-blog-context.ts';
import { postMarkdownFileToMicroCMS } from '../scripts/post-to-microcms.ts';
import { publishBlogToSlack, publishSkipToSlack } from '../scripts/post-blog-to-slack.ts';

const LONG_BODY = `# 見出し

これは十分に長い本文です。ブログ自動化の主ソース候補として使える程度の具体性を持たせます。

複数段落を用意して、要点だけではなく考え方の流れも含めます。整体とAIの交差点に触れる内容です。

最後にもう一段落加えて、文字数が十分に入るようにします。読んだときに主題が取れる長さを維持します。
`;

test('prepareDailyBlogContext follows symlinks and excludes recently used main sources', () => {
  const root = mkdtempSync(join(tmpdir(), 'blog-automation-'));
  const projectRoot = join(root, 'project');
  const realRoot = join(root, 'real-sources');
  const historyPath = join(projectRoot, 'automation', '.state', 'blog_automation_history.json');

  mkdirSync(join(projectRoot, 'sources'), { recursive: true });
  mkdirSync(join(projectRoot, 'automation', '.state'), { recursive: true });
  mkdirSync(join(realRoot, 'AI系'), { recursive: true });
  mkdirSync(join(realRoot, '脳内メモ'), { recursive: true });
  mkdirSync(join(realRoot, 'noteメンバーシップ', 'ぶっちゃけ日記', '投稿済み'), { recursive: true });

  writeFileSync(join(realRoot, 'AI系', 'used.md'), `${LONG_BODY}\n${'既存 '.repeat(120)}\n`, 'utf8');
  writeFileSync(join(realRoot, 'AI系', 'fresh.md'), `${LONG_BODY}\n${'新規 '.repeat(140)}\n`, 'utf8');
  writeFileSync(join(realRoot, '脳内メモ', 'voice-a-SNS-2026-03-10-1000.md'), `${LONG_BODY}\n${'文体 '.repeat(60)}\n`, 'utf8');
  writeFileSync(join(realRoot, '脳内メモ', 'voice-b-SNS-2026-03-09-1000.md'), `${LONG_BODY}\n${'余韻 '.repeat(55)}\n`, 'utf8');
  writeFileSync(
    join(realRoot, 'noteメンバーシップ', 'ぶっちゃけ日記', '投稿済み', 'support.md'),
    `${LONG_BODY}\n${'補助 '.repeat(90)}\n`,
    'utf8',
  );

  symlinkSync(join(realRoot, 'AI系'), join(projectRoot, 'sources', 'AI系'));
  symlinkSync(join(realRoot, '脳内メモ'), join(projectRoot, 'sources', '脳内メモ'));
  symlinkSync(
    join(realRoot, 'noteメンバーシップ'),
    join(projectRoot, 'sources', 'noteメンバーシップ'),
  );

  const historyEntries: BlogAutomationHistoryEntry[] = [
    {
      date: '2026-03-11',
      kind: 'blog',
      contentHash: 'hash-001',
      postedAt: '2026-03-11T01:00:00.000Z',
      mainSource: 'sources/AI系/used.md',
      blogPath: 'src/content/blog/used.md',
    },
  ];
  writeFileSync(historyPath, JSON.stringify({ entries: historyEntries }, null, 2), 'utf8');

  const context = prepareDailyBlogContext('2026-03-12', {
    historyPath,
    mainSourceDir: join(projectRoot, 'sources', 'AI系'),
    styleDir: join(projectRoot, 'sources', '脳内メモ'),
    auxiliaryDir: join(projectRoot, 'sources', 'noteメンバーシップ', 'ぶっちゃけ日記', '投稿済み'),
    projectRoot,
  });

  assert.equal(context.mainCandidates.length, 1);
  assert.equal(context.mainCandidates[0].path, 'sources/AI系/fresh.md');
  assert.equal(context.styleReferences.length, 2);
  assert.equal(context.auxiliaryCandidates.length, 1);

  const markdown = buildContextMarkdown(context);
  assert.match(markdown, /AI系 主ソース候補/);
  assert.match(markdown, /sources\/AI系\/fresh\.md/);
  assert.deepEqual(context.excludedRecentSources, ['sources/AI系/used.md']);
});

test('publishBlogToSlack builds full message, posts once, and skips duplicate by main source', async () => {
  const root = mkdtempSync(join(tmpdir(), 'blog-slack-'));
  const blogPath = join(root, 'src', 'content', 'blog', 'sample.md');
  const sourcesPath = join(root, 'automation', '.tmp', 'used_sources_2026-03-12.json');
  const historyPath = join(root, 'automation', '.state', 'blog_automation_history.json');

  mkdirSync(join(root, 'src', 'content', 'blog'), { recursive: true });
  mkdirSync(join(root, 'automation', '.tmp'), { recursive: true });
  mkdirSync(join(root, 'automation', '.state'), { recursive: true });

  writeFileSync(
    blogPath,
    `---
title: "AI導入の助走をどう作るか"
slug: "ai-dounyuu-josou"
publishedAt: "2026-03-12T00:00:00.000Z"
category: "実践ノウハウ"
image: ""
excerpt: "AI導入で最初に整えるべき助走の作り方を整理した下書きです。"
draft: true
---

導入でつまずく人を見るたびに、最初に必要なのは気合いより助走だと感じます。

いきなり全部を変えようとすると、現場では確実に止まります。だからこそ、最初の一歩を小さく設計することが重要です。
`,
    'utf8',
  );
  writeFileSync(
    sourcesPath,
    JSON.stringify(
      [
        {
          role: 'main',
          path: 'sources/AI系/fresh.md',
          title: 'AI導入の助走',
          reason: '主題と記事タイトルの軸が一致しているため',
        },
        {
          role: 'style',
          path: 'sources/脳内メモ/voice-a-SNS-2026-03-10-1000.md',
          title: 'voice-a',
          reason: '導入の温度感を合わせるため',
        },
      ],
      null,
      2,
    ),
    'utf8',
  );

  const sentMessages: string[] = [];
  const postResults: string[] = [];

  const first = await publishBlogToSlack(
    {
      reportDate: '2026-03-12',
      blogPath,
      sourcesPath,
      historyPath,
      cmsDraft: true,
    },
    {
      sendSlack: async (_webhookUrl, message) => {
        sentMessages.push(message);
      },
      postToMicroCMS: async () => {
        postResults.push('called');
        return {
          absolutePath: blogPath,
          relativePath: 'src/content/blog/sample.md',
          contentType: 'blog',
          endpoint: 'blogs',
          id: 'ai-dounyuu-josou',
          isDraft: true,
          managementUrl: 'https://example.microcms.io/apis/blogs/content/ai-dounyuu-josou',
          payload: { title: 'AI導入の助走をどう作るか' },
          title: 'AI導入の助走をどう作るか',
        };
      },
    },
  );

  const second = await publishBlogToSlack(
    {
      reportDate: '2026-03-12',
      blogPath,
      sourcesPath,
      historyPath,
      cmsDraft: true,
    },
    {
      sendSlack: async (_webhookUrl, message) => {
        sentMessages.push(message);
      },
      postToMicroCMS: async () => {
        throw new Error('should not be called on duplicate');
      },
    },
  );

  assert.equal(first.delivered, true);
  assert.equal(first.skippedDuplicate, false);
  assert.equal(second.delivered, false);
  assert.equal(second.skippedDuplicate, true);
  assert.equal(postResults.length, 1);
  assert.equal(sentMessages.length, 1);
  assert.match(sentMessages[0], /タイトル: AI導入の助走をどう作るか/);
  assert.match(sentMessages[0], /sources\/AI系\/fresh\.md/);
  assert.match(sentMessages[0], /https:\/\/example\.microcms\.io/);
  assert.match(sentMessages[0], /本文:/);
});

test('publishSkipToSlack posts once and skips duplicate skip notifications', async () => {
  const root = mkdtempSync(join(tmpdir(), 'blog-skip-'));
  const historyPath = join(root, 'automation', '.state', 'blog_automation_history.json');
  mkdirSync(join(root, 'automation', '.state'), { recursive: true });

  const sentMessages: string[] = [];
  const first = await publishSkipToSlack(
    {
      reportDate: '2026-03-12',
      reason: '候補不足のため本日は未作成',
      historyPath,
    },
    {
      sendSlack: async (_webhookUrl, message) => {
        sentMessages.push(message);
      },
    },
  );
  const second = await publishSkipToSlack(
    {
      reportDate: '2026-03-12',
      reason: '候補不足のため本日は未作成',
      historyPath,
    },
    {
      sendSlack: async (_webhookUrl, message) => {
        sentMessages.push(message);
      },
    },
  );

  assert.equal(first.delivered, true);
  assert.equal(second.skippedDuplicate, true);
  assert.equal(sentMessages.length, 1);
  assert.match(sentMessages[0], /本日のブログ下書きは未作成です/);
});

test('postMarkdownFileToMicroCMS is reusable from other scripts', async () => {
  const root = mkdtempSync(join(tmpdir(), 'microcms-export-'));
  const blogPath = join(root, 'src', 'content', 'blog', 'sample.md');
  mkdirSync(join(root, 'src', 'content', 'blog'), { recursive: true });

  writeFileSync(
    blogPath,
    `---
title: "microCMS export test"
slug: "microcms-export-test"
publishedAt: "2026-03-12T00:00:00.000Z"
category: "マインド"
image: ""
excerpt: "Reusable export test"
draft: true
---

本文です。
`,
    'utf8',
  );

  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async (_input: RequestInfo | URL, init?: RequestInit) => {
    assert.equal(init?.method, 'PATCH');
    return new Response(JSON.stringify({ id: 'microcms-export-test' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }) as typeof fetch;

  try {
    const result = await postMarkdownFileToMicroCMS(blogPath, {
      forceDraft: true,
      serviceDomain: 'example-service',
      apiKey: 'example-key',
    });

    assert.equal(result.endpoint, 'blogs');
    assert.equal(result.id, 'microcms-export-test');
    assert.equal(result.isDraft, true);
    assert.match(result.managementUrl, /example-service\.microcms\.io/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
