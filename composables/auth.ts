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
export interface TokenType {
  MAL: AuthResponse | null;
  ANILIST: AuthResponse | null;
}
export function useAuth() {
  const clientId = ref<string | number>(
    (process.client && localStorage.getItem("clientId")) || ""
  );
  const redirectUri = ref(
    (process.client && localStorage.getItem("redirectUri")) || ""
  );
  const code = ref<string | null>();
  const tokens = ref<TokenType>({
    MAL:
      (JSON.parse(
        (process.client && localStorage.getItem("token-mal")) || "{}"
      ) satisfies AuthResponse) || null,
    ANILIST:
      (JSON.parse(
        (process.client && localStorage.getItem("token-anilist")) || "{}"
      ) satisfies AuthResponse) || null,
  });
  const isMalConnected = ref(false);
  const isAniListConnected = ref(false);
  const authProvider = ref<"MAL" | "ANILIST">("ANILIST");
  const codeVerifier = ref(
    (process.client && localStorage.getItem("PKCE_V")) || ""
  );

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
    clientId.value = options.clientId;
    redirectUri.value = options.redirectUri;

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
        tokens.value[authProvider.value] = newData;
        authProvider.value === "ANILIST"
          ? localStorage.setItem("token-anilist", JSON.stringify(newData))
          : localStorage.setItem("token-mal", JSON.stringify(newData));
        process.client && localStorage.removeItem("clientId");
        process.client && localStorage.removeItem("redirectUri");
        process.client && localStorage.removeItem("PKCE_V");

        window.history.pushState("home", "", window.location.origin);

        if (authProvider.value === "MAL") {
          isMalConnected.value = true;
        } else {
          isAniListConnected.value = true;
        }
      } catch {
        if (authProvider.value === "MAL") {
          isMalConnected.value = false;
        } else {
          isAniListConnected.value = false;
        }
      }
      // Clearing Client Info so it can be replced with other client
      // Nitro Server Gives error since it cannot find localStorage in node environment
      // So need to check if it is being used by client not server;
    }

    // On Each Mount if tokens exists switch isconnected values
    console.log(tokens.value.MAL);
    tokens.value.ANILIST?.access_token
      ? (isAniListConnected.value = true)
      : (isAniListConnected.value = false);
    tokens.value.MAL?.access_token
      ? (isMalConnected.value = true)
      : (isMalConnected.value = false);

    // FIXME: Fix Refresh Token Handling for each provider seprately
    // For Handling Token Refreshing
    watchEffect(async () => {
      if (
        tokens.value.MAL?.access_token &&
        tokens.value.MAL?.expires_in + tokens.value.MAL?.issued_in < Date.now()
      ) {
        const token = await useFetch("/api/auth/refresh", {
          method: "POST",
          body: { code: tokens.value.MAL?.refresh_token, provider: "MAL" },
        });
        const newData = {
          ...(token.data.value as Object),
          issued_in: Date.now(),
        } as AuthResponse;
        tokens.value.MAL = newData;
        localStorage.setItem("token-mal", JSON.stringify(newData));
      }
      if (
        tokens.value.ANILIST?.access_token &&
        tokens.value.ANILIST?.expires_in + tokens.value.ANILIST?.issued_in <
          Date.now()
      ) {
        const token = await useFetch("/api/auth/refresh", {
          method: "POST",
          body: {
            code: tokens.value.ANILIST?.refresh_token,
            provider: "ANILIST",
          },
        });
        const newData = {
          ...(token.data.value as Object),
          issued_in: Date.now(),
        } as AuthResponse;
        tokens.value.ANILIST = newData;
        localStorage.setItem("token-anilist", JSON.stringify(newData));
      }
    });
  });
  function logout(provider: "MAL" | "ANILIST") {
    if (process.client) {
      if (provider === "MAL") {
        localStorage.removeItem("token-mal");
        tokens.value.MAL = null;
        isMalConnected.value = false;
      } else {
        localStorage.removeItem("token-anilist");
        tokens.value.ANILIST = null;
        isAniListConnected.value = false;
      }
    }
  }
  return {
    token: tokens.value,
    logout,
    loginWithAniList,
    isMalConnected,
    isAniListConnected,
    loginWithMAL,
  };
}
