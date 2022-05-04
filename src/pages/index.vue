<template>
  <section class="h-screen w-screen flex justify-center items-center">
    <div class="flex justify-center items-center" v-if="!walletAddress">
      <span class="mr-8">Please Login For Metamask</span>
      <button class="btn btn-metamask" @click="login">
        <img :src="require('@/assets/images/metamask.svg')" alt="Metamask" />
      </button>
    </div>
    <div v-else>
      <div class="flex flex-col">
        <span class="rounded p-3"
          >Your Wallet Address: {{ walletAddress }}</span
        >
      </div>
      <div v-if="load" class="flex flex-col">
        <div>
          <p class="rounded p-3">Token ID: {{ assetInfo.tokenId }}</p>
          <p class="rounded p-3">
            Contract Address: {{ assetInfo.tokenAddress }}
          </p>
          <p class="rounded p-3">Name: {{ assetInfo.name }}</p>
          <p class="rounded p-3">Description: {{ assetInfo.description }}</p>
          <img class="rounded p-3" :src="assetInfo.imageUrl" alt="Asset" />
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from '@nuxtjs/composition-api'
import Web3 from 'web3'
import { OpenSeaPort, Network } from 'opensea-js'
import { OpenSeaAsset } from 'opensea-js/lib/types'

export default defineComponent({
  setup() {
    const walletAddress = ref(null)
    const howmany = ref(0)
    const load = ref(false)

    const assetInfo = reactive({
      tokenId: null as string | null,
      tokenAddress: null as string | null,
      name: null as string | null,
      description: null as string | null,
      externalLink: null as string | null,
      imagePreviewUrl: null as string | null,
      imageUrl: null as string | null,
      numSales: 0 as number,
    })

    // const handleEthereum = () => {
    //   const { ethereum } = window as any
    //   if (ethereum && ethereum.isMetaMask) {
    //     // console.log("Ethereum successfully detected!");
    //     console.log(ethereum.selectedAddress)
    //     const myaddress = ethereum.selectedAddress
    //     return myaddress
    //   } else {
    //     console.log('Please install MetaMask!')
    //   }
    // }

    // const getAccount = async () => {
    //   const accounts = await window.ethereum.request({
    //     method: 'eth_requestAccounts',
    //   })
    //   return accounts[0]
    // }

    const getOpenSeaAssets = async (accountAddress: string) => {
      const provider = new Web3.providers.HttpProvider(
        'https://mainnet.infura.io'
      )

      const seaport = new OpenSeaPort(provider, {
        networkName: Network.Main,
        apiKey: process.env.openSeaApiKey,
      })

      const tokenAddress = '0x495f947276749ce646f68ac8c248420045cb7b5e'
      const tokenId =
        '90487491004223377861610073469700476664557803137508186316628633393451356913665'

      await seaport.api
        .getAsset({
          tokenAddress, // string
          tokenId, // string | number | null
        })
        .then((asset: OpenSeaAsset) => {
          assetInfo.tokenId = asset.tokenId
          assetInfo.tokenAddress = asset.tokenAddress
          assetInfo.name = asset.name
          assetInfo.description = asset.description
          assetInfo.externalLink = asset.externalLink
          assetInfo.imagePreviewUrl = asset.imagePreviewUrl
          assetInfo.imageUrl = asset.imageUrl

          return asset
        })
    }

    const login = async () => {
      // Metamaskがインストールされていない
      if (typeof Web3 == 'undefined' && typeof window.ethereum == 'undefined') {
        console.log('Metamaskをインストールしてください')
        return
      }

      window.web3 = new Web3(window.ethereum)
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })

      window.web3.eth.personal
        .sign('特定のNFTを所有する人が見れるサイトへ署名する', accounts[0])
        .then((result: any) => {
          console.log(result)

          getOpenSeaAssets(accounts[0])

          walletAddress.value = accounts[0]

          load.value = true
        })
    }

    return {
      walletAddress,
      howmany,
      load,
      login,

      assetInfo,
    }
  },
})
</script>
