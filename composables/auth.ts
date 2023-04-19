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
  const clientId = ref<string | number>(
    (process.client && localStorage.getItem("clientId")) || ""
  );
  const redirectUri = ref(
    (process.client && localStorage.getItem("redirectUri")) || ""
  );
  const code = ref<string | null>();
  const tokenInfo = ref<AuthResponse>(
    JSON.parse(
      (process.client && localStorage.getItem("ani-code")) || `{}`
    ) satisfies AuthResponse
  );
  const isMalConnected = ref(
    !!(process.client && localStorage.getItem("isAuthMAL"))
  );
  const isAniListConnected = ref(
    !!(process.client && localStorage.getItem("isAuthAL"))
  );
  const authProvider = ref<"MAL" | "ANILIST">("ANILIST");
  const codeVerifier = ref(
    (process.client && localStorage.getItem("PKCE_V")) || ""
  );
  const loggedInProvider = new Array<"MAL" | "ANILIST">(2);

  function loginWithAniList(options: AuthOptions) {
    clientId.value = options.clientId;
    redirectUri.value = options.redirectUri;
    process.client &&
      localStorage.setItem("clientId", clientId.value.toString());
    process.client && localStorage.setItem("redirectUri", options.redirectUri);
    location.assign(
      `https://anilist.co/api/v2/oauth/authorize?client_id=${clientId.value}&redirect_uri=${redirectUri.value}&response_type=code`
    );
  }
  /**
   * Login in With MyAnimeList
   */
  function loginWithMAL(options: AuthOptions) {
    codeVerifier.value = getCodeVerifier(128);
    process.client && localStorage.setItem("PKCE_V", codeVerifier.value);
    clientId.value ||= options.clientId;
    redirectUri.value ||= options.redirectUri;

    process.client &&
      localStorage.setItem("clientId", clientId.value.toString());
    process.client && localStorage.setItem("redirectUri", options.redirectUri);

    location.assign(
      `https://myanimelist.net/v1/oauth2/authorize?response_type=code&client_id=${clientId.value}&redirect_uri=${redirectUri.value}&code_challenge=${codeVerifier.value}&state=login`
    );
  }
  /**
   * For Generating codeVerifier for my anime list login
   */
  function getCodeVerifier(len: number) {
    const str =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
    let codeVerifier = "";
    for (let i = 0; i < len; i++) {
      codeVerifier += str[Math.floor(Math.random() * str.length)];
    }
    return codeVerifier;
  }

  onMounted(async () => {
    const query = new URLSearchParams(window.location.search);
    if (query.has("code") && query.has("state")) {
      authProvider.value = "MAL";
    }
    if (query.has("code")) {
      code.value = query.get("code");
      try {
        const res = await fetch("/api/auth/authorize", {
          method: "POST",
          body: JSON.stringify({
            code: code.value,
            provider: authProvider.value,
            codeVerifier: codeVerifier.value,
          }),
        });
        const data = await res.json();
        const newData = {
          ...((await data) as Object),
          issued_in: Date.now(),
        } as AuthResponse;

        tokenInfo.value = newData;
        localStorage.setItem("ani-token", JSON.stringify(tokenInfo.value));
        window.history.pushState("home", "", window.location.origin);

        if (authProvider.value === "MAL") {
          isMalConnected.value = true;
          localStorage.setItem("isAuthMAL", "true");
        } else {
          isAniListConnected.value = true;
          localStorage.setItem("isAuthAL", "true");
        }

        if (!loggedInProvider.includes(authProvider.value)) {
          loggedInProvider.push(authProvider.value);
        }
      } catch {
        if (authProvider.value === "MAL") {
          isMalConnected.value = false;
          localStorage.removeItem("isAuthMAL");
        } else {
          isAniListConnected.value = false;
          localStorage.removeItem("isAuthAL");
        }
      }
      // Clearing Client Info so it can be replced with other client
      // Nitro Server Gives error since it cannot find localStorage in node environment
      // So need to check if it is being used by client not server;
      process.client && localStorage.removeItem("clientId");
      process.client && localStorage.removeItem("redirectUri");
      process.client && localStorage.removeItem("PKCE_V");
    }
    if (tokenInfo.value?.access_token) {
      if (localStorage.getItem("isAuthMAL")) isMalConnected.value = true;
      if (localStorage.getItem("isAuthAL")) isAniListConnected.value = true;
    }
    watchEffect(async () => {
      if (
        tokenInfo.value &&
        tokenInfo.value?.expires_in + tokenInfo.value?.issued_in < Date.now()
      ) {
        for (const provider of loggedInProvider) {
          const token = await useFetch("/api/auth/refresh", {
            method: "POST",
            body: { code: tokenInfo.value.refresh_token, provider },
          });
          const newData = {
            ...(token.data.value as Object),
            issued_in: Date.now(),
          } as AuthResponse;
          tokenInfo.value = newData;
        }
      }
    });
  });

  return {
    token: tokenInfo,
    loginWithAniList,
    isMalConnected,
    isAniListConnected,
    loginWithMAL,
  };
}
