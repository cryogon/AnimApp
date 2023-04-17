// import { ref, unref, onMounted, onUnmounted, watchEffect } from "vue";

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
export function useAuth(options: AuthOptions) {
    const clientId = ref(options.clientId);
    // const clientSecret = ref(options.clientSecret);
    const redirectUri = ref(options.redirectUri);
    const code = ref<string | null>();
    const res = ref<AuthResponse>();
    const authorized = ref(false);
    function loginWithAniList() {
        location.assign(`https://anilist.co/api/v2/oauth/authorize?client_id=${clientId.value}&redirect_uri=${redirectUri.value}&response_type=code`)
    }

    onMounted(() => {
        const query = new URLSearchParams(window.location.search);
        if (query.has("code")) {
            code.value = query.get("code");
            useFetch("/api/auth/authorize", {
                method: "POST",
                body: { code: code.value }
            }).then(({ data }) => {
                const newData = { ...(data.value as Object), issued_in: Date.now() } as AuthResponse;
                res.value = newData;
                window.history.pushState("home","",window.location.origin);
                authorized.value = true;
                console.log(code,newData);
            })
        }
        if (res.value?.access_token) {
            authorized.value = true;
        }
        watchEffect(async () => {
            console.log("Called");
            if (res.value && (res.value?.expires_in + res.value?.issued_in) < Date.now()) {
                const token = await useFetch("/api/auth/refresh", { method: "POST", body: { code: res.value.refresh_token } })
                const newData = { ...(token.data.value as Object), issued_in: Date.now() } as AuthResponse;
                res.value = newData;
            }
        })
    })

    return { token: res, loginWithAniList, authorized };
}
