import { NuxtOptionsEnv } from '@nuxt/types/config/env'

const envSet: NuxtOptionsEnv = {
  mode: process.env.NODE_ENV,
  nodeEnv: 'development',
  openSeaApiKey: process.env.OPENSEA_API_KEY,
}

export default envSet
