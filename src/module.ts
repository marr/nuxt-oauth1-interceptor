import { defineNuxtModule, createResolver, addServerHandler } from '@nuxt/kit'

// Module options TypeScript inteface definition
export interface ModuleOptions {
  baseUrl: string;
  consumerKey: string;
  consumerSecret: string;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'my-module',
    configKey: 'myModule'
  },
  // Default configuration options of the Nuxt module
  defaults: {
    baseUrl: '',
    consumerKey: '',
    consumerSecret: '',
  },
  setup (options, nuxt) {

    const resolver = createResolver(import.meta.url)
    addServerHandler({
      handler: resolver.resolve('./server/immutably'),
      route: '/authc/login'
    });
    // const resolver = createResolver(import.meta.url)

    // // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    // addPlugin({
    //   src: resolver.resolve('./runtime/plugin'),
    //   mode: 'server'
    // });
  }
})

