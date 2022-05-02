import { NuxtOptionsEnv } from '@nuxt/types/config/env'

module.exports = {
  mode: process.env.NODE_ENV,
  nodeEnv: 'development',
  openSeaApiKey: process.env.OPENSEA_API_KEY,
} as NuxtOptionsEnv
