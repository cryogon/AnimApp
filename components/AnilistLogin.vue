<script setup lang="ts">
const config = useRuntimeConfig();
const { isAniListConnected, loginWithAniList } = useAuth();
</script>

<template>
  <div>
    <button
      v-if="!isAniListConnected"
      type="button"
      class="anilist"
      @click="
        loginWithAniList({
          clientId: config.public.aniListClientId,
          redirectUri: 'http://localhost:3000/',
        })
      "
    >
      Connect
    </button>
    <span v-else>connected</span>
  </div>
</template>
