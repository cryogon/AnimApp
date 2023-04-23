<script setup lang="ts">
const { token } = useAuth();
type AnimeStatus =
  | "watching"
  | "completed"
  | "on_hold"
  | "dropped"
  | "plan_to_watch"
  | "all";

const animelist = ref();
const status: AnimeStatus = "all";
const { data } = await useFetch("/api/anime/me", {
  method: "POST",
  body: {
    accessToken: token.MAL?.access_token,
    status,
  },
});
animelist.value = data.data;
</script>

<template>
  <main>
    {{ animelist }}
    <div v-for="(anime, index) in animelist" :key="index" class="anime-item">
      {{ anime }}
    </div>
  </main>
</template>

<style scoped lang="scss"></style>
