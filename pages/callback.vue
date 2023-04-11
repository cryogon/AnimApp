<script setup lang="ts">
const config = useRuntimeConfig();
const code = useRouter().currentRoute.value.query.code;
function getItem() {
  return localStorage.getItem("codeV");
}

if (process.client) {
  try {
    const token = await useFetch("https://myanimelist.net/v1/oauth2/token", {
      method: "POST",
      mode: "no-cors",
      headers: {
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
