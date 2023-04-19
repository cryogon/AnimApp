<template>
  <nav class="navigation-bar">
    <RouterLink to="/">
      <Icon name="mdi:home" size="35" />
    </RouterLink>
    <RouterLink to="/search/">
      <Icon name="mdi:magnify" size="35" />
    </RouterLink>
    <RouterLink to="/settings">
      <Icon name="mdi:cog" size="35" />
    </RouterLink>
  </nav>
</template>
<style lang="scss" scoped>
.navigation-bar {
  width: 100%;
  height: 3.5rem;
  background-color: var(--background-secondary);
  display: flex;
  align-items: center;
  padding-inline: 3rem;
  justify-content: space-between;
  a {
    color: inherit;
  }
}
</style>
