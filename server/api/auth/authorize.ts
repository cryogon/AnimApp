import util from "util";
import request from "request";

const config = useRuntimeConfig();

export default defineEventHandler(async (e) => {
  const body = await readBody(e);
  const req = util.promisify(request);

  try {
    if (body.provider === "MAL") {
      const formData = {
        grant_type: "authorization_code",
        client_id: config.public.malClientId,
        client_secret: config.malClientSecret,
        redirect_uri: "http://localhost:3000/",
        code_verifier: body.codeVerifier,
        code: body.code,
      };
      const data = await req({
        uri: "https://myanimelist.net/v1/oauth2/token",
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        formData,
      });
      return data.body;
    } else {
      const data = await req({
        uri: "https://anilist.co/api/v2/oauth/token",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        json: {
          grant_type: "authorization_code",
          client_id: config.public.aniListClientId,
          client_secret: config.aniListClientSecret,
          redirect_uri: "http://localhost:3000/", // http://example.com/callback
          code: body.code, // The Authorization Code received previously
        },
      });
      return data.body;
    }
  } catch (err) {
    return { error: err };
  }
});
