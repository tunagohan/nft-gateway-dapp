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
          <div class="px-4 py-6 sm:px-0">
            <div class="mb-8">
              <label for="url" class="text-sm block">OpenSea Url</label>
              <input
                type="text"
                id="url"
                v-model="inputUrl"
                class="w-full py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50"
                placeholder="https://opensea.io/assets/matic/..."
              />
            </div>
          </div>

          <button
            @click="submit"
            class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          >
            調べる
          </button>
        </div>

        <div
          class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8"
          v-if="owners.length > 0"
        >
          <div v-for="(owner, index) in owners" :key="`${index}${owner}`">
            <span class="text-sm block">{{ owner }}</span>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import Header from '@/components/Header.vue'
import { Moralis } from 'moralis'

export default defineComponent({
  components: {
    Header,
  },
  setup(_, { root: { $accessor } }) {
    const walletAddress = ref($accessor.wallet.walletAddress)

    const inputUrl = ref('')
    const owners = ref([] as String[])

    const submit = async () => {
      await getNFTOwners()
    }

    const getNFTOwners = async () => {
      const contractAddress = inputUrl.value.split('/')[5]
      const tokenId = inputUrl.value.split('/')[6]

      const options = {
        chain: 'polygon',
        address: contractAddress,
        token_id: tokenId,
        format: 'decimal',
      }

      await Moralis.Web3API.token
        .getTokenIdOwners(options)
        .then((tokenIdOwners) => {
          tokenIdOwners['result']?.forEach((nft: any) => {
            owners.value.push(nft.owner_of)
          })
        })
    }

    return {
      submit,
      getNFTOwners,
      walletAddress,
      inputUrl,
      owners,
    }
  },
})
</script>
