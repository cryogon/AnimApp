<script setup lang="ts">
const config = useRuntimeConfig();
const {loginWithMAL,authorized,token}= useAuth();
function login(){
  loginWithMAL({
    clientId:config.public.malClientId,
    redirectUri:"http://localhost:3000/"
  })
}
</script>
<template>
  <div>
    <button type="button" @click="login" v-if="!authorized">Login With MyAnimeList</button>
    <span>{{ token?.access_token }}</span>
  </div>
</template>
