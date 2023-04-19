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
  modules: [
    // 'nuxt-electron',
    "nuxt-icon",
    "@nuxtjs/eslint-module",
  ],
  // electron: {
  //     include: ['electron'],
  //     outDir: 'dist-electron',
  // },
  css: ["~/css/main.css"],
  eslint: {},
});
