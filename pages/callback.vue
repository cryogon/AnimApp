<script setup lang="ts">
const config = useRuntimeConfig();
const route = useRoute();
const { code } = route.params;
function getItem() {
  return localStorage.getItem("codeV");
}

if (process.client) {
  try {
    const token = await fetch("https://myanimelist.net/v1/oauth2/token", {
      method: "POST",

      headers: {
        "Access-Control-Allow-Origin":"http://localhost:3000",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify({
        client_id: config.public.malClientId,
        client_secret: config.public.malClientSecret,
        grant_type: "authorization_code",
        code,
        code_verifier: getItem(),
      }),
    });

    console.log(token);
  } catch (err) {
    console.error(err);
  }
}
</script>
<template>
  <div>Hmm</div>
</template>
