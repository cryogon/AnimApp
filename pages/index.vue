<script setup lang="ts">
const config = useRuntimeConfig();
const seasonalAnimeQuery = ref(`
query{
  Page(page:1,perPage:10){
    media(season:WINTER seasonYear:2023){
      id
      title{
        english
        romaji
      }
      coverImage{
        large
      }
    }
  }
}`);
const topAnimeQuery = ref(`
query{
  Page(page:1,perPage:10){
    media(sort:SCORE_DESC,type:ANIME){
      id
      title{
        english
        romaji
      }
      coverImage{
        large
      }
    }
  }
}
`);
const { authorized, loginWithAniList, token } = useAuth({
  clientId: config.public.aniListClientId,
  redirectUri: useRoute().fullPath,
});

const seasonalAnime = ref();
const topAnime = ref();

function fetchAnime(query: string, type: "SEASONAL" | "TOP" | "RECOMMENDED") {
  fetch("https://graphql.anilist.co", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ query }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (type === "SEASONAL") seasonalAnime.value = data.data.Page.media;
      if (type === "TOP") topAnime.value = data.data.Page.media;
    });
}

interface AnimeTitle {
  english: string;
  romaji: string;
}
function getAnimeTitle(title: AnimeTitle | undefined) {
  if (title?.english) {
    const parsedTitle =
      title?.english.length < 20
        ? title?.english.substring(0, 30)
        : title?.english.substring(0, 30) + "...";
    return parsedTitle;
  }
  if (title?.romaji) {
    const parsedTitle =
      title?.romaji.length < 20
        ? title?.romaji.substring(0, 30)
        : title?.romaji.substring(0, 30) + "...";
    return parsedTitle;
  }
  return "undefined";
}
onMounted(() => {
  fetchAnime(seasonalAnimeQuery.value, "SEASONAL");
  fetchAnime(topAnimeQuery.value, "TOP");
});
</script>

<template>
  <main>
    <section class="seasonal_anime" v-if=seasonalAnime>
      <h2>Seasonal Anime</h2>
      <div class="anime-section">
        <div v-for="anime in seasonalAnime" :key="anime.id" class="anime">
          <div
            class="anime-cover"
            :style="`--cover-img:url(${anime.coverImage.large})`"
          >
            <span class="anime-title">{{ getAnimeTitle(anime.title) }}</span>
          </div>
        </div>
      </div>
    </section>
    <section class="top_anime" v-if="topAnime">
      <h2>Top Anime</h2>
      <div class="anime-section">
        <div v-for="anime in topAnime" :key="anime.id" class="anime">
          <div
            class="anime-cover"
            :style="`--cover-img:url(${anime.coverImage.large})`"
          >
            <span class="anime-title">{{ getAnimeTitle(anime.title) }}</span>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped lang="scss">
main {
  .anime-section {
    display: flex;
    gap: 20px;
    overflow-x: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .anime {
    .anime-cover {
      background: linear-gradient(
          to bottom,
          rgba(255, 255, 255, 0) 50%,
          rgb(0 0 0 / 0.6)
        ),
        var(--cover-img);
      border-radius: 0.5rem;
      background-repeat: no-repeat;
      background-size: cover;
      width: 145px;
      height: 211.38px;
      display: flex;
      align-items: end;
      .anime-title {
        width: 100%;
        word-break: break-all;
      }
    }
  }
}
</style>
