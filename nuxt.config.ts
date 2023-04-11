// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    runtimeConfig:{
        public:{
            malClientId:process.env.NUXT_MAL_CLIENT_ID,
            malClientSecret:process.env.NUXT_MAL_CLIENT_SECRET
        }
    },
    modules: [
        '@unocss/nuxt'
    ],
    css:[
        "~/css/main.css"
    ],
})
