<script setup lang="ts">
const config = useRuntimeConfig();
const { loginWithMAL, isMalConnected, token } = useAuth();
function login() {
  loginWithMAL({
    clientId: config.public.malClientId,
    redirectUri: "http://localhost:3000/",
  });
}
</script>
<template>
  <div>
    <button v-if="!isMalConnected" type="button" @click="login">Connect</button>
    <span>{{ token?.access_token }}</span>
  </div>
</template>
