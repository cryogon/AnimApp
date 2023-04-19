<script setup lang="ts">
const config = useRuntimeConfig();
const { authorized, loginWithAniList, token } = useAuth();
</script>

<template>
  <div>
    <button
      v-if="!authorized"
      type="button"
      class="anilist"
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
