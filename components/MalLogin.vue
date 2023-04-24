<script setup lang="ts">
const config = useRuntimeConfig();
const { loginWithMAL, isMalConnected, logout } = useAuth();
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
    <button v-else type="button" @click="logout('MAL')">Disconnect</button>
  </div>
</template>
