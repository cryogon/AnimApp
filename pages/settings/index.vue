<template>
  <main>
    <section class="anime-providers">
      <h3>Providers</h3>
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
    <section class="other-options">
      <h3>Appearance</h3>
      <div class="icon setting-option" @click="$router.push('/settings/theme')">
        <Icon name="mdi:theme-light-dark" size="35" />
        <span> Theme </span>
      </div>
      <div class="icon setting-option" @click="$router.push('/settings/user')">
        <Icon name="mdi:account" size="35" />
        <span> User </span>
      </div>
    </section>
  </main>
</template>
<style lang="scss" scoped>
main {
  padding: 0.5rem;
  .icon {
    display: inline-flex;
    align-items: center;
    gap: 10px;
  }
  .setting-option {
    cursor: pointer;
    display: flex;
  }
  .anime-providers {
    display: flex;
    gap: 10px;
    flex-direction: column;
    margin-block-end: 2rem;
    .provider {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
