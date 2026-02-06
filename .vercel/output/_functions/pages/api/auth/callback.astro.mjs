import { e as exchangeCodeForTokens, g as getUserInfo, i as isAllowedEmail } from '../../../chunks/googleAuth_GlYAoQtF.mjs';
import { c as createSessionToken, a as createSessionCookie } from '../../../chunks/session_KD2Cv45Q.mjs';
export { renderers } from '../../../renderers.mjs';

const getOAuthStateFromRequest = (request) => {
  const cookie = request.headers.get("cookie") ?? "";
  const match = cookie.match(/(?:^|;\s*)oauth_state=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
};
const clearOAuthStateCookie = () => {
  const isProduction = process.env.NODE_ENV === "production";
  return `oauth_state=; Path=/api/auth/callback; HttpOnly; SameSite=Lax; Max-Age=0${isProduction ? "; Secure" : ""}`;
};
const GET = async ({ url, redirect, request }) => {
  try {
    const code = url.searchParams.get("code");
    if (!code) {
      return redirect("/?error=missing_code");
    }
    const state = url.searchParams.get("state");
    const storedState = getOAuthStateFromRequest(request);
    if (!state || !storedState || state !== storedState) {
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/?error=invalid_state",
          "Set-Cookie": clearOAuthStateCookie()
        }
      });
    }
    const tokens = await exchangeCodeForTokens(code);
    const userInfo = await getUserInfo(tokens.access_token);
    if (!isAllowedEmail(userInfo.email)) {
      return redirect("/?error=unauthorized");
    }
    const sessionToken = await createSessionToken({
      email: userInfo.email,
      name: userInfo.name,
      picture: userInfo.picture
    });
    const headers = new Headers({
      Location: "/admin"
    });
    headers.append("Set-Cookie", createSessionCookie(sessionToken));
    headers.append("Set-Cookie", clearOAuthStateCookie());
    return new Response(null, {
      status: 302,
      headers
    });
  } catch (error) {
    console.error("OAuth callback error:", error);
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/?error=auth_failed",
        "Set-Cookie": clearOAuthStateCookie()
      }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
