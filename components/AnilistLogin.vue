<script setup lang="ts">
const config = useRuntimeConfig();
const url = new URL(`https://anilist.co/api/v2/oauth/authorize?client_id=${config.public.aniListClientId}&redirect_uri=http://localhost:3000/callback&response_type=code`)
</script>

<template>
    <a :href="url.href">Login with AniList</a>
</template>