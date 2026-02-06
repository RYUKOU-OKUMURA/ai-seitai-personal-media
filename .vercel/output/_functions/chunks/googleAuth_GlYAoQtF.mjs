const getConfig = () => {
  {
    throw new Error("GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET must be configured");
  }
};
const getGoogleAuthUrl = (state) => {
  const config = getConfig();
  const params = new URLSearchParams({
    client_id: config.clientId,
    redirect_uri: config.redirectUri,
    response_type: "code",
    scope: "openid email profile",
    ...state ? { state } : {}
  });
  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
};
const exchangeCodeForTokens = async (code) => {
  const config = getConfig();
  const params = new URLSearchParams({
    code,
    client_id: config.clientId,
    client_secret: config.clientSecret,
    redirect_uri: config.redirectUri,
    grant_type: "authorization_code"
  });
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString()
  });
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to exchange code for tokens: ${error}`);
  }
  return response.json();
};
const getUserInfo = async (accessToken) => {
  const response = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
    headers: { Authorization: `Bearer ${accessToken}` }
  });
  if (!response.ok) {
    throw new Error("Failed to get user info from Google");
  }
  return response.json();
};
const isAllowedEmail = (email) => {
  {
    throw new Error("ALLOWED_EMAILS must be configured");
  }
};

export { getGoogleAuthUrl as a, exchangeCodeForTokens as e, getUserInfo as g, isAllowedEmail as i };
