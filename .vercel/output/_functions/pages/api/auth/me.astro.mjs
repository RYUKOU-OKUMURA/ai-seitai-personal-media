import { g as getSessionFromRequest } from '../../../chunks/session_KD2Cv45Q.mjs';
export { renderers } from '../../../renderers.mjs';

const GET = async ({ request }) => {
  const user = await getSessionFromRequest(request);
  if (!user) {
    return new Response(JSON.stringify({ user: null }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  }
  return new Response(JSON.stringify({ user }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
