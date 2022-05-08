<template>
  <nav class="bg-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline">
              <a
                href="/find_owner"
                class="px-3 py-2 rounded-md text-sm font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700"
                >Check NFT Owner's</a
              >
              <a
                href="/bulk_transfer"
                class="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                >Bulk Transfer</a
              >
            </div>
          </div>
        </div>
        <div class="hidden md:block">
          <div v-if="isMatic" class="ml-4 flex items-center ml-6 mr-6">
            <span class="invisible lg:visible text-white ml-6 mr-6">
              {{ walletAddress }}
            </span>
            <button
              @click="copyAddress"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
            >
              Copy!
            </button>

            <button
              @click="logout"
              class="ml-6 bg-transparent text-white font-bold py-2 px-4 rounded-full"
            >
              Logout
            </button>
          </div>

          <div v-else class="ml-4 flex items-center ml-6 mr-6">
            <button
              @click="switchNetwork"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
            >
              Switch Network Matic Network
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref, useRouter } from '@nuxtjs/composition-api'
import { success } from '@/utils/notyf'
import { Moralis } from 'moralis'

export default defineComponent({
  setup(_, { root: { $accessor, $copyText } }) {
    const router = useRouter()
    const walletAddress = ref($accessor.wallet.walletAddress)
    const maticChainId = '0x89'

    const currentChainId = ref($accessor.wallet.currentChainId)
    const isMatic = ref(currentChainId.value === maticChainId)

    const copyAddress = () => {
      $copyText(walletAddress.value).then(() => {
        success('コピーしました')
      })
    }

    const switchNetwork = async () => {
      if (!isMatic.value) {
        await Moralis.switchNetwork(maticChainId).then(() => {
          currentChainId.value = maticChainId
          isMatic.value = true
        })
      }
    }

    const logout = async () => {
      await Moralis.User.logOut().then(() => {
        success('ログアウトしました')
        router.push('/')
      })
    }

    return {
      currentChainId,
      copyAddress,
      walletAddress,
      switchNetwork,
      isMatic,
      logout,
    }
  },
})
</script>
