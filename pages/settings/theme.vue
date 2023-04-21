<script setup lang="ts">
const previewPrefix = "settings-theme-preview__";
const availableThemes = ["forest-green", "theme-1", "theme-2"];
</script>
<template>
  <main>
    <header>
      <NuxtLink to="/settings" class="go-back">
        <Icon name="mdi:arrow-left" size="30" />
        <h2>Themes</h2>
      </NuxtLink>
    </header>
    <section class="themes">
      <figure
        v-for="(theme, index) in availableThemes"
        :key="index"
        class="theme-preview-item"
        :class="previewPrefix + theme"
      >
        <div class="background">
          <div class="search-bar"></div>
          <div class="box box-1"></div>
          <div class="box box-2"></div>
          <div class="nav-bar"></div>
        </div>
        <figcaption class="theme-name">{{ theme }}</figcaption>
      </figure>
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
  .themes {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    margin-block-start: 1rem;
    .theme-preview-item {
      cursor: pointer;
      text-align: center;
      .theme-name {
        width: 10.8rem;
        word-wrap: break-word;
      }
      .background {
        width: 10.8rem;
        height: 20rem;
        background-color: var(--background-primary);
        border-radius: 1rem;
        border: 2px solid var(--icon-color);
        padding: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
      }
      .search-bar {
        width: 100%;
        height: 2rem;
        background-color: var(--highlight-color);
        border-radius: 1rem;
      }
      .nav-bar {
        width: 100%;
        height: 2rem;
        background-color: var(--background-secondary);
        border-radius: 0.5rem;
      }
      .box {
        width: 3rem;
        aspect-ratio: 1/1;
        border-radius: 0.5rem;
      }
      .box-1 {
        background-color: var(--icon-color);
      }
      .box-2 {
        background-color: var(--text-color);
        align-self: flex-end;
      }
    }
  }
}
</style>
