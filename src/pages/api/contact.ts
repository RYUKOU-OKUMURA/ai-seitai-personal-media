import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { name, email, category, message } = body;

    if (!name || !email || !category) {
      return new Response(
        JSON.stringify({ error: '必須項目を入力してください。' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const apiKey = import.meta.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('RESEND_API_KEY is not configured');
      return new Response(
        JSON.stringify({ error: 'メール送信の設定が完了していません。' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const resend = new Resend(apiKey);

    const categoryLabels: Record<string, string> = {
      consultation: 'AI導入の無料相談',
      training: '研修・セミナー依頼',
      media: '取材・メディア出演',
      other: 'その他',
    };

    const { error } = await resend.emails.send({
      from: 'お問い合わせフォーム <onboarding@resend.dev>',
      to: 'okumura@physical-balance-lab.net',
      replyTo: email,
      subject: `【お問い合わせ】${categoryLabels[category] || category} - ${name}様`,
      html: `
        <h2>ウェブサイトからのお問い合わせ</h2>
        <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
          <tr>
            <td style="padding: 8px 12px; border: 1px solid #ddd; background: #f9f9f9; font-weight: bold; width: 140px;">お名前</td>
            <td style="padding: 8px 12px; border: 1px solid #ddd;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; border: 1px solid #ddd; background: #f9f9f9; font-weight: bold;">メールアドレス</td>
            <td style="padding: 8px 12px; border: 1px solid #ddd;">${email}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; border: 1px solid #ddd; background: #f9f9f9; font-weight: bold;">ご相談内容</td>
            <td style="padding: 8px 12px; border: 1px solid #ddd;">${categoryLabels[category] || category}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; border: 1px solid #ddd; background: #f9f9f9; font-weight: bold;">詳細メッセージ</td>
            <td style="padding: 8px 12px; border: 1px solid #ddd;">${message ? message.replace(/\n/g, '<br>') : '（なし）'}</td>
          </tr>
        </table>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return new Response(
        JSON.stringify({ error: 'メールの送信に失敗しました。' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('Contact API error:', err);
    return new Response(
      JSON.stringify({ error: 'サーバーエラーが発生しました。' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
