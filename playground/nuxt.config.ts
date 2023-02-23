export default defineNuxtConfig({
  modules: ['../src/module'],
  runtimeConfig: {
    public: {
      consumerRealm: process.env.CONSUMER_APP_REALM
    }
  },
  // myModule: {
  //   baseUrl: '',
  //   consumerKey: '123',
  //   consumerSecret: 'oo',
  // }
})
