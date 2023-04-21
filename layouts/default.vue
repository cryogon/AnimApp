<template>
  <main class="layout-main">
    <div class="content">
      <slot />
    </div>
    <footer>
      <NavBar class="nav" />
    </footer>
  </main>
</template>
<style scoped lang="scss">
main.layout-main {
  overflow-y: scroll;
  .content {
    height: 93vh;
  }
  .nav {
    position: fixed;
    bottom: 0;
  }
}
</style>
