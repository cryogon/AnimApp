
<template>
    <nav class="navigation-bar">
        <Icon name="mdi:home" size="35"/>
        <Icon name="mdi:magnify" size="35" @click="useRouter().push('/search/')"/>
        <Icon name="mdi:cog" size="35"/>
    </nav>
</template>
<style lang="scss" scoped>
.navigation-bar{
    width: 100%;
    height: 3.5rem;
    background-color: var(--background-secondary);
    display: flex;
    align-items: center;
    padding-inline: 3rem;
    justify-content: space-between;
}
</style>