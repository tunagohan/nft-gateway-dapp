<template>
  <div>
    <div>
      <Header />

      <header class="bg-white shadow">
        <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold leading-tight text-gray-900">
            特定のNFTのOwner一覧を表示する
          </h1>
        </div>
      </header>
      <main>
        <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div class="px-4 py-6 sm:px-0"></div>
        </div>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import Header from '@/components/Header.vue'

export default defineComponent({
  components: {
    Header,
  },
  setup(_, { root: { $accessor } }) {
    const walletAddress = ref($accessor.wallet.walletAddress)
    // const owners = ref([] as String[])

    // const getNFTOwners = async () => {
    //   const options = {
    //     chain: 'polygon',
    //     address: '0x2953399124F0cBB46d2CbACD8A89cF0599974963',
    //     token_id:
    //       '90487491004223377861610073469700476664557803137508186316628633382456240637404',
    //     format: 'decimal',
    //   }
    //   const tokenIdOwners = await Moralis.Web3API.token
    //     .getTokenIdOwners(options)
    //     .then((tokenIdOwners) => tokenIdOwners)
    //   return tokenIdOwners
    // }

    return {
      walletAddress,
    }
  },
})
</script>
