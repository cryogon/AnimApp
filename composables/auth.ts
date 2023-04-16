import { ref, unref, onMounted, onUnmounted, watchEffect } from "vue";

interface AuthOptions {
    clientId: string | number;
    clientSecret: string;
    redirectUri: string;
}

interface AuthResponse {
    access_token: string;
    refresh_token: string;
    issued_in: number;
    expires_in: number;
    token_type: string;
}
function useAuth(options: AuthOptions) {
    const clientId = ref(options.clientId);
    const clientSecret = ref(options.clientSecret);
    const redirectUri = ref(options.redirectUri);
    const code = ref<string|null>();
    const res = ref<AuthResponse>();
    function loginWithAniList() {
        if (code.value) {
            useFetch("/api/auth/**", {
                method: "POST",
                body: { code: code.value }
            }).then(({ data}) => {
                res.value = data.value;
            })
        }else{
            location.assign(`https://anilist.co/api/v2/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`)
        }
    }
    onMounted(()=>{
        const query = new URLSearchParams(location.href);
        if("code" in query){
            code.value = query.get("code");
        }
    })
}