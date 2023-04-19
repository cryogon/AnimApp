export interface AuthOptions {
    clientId: string | number;
    // clientSecret: string;
    redirectUri: string;
}

export interface AuthResponse {
    access_token: string;
    refresh_token: string;
    issued_in: number;
    expires_in: number;
    token_type: string;
}
export function useAuth() {
    const clientId = ref<string | number>(process.client && localStorage.getItem("clientId") || "");
    // const clientSecret = ref(options.clientSecret);
    const redirectUri = ref(process.client && localStorage.getItem("redirectUri") || "");
    const code = ref<string | null>();
    const tokenInfo = ref<AuthResponse>();
    const authorized = ref(process.client && localStorage.getItem("isAuth") ? true : false);
    const auth_provider = ref<"MAL" | "ANILIST">("ANILIST");
    const code_verifier = ref(process.client && localStorage.getItem("PKCE_V") || "");

    function loginWithAniList(options: AuthOptions) {
        clientId.value ||= options.clientId;
        redirectUri.value ||= options.redirectUri;
        process.client && localStorage.setItem("clientId", clientId.value.toString());
        process.client && localStorage.setItem("redirectUri", options.redirectUri);
        location.assign(`https://anilist.co/api/v2/oauth/authorize?client_id=${clientId.value}&redirect_uri=${redirectUri.value}&response_type=code`)


    }
    /**
     * Login in With MyAnimeList
     */
    function loginWithMAL(options: AuthOptions) {
        code_verifier.value = getCodeVerifier(128);
        process.client && localStorage.setItem("PKCE_V", code_verifier.value);
        clientId.value ||= options.clientId;
        redirectUri.value ||= options.redirectUri;

        process.client && localStorage.setItem("clientId", clientId.value.toString());
        process.client && localStorage.setItem("redirectUri", options.redirectUri);

        location.assign(`https://myanimelist.net/v1/oauth2/authorize?response_type=code&client_id=${clientId.value}&redirect_uri=${redirectUri.value}&code_challenge=${code_verifier.value}&state=login`);
    }
    /**
     * For Generating code_verifier for my anime list login
     */
    function getCodeVerifier(len: number) {
        const str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
        let code_verifier = "";
        for (let i = 0; i < len; i++) {
            code_verifier += str[Math.floor(Math.random() * str.length)];
        }
        return code_verifier;
    }

    onMounted(async () => {
        const query = new URLSearchParams(window.location.search);
        if (query.has("code") && query.has("state")) {
            auth_provider.value = "MAL";
        }
        if (query.has("code")) {
            code.value = query.get("code");

            const res = await fetch("/api/auth/authorize", {
                method: "POST",
                body: JSON.stringify({ code: code.value, provider: auth_provider.value, code_verifier: code_verifier.value })
            });
            const data = await res.json();
            const newData = { ...(await data as Object), issued_in: Date.now() } as AuthResponse;
            tokenInfo.value = newData;
            window.history.pushState("home", "", window.location.origin);
            authorized.value = true;

            //Clearing Client Info so it can be replced with other client
            //Nitro Server Gives error since it cannot find localStorage in node environment
            //So need to check if it is being used by client not server;
            process.client && localStorage.removeItem("clientId");
            process.client && localStorage.removeItem("redirectUri");
            process.client && localStorage.removeItem("PKCE_V");
        }
        if (tokenInfo.value?.access_token) {
            authorized.value = true;
        }
        watchEffect(async () => {
            if (tokenInfo.value && (tokenInfo.value?.expires_in + tokenInfo.value?.issued_in) < Date.now()) {
                const token = await useFetch("/api/auth/refresh", { method: "POST", body: { code: tokenInfo.value.refresh_token } })
                const newData = { ...(token.data.value as Object), issued_in: Date.now() } as AuthResponse;
                tokenInfo.value = newData;
            }
        })
    })

    return { token: tokenInfo, loginWithAniList, authorized, loginWithMAL };
}
