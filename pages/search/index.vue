<script setup lang="ts">
// const config = useRuntimeConfig();
const seasonalAnimeQuery = ref(`
query{
  Page(page:1,perPage:20){
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
  Page(page:1,perPage:20){
    media(sort:SCORE_DESC,type:ANIME){
      id
      idMal
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
const search = ref("");

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
    <input
      v-model="search"
      type="text"
      class="anime-search"
      placeholder="Search for anime"
      autocomplete="off"
      autosave="off"
      @keypress.enter="$router.push(`/search/${search}`)"
    />
    <section v-if="seasonalAnime" class="seasonal_anime">
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
    <section v-if="topAnime" class="top_anime">
      <h2>Top Anime</h2>
      <div class="anime-section">
        <div
          v-for="anime in topAnime"
          :key="anime.id"
          class="anime"
          @click="useRouter().push(`/anime/${anime.idMal}`)"
        >
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
  padding: 0.5rem;
  .anime-search {
    padding: 0.5rem;
    width: 95%;
    margin-block: 0.5rem;
    &::placeholder {
      color: #ffffffbb;
    }
  }
  section {
    margin-block-end: 2rem;
    .anime-section {
      display: flex;
      gap: 20px;
      margin-block-end: 0.5rem;
      overflow-x: auto;
      &::-webkit-scrollbar {
        display: none;
      }
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
      align-items: flex-end;
      .anime-title {
        width: 100%;
        word-break: break-all;
      }
    }
  }
}
</style>
