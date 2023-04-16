<script setup lang="ts">
const route = useRoute();
const { id } = route.params;
const config = useRuntimeConfig();

const fields =
  "fields=id,title,main_picture,alternative_titles,start_date,end_date,synopsis,mean,rank,popularity,num_list_users,num_scoring_users,nsfw,created_at,updated_at,media_type,status,genres,my_list_status,num_episodes,start_season,broadcast,source,average_episode_duration,rating,pictures,background,related_anime,related_manga,recommendations,studios,statistics";
const anime = await useFetch(
  `https://api.myanimelist.net/v2/anime/${id}?${fields}`,
  {
    mode: "no-cors",
    headers: {
      "X-MAL-CLIENT-ID": config.public.malClientId,
    },
  }
);
</script>

<template>
  <div v-for="(anim,index) in anime.data.value" :key="index">
    <br/>
   {{ Object.keys(anime.data.value as Object)[index] }} {{ index }} : {{ anim}}
  </div>
</template>
