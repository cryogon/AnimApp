<script setup lang="ts">
const { token } = useAuth();
console.log(token.MAL?.access_token === token.ANILIST?.access_token);
</script>
<template>
  <ClientOnly>
    <main>{{ token.MAL }}</main>
  </ClientOnly>
</template>
