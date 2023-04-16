<script setup lang="ts">
import axios from 'axios';

const config = useRuntimeConfig();
const authorized = ref(false);
const auth = useState("auth");
const query = ref(`
query{
  Page(page:1){
    media{
      title{
        english
        native
      }
    }
  }
}`)
const accessToken = ref();
// const anime = await axios.post('https://graphql.anilist.co',{
//   query:query
// },{
//   headers:{
//     'Authorization': 'Bearer ' + accessToken,
//     'Content-Type': 'application/json',
//     'Accept': 'application/json'
//   }
// })
onMounted(()=>{
  if(auth.value){
    authorized.value = true;
    console.log(auth.value);
    accessToken.value = auth.value;
  }
})
</script>

<template>
  <main>
    <section class="seasonal_anime">
      <AnilistLogin v-if="!authorized"/>
      <div v-else>
        <!-- {{ anime }} -->
      </div>
    </section>
  </main>
</template>

<style scoped></style>
