<template>
  <main>
    <section class="anime-providers">
      <MalLogin />
      <AnilistLogin />
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
  }
}
</style>
