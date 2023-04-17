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
            'grant_type': 'refresh_token',
            'client_id': config.public.aniListClientId,
            'client_secret': config.aniListClientSecret,
            'refresh_token': body.code, // The Authorization Code received previously
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