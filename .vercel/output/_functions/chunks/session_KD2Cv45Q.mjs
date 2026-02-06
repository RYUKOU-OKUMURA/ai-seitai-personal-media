import { jwtVerify, SignJWT } from 'jose';

const getSecret = () => {
  throw new Error("JWT_SECRET is not configured");
};
const createSessionToken = async (user) => {
  const token = await new SignJWT({ user }).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("7d").sign(getSecret());
  return token;
};
const verifySessionToken = async (token) => {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload.user || null;
  } catch {
    return null;
  }
};
const getSessionFromRequest = async (request) => {
  const cookie = request.headers.get("cookie");
  if (!cookie) return null;
  const match = cookie.match(/session=([^;]+)/);
  if (!match) return null;
  return verifySessionToken(match[1]);
};
const createSessionCookie = (token) => {
  const isProduction = process.env.NODE_ENV === "production";
  return `session=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 24 * 7}${isProduction ? "; Secure" : ""}`;
};
const clearSessionCookie = () => {
  return "session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0";
};

export { createSessionCookie as a, clearSessionCookie as b, createSessionToken as c, getSessionFromRequest as g };
