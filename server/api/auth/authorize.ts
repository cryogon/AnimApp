import request from "request";
import util from "util";
const config = useRuntimeConfig();
export default defineEventHandler(async e => {
    const body = await readBody(e);
    const options = {
        uri: 'https://anilist.co/api/v2/oauth/token',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        json: {
            'grant_type': 'authorization_code',
            'client_id': config.public.aniListClientId,
            'client_secret': config.aniListClientSecret,
            'redirect_uri': 'http://localhost:3000/', // http://example.com/callback
            'code': body.code, // The Authorization Code received previously
        }
    };
    const req = util.promisify(request);
    const data = await req(options)
        .then(res => {
            return res;
        })
        .catch(err => {
            return err;
        });
    return data.body;
})