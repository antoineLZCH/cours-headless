// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/image-edge', "@nuxtjs/strapi", '@sidebase/nuxt-auth'],
  runtimeConfig: {
    NUXT_SECRET: process.env.NUXT_SECRET,
    public: {
      strapiURL: process.env.STRAPI_URL || 'http://localhost:1337'
    }
  },
  strapi: {
    url: process.env.STRAPI_URL || 'http://localhost:1337',
    prefix: '/api',
    version: 'v4'
  },
  image: {
    provider: 'strapi',
    strapi: {
      baseURL: process.env.STRAPI_URL || 'http://localhost:1337/'
    }
  },
  auth: {
    origin: process.env.ORIGIN || 'http://localhost:3000',
    basePath: '/api/auth',
    enableGlobalAppMiddleware: true
  }
})
