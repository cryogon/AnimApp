<script setup lang="ts">
const config = useRuntimeConfig();
const { authorized, loginWithAniList } = useAuth({
  clientId: config.public.aniListClientId,
  redirectUri: useRoute().fullPath,
});

</script>

<template>
   <button type="button" class="anilist" v-if="authorized" @click="loginWithAniList">Login With Anilist</button>
</template>
