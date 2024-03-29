export default {
  // SSR: false and TARGET: 'static' = SPA
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static', // default is 'server'

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Glass Base',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      // favicon
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      // Inter
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~assets/css/main'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/numberFormatter.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    // https://google-analytics.nuxtjs.org/
    '@nuxtjs/google-analytics',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.NUXT_ENV_API_DOMAIN || 'http://localhost:8000',
  },

  // Google Analytics module configuration: https://google-analytics.nuxtjs.org/
  googleAnalytics: {
    id: process.env.NUXT_ENV_GOOGLE_ANALYTICS_ID,
    dev: process.env.NODE_ENV === 'development',
    debug: {
      enabled: process.env.NODE_ENV === 'development',
      sendHitTask: process.env.NODE_ENV === 'production',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
