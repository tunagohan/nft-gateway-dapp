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

        <div v-if="ownersState.owners.includes(walletAddress)">
          <p class="rounded p-3">Your Special User!</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from '@nuxtjs/composition-api'
import { Moralis } from 'Moralis'

export default defineComponent({
  setup() {
    const walletAddress = ref('0x0')
    const ownersState = reactive({
      owners: [] as string[],
    })
    const isLocked = ref(true)

    const serverUrl = process.env.moralisServerUrl || ''
    const appId = process.env.moralisAppId || ''
    const moralisSecret = process.env.moralisSecret || ''

    const connectWallet = async () => {
      await Moralis.start({ serverUrl, appId, moralisSecret })

      Moralis.Web3.authenticate().then((user: any) => {
        walletAddress.value = user.get(`ethAddress`)

        getNFTOwners().then((tokenIdOwners) => {
          tokenIdOwners['result']?.forEach((nft: any) => {
            ownersState.owners.push(nft.owner_of)
          })

          isLocked.value = false
        })
      })
    }

    const getNFTOwners = async () => {
      const options = {
        chain: 'polygon',
        address: '0x2953399124F0cBB46d2CbACD8A89cF0599974963',
        token_id:
          '90487491004223377861610073469700476664557803137508186316628633382456240637404',
        format: 'decimal',
      }

      const tokenIdOwners = await Moralis.Web3API.token
        .getTokenIdOwners(options)
        .then((tokenIdOwners) => tokenIdOwners)
      return tokenIdOwners
    }

    return {
      walletAddress,
      isLocked,
      connectWallet,
      ownersState,
    }
  },
})
</script>
