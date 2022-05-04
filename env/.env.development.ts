import { NuxtOptionsEnv } from '@nuxt/types/config/env'

const envSet: NuxtOptionsEnv = {
  mode: process.env.NODE_ENV,
  nodeEnv: 'development',
  openSeaApiKey: process.env.OPENSEA_API_KEY,
  moralisServerUrl: process.env.MORALIS_SERVER_URL,
  moralisAppId: process.env.MORALIS_APP_ID,
  moralisSecret: process.env.MORALIS_SECRET,
}

export default envSet
