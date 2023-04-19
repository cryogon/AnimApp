<template>
  <main class="layout-main">
    <slot />
    <footer>
      <NavBar class="nav" />
    </footer>
  </main>
</template>
<style scoped>
main.layout-main {
  display: flex;
  flex-direction: column;
}
.nav {
  position: fixed;
  bottom: 0;
  z-index: 99999;
}
</style>
