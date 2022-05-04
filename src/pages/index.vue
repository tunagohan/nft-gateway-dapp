<template>
  <section class="h-screen w-screen flex justify-center items-center">
    <div class="flex justify-center items-center" v-if="isLocked">
      <span class="mr-8">Please Login For Metamask</span>
      <button class="btn btn-metamask" @click="connectWallet">
        <img :src="require('@/assets/images/metamask.svg')" alt="Metamask" />
      </button>
    </div>
    <div v-else>
      <div class="flex flex-col">
        <span class="rounded p-3"
          >Your Wallet Address: {{ walletAddress }}</span
        >
        <p class="rounded p-3">super user!</p>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { ethers } from 'ethers'

export default defineComponent({
  setup() {
    const walletAddress = ref('0x0')
    const isLocked = ref(true)

    const connectWallet = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        if (provider) {
          await provider.send('eth_requestAccounts', [])
          const signer = provider.getSigner()
          walletAddress.value = await signer.getAddress()
          isLocked.value = false
        } else {
          return {
            error: 'Please install Metamask at https://metamask.io',
          }
        }
      } catch (error) {
        return {
          error: 'An unexpected error occurs',
        }
      }
    }

    return {
      walletAddress,
      isLocked,
      connectWallet,
    }
  },
})
</script>
