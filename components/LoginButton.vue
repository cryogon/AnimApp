<script setup lang="ts">
const c = useRuntimeConfig();
function generateCodeVerifier() {
  const length = 64;
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    result += charset[randomIndex];
  }
  return result;
}
function getURL() {
  const codeVerifier = generateCodeVerifier();
  if(process.client){
      localStorage.setItem("codeV", codeVerifier);
    }
  const query = new URLSearchParams({
    response_type: "code",
    client_id: c.public.malClientId,
    code_challenge: codeVerifier,
    redirect_uri: "http://localhost:3000/callback",
  });
  const url = new URL("https://myanimelist.net/v1/oauth2/authorize?" + query);
  return url.href;
}
</script>
<template>
    <a :href="getURL()" class="flex p10 border-rounded-5 bg-[#303030] text-green border-2">Login</a>
</template>