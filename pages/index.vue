<script setup lang="ts">
const config = useRuntimeConfig();

interface SeasonalAnimeOptions {
  /**
   * @default "0"
   */
  offset?: string;
  /**
   * @default "100"
   * max 500
   */
  limit?: string;
  /**
   * @default 2023
   */
  year: number;
  /**
   * @default "winter"
   */
  season: "winter" | "sprint" | "summer" | "fall";
}
async function getSeasonalAnime(options?: SeasonalAnimeOptions) {
  const {
    season = "winter",
    year = 2023,
    offset = "0",
    limit = "100",
  } = options || {};
  const params = new URLSearchParams();
  params.set("offset", offset);
  params.set("limit", limit);

  const url = `https://api.myanimelist.net/v2/anime/season/${year}/${season}?${params}`;
  try {
    const animes = await useAsyncData<any>("ani", () =>
      $fetch(url, {
        mode: "no-cors",
        headers: {
          "X-MAL-CLIENT-ID": config.public.malClientId,
        },
      })
    );
    return animes.data.value.data;
  } catch {
    return { msg: "Error" };
  }
}
const animes = await getSeasonalAnime();
</script>

<template>
  <main>
    <LoginButton />
    <section class="seasonal_anime">
      <h2>Seasonal Anime</h2>
      <div class="flex flex-wrap justify-between pe-5 ps-5 gap-1">
        <div
          class="anime__item flex "
          v-for="anime in animes"
          :key="anime.node"
        >
          <NuxtLink :to="`/anime/${anime.node.id}`" class="flex flex-col">
            <img
              :src="anime.node.main_picture.large"
              :alt="anime.node.title"
              class="w30"
            />
            <span class="w30">{{ anime.node.title }}</span>
          </NuxtLink>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped></style>
