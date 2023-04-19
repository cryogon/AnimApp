<script setup lang="ts">
const config = useRuntimeConfig();
const { authorized, loginWithAniList,token } = useAuth();
</script>

<template>
  <div>

    <button
    type="button"
    class="anilist"
    v-if="!authorized"
    @click="
      loginWithAniList({
        clientId: config.public.aniListClientId,
        redirectUri: 'http://localhost:3000/',
      })
      "
  >
  Login With Anilist
</button>
<span v-else>{{ token }}</span>
</div>
</template>
