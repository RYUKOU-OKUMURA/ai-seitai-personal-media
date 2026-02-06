import { g as getSessionFromRequest } from './session_KD2Cv45Q.mjs';

const json = (data, init = {}) => {
  const headers = new Headers(init.headers);
  if (!headers.has("Content-Type")) headers.set("Content-Type", "application/json; charset=utf-8");
  return new Response(JSON.stringify(data), { ...init, headers });
};

const requireAdmin = async (request) => {
  const user = await getSessionFromRequest(request);
  if (user) {
    return null;
  }
  return json({ error: "Unauthorized" }, { status: 401 });
};

export { json as j, requireAdmin as r };
