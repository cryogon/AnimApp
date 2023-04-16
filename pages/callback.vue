<script setup lang="ts">
const config = useRuntimeConfig();
const router = useRouter();
const { code } = router.currentRoute.value.query;
const {data,refresh} = await useFetch("/api/auth/**",{
  method:"POST",
  body:({code})
});
const auth = useState("auth");
if(data.value?.access_token){
  const issue_time = Date.now();
  auth.value = {issue_time,...data.value}
  console.log(auth.value);
  router.push("/");
}
</script>
<template>
  <main>
    <div>{{ data }}</div>
    <button @click="refresh()">Refetch</button>
  </main>
</template>
