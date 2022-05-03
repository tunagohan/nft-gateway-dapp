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
import { AbiItem } from 'web3-utils'
import { OpenSeaPort, Network } from 'opensea-js'
import { WyvernSchemaName, OpenSeaAsset } from 'opensea-js/lib/types'

export type OpenSeaNft = {
  name: ''
  imageUrl: ''
  description: ''
  permalink: ''
}

export interface Asset {
  // The asset's token ID, or null if ERC-20
  tokenId: string | null
  // The asset's contract address
  tokenAddress: string
  // The Wyvern schema name (defaults to "ERC721") for this asset
  schemaName?: WyvernSchemaName
  // Optional for ENS names
  name?: string
  // Optional for fungible items
  decimals?: number
}

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

    const handleEthereum = () => {
      const { ethereum } = window as any
      if (ethereum && ethereum.isMetaMask) {
        // console.log("Ethereum successfully detected!");
        console.log(ethereum.selectedAddress)
        const myaddress = ethereum.selectedAddress
        return myaddress
      } else {
        console.log('Please install MetaMask!')
      }
    }

    const getAccount = async () => {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })
      return accounts[0]
    }

    const getTokenBalance = (address: string) => {
      const web3 = new Web3()

      web3.setProvider(
        new Web3.providers.HttpProvider(
          'https://ropsten.infura.io/v3/674fa8842b484b24987e1267a15f06cc'
        )
      )

      const WALLET_ADDRESS = address
      const CONTRACT_ADDRESS = '0xc2fdf34114fccB32dF11f0852F61b9165Ec872fF'

      const minABI: AbiItem[] = [
        {
          constant: true,
          inputs: [{ name: '_owner', type: 'address' }],
          name: 'balanceOf',
          outputs: [{ name: 'balance', type: 'uint256' }],
          type: 'function',
        },
        {
          constant: true,
          inputs: [],
          name: 'decimals',
          outputs: [{ name: '', type: 'uint8' }],
          type: 'function',
        },
      ]

      const contract = new web3.eth.Contract(minABI, CONTRACT_ADDRESS)

      const balanceResult = contract.methods
        .balanceOf(WALLET_ADDRESS)
        .call()
        .then((res: any) => {
          console.log('balanceResult', res)
          const balance = contract.methods
            .decimals()
            .call()
            .then((decimal: any) => {
              console.log(decimal)
              return res / 10 ** decimal
            })
          return balance
        })
        .then((balance: any) => {
          return balance
        })
      return balanceResult
    }

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
      await getAccount().then((res: any) => {
        console.log('getAccount', res)
        walletAddress.value = res
        getOpenSeaAssets(res)
        getTokenBalance(res)
          .then((res: any) => {
            howmany.value = res
          })
          .finally(() => {
            load.value = true
          })
      })

      if (window.ethereum) return
      console.log('else mounted')
      window.addEventListener('ethereum#initialized', handleEthereum, {
        once: true,
      })
      setTimeout(handleEthereum, 3000)
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
