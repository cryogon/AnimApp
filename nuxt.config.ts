// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    aniListClientSecret: process.env.NUXT_ANILIST_CLIENT_SECRET,
    malClientSecret: process.env.NUXT_MAL_CLIENT_SECRET,
    public: {
      malClientId: process.env.NUXT_MAL_CLIENT_ID,
      aniListClientId: process.env.NUXT_ANILIST_CLIENT_ID,
    },
  },
  modules: ["nuxt-icon", "@nuxtjs/eslint-module"],
  css: ["~/css/main.css"],
});
