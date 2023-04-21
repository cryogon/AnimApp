<script setup lang="ts">
const config = useRuntimeConfig();
const { loginWithMAL, isMalConnected } = useAuth();
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
    <span>connected</span>
  </div>
</template>
