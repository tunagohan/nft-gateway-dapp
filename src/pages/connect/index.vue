<template>
  <section class="h-screen w-screen flex justify-center items-center">
    <div class="flex justify-center items-center">
      <span class="mr-8">Please Login For Metamask</span>
      <button class="btn btn-metamask" @click="connectWallet">
        <img :src="require('@/assets/images/metamask.svg')" alt="Metamask" />
      </button>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, useRouter } from '@nuxtjs/composition-api'
import { Moralis } from 'moralis'

export default defineComponent({
  setup(_, { root: { $accessor } }) {
    const router = useRouter()

    const connectWallet = async () => {
      const serverUrl = process.env.moralisServerUrl
      const appId = process.env.moralisAppId
      const moralisSecret = process.env.moralisSecret
      await Moralis.start({ serverUrl, appId, moralisSecret })

      // 署名を行う
      Moralis.authenticate()
        .then((user: any) => {
          const walletAddress = user.get(`ethAddress`)
          $accessor.wallet.setAddress(walletAddress)
        })
        .then(() => {
          router.push('/my')
        })
    }

    return {
      connectWallet,
    }
  },
})
</script>
