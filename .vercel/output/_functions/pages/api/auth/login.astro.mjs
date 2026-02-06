import { a as getGoogleAuthUrl } from '../../../chunks/googleAuth_GlYAoQtF.mjs';
export { renderers } from '../../../renderers.mjs';

const createOAuthStateCookie = (state) => {
  const isProduction = process.env.NODE_ENV === "production";
  return `oauth_state=${state}; Path=/api/auth/callback; HttpOnly; SameSite=Lax; Max-Age=${60 * 10}${isProduction ? "; Secure" : ""}`;
};
const GET = async () => {
  try {
    const state = crypto.randomUUID();
    const authUrl = getGoogleAuthUrl(state);
    return new Response(null, {
      status: 302,
      headers: {
        Location: authUrl,
        "Set-Cookie": createOAuthStateCookie(state)
      }
    });
  } catch (error) {
    console.error("[OAuth Login Error]", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to initiate login";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
