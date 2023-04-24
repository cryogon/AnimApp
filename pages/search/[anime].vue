<script setup lang="ts">
const route = useRoute();
const offset = ref(0);
const { data: animes, execute } = useFetch("/api/anime", {
  method: "POST",
  body: { query: route.params.anime, offset },
});
const haveMore = ref(!!animes.value?.paging);

function loadMore() {
  offset.value += 10;
  execute();
}
</script>

<template>
  <main>
    <header>
      <NuxtLink to="/search/" class="go-back">
        <Icon name="mdi:arrow-left" size="30" />
        <h2>Search for: {{ $route.params.anime }}</h2>
      </NuxtLink>
    </header>
    <section class="search-results">
      <article
        v-for="({ node: anime }, index) in animes.data"
        :key="index"
        class="anime-item"
      >
        <img :src="anime.main_picture.medium" :alt="anime.title" />
        <div class="anime-info">
          {{ anime.title }}
        </div>
      </article>
      <ClientOnly>
        <button v-if="haveMore" @click="loadMore">Load More</button>
      </ClientOnly>
    </section>
  </main>
</template>
<style lang="scss" scoped>
main {
  padding: 0.8rem;
  header {
    .go-back {
      display: flex;
      gap: 10px;
    }
  }
  .search-results {
    .anime-item {
      display: flex;
      gap: 10px;
      border-radius: 1rem;
      margin-block: 1rem;
      border-block-end: 1px solid var(--icon-color);
      img {
        width: 8rem;
        height: 12rem;
      }
    }
  }
}
</style>
