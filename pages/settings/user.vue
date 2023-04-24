<script setup lang="ts">
const { token } = useAuth();
</script>
<template>
  <main>{{ token }}</main>
</template>
