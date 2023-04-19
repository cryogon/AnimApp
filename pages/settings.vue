<template>
  <main>
    <section class="anime-providers">
      <div class="provider">
        <span class="icon">
          <Icon name="simple-icons:myanimelist" size="35" />
          <span>MyAnimeList</span>
        </span>
        <MalLogin />
      </div>
      <div class="provider">
        <span class="icon">
          <Icon name="simple-icons:anilist" size="35" />
          <span>AniList</span>
        </span>
        <AnilistLogin />
      </div>
    </section>
  </main>
</template>
<style lang="scss" scoped>
main {
  padding: 0.5rem;
  .anime-providers {
    display: flex;
    gap: 10px;
    flex-direction: column;
    .provider {
      display: flex;
      justify-content: space-between;
      .icon {
        display: inline-flex;
        align-items: center;
        gap: 10px;
      }
    }
  }
}
</style>
