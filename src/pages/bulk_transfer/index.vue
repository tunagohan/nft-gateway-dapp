<template>
  <div>
    <div>
      <Header />

      <header class="bg-white shadow">
        <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold leading-tight text-gray-900">
            一括でNFTをTransferする
          </h1>
        </div>
      </header>
      <main>
        <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <b-field>
            <b-upload v-model="dropFile" drag-drop>
              <section class="section">
                <div class="content has-text-centered">
                  <p>
                    <b-icon icon="upload" size="is-large" />
                  </p>
                  <p>
                    ファイルをドロップするか、ここをクリックしてアップロードするファイルを選択してください。
                  </p>
                </div>
              </section>
            </b-upload>
          </b-field>

          <div class="block" v-if="dropFile">
            <div class="tags">
              <span class="tag is-primary">
                {{ dropFile.name }}
                <button
                  class="delete is-small"
                  type="button"
                  @click="deleteDropFile"
                />
              </span>
            </div>
            <button
              v-if="csvData.length === 0"
              class="button is-primary"
              @click="uploadedData"
            >
              読み込む
            </button>
          </div>
        </div>

        <div
          v-if="csvData.length > 0"
          class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8"
        >
          <div class="px-4 py-6 sm:px-0">
            <div class="mb-8">
              <label for="url" class="text-sm block">OpenSea Asset URL</label>
              <input
                type="text"
                id="url"
                v-model="inputUrl"
                class="w-full py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50"
                placeholder="https://opensea.io/assets/matic/..."
              />
            </div>
          </div>

          <button class="button is-primary" @click="sendTransfer">
            Transferする
          </button>
          <div class="table-wrapper">
            <table class="table">
              <thead>
                <tr>
                  <th>Address</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in csvData" :key="index">
                  <td>{{ item.walletAddress }}</td>
                  <td>{{ item.amount }}</td>
                </tr>
              </tbody>
            </table>
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

type CsvData = {
  walletAddress: string
  amount: string
}

type TransferType = 'native' | 'erc20' | 'erc721' | 'erc1155'
type TransferSystem = 'evm'
type TransferOptions = {
  type?: TransferType
  receiver?: string
  contractAddress?: string
  contract_address?: string
  amount?: string
  tokenId?: number | string
  token_id?: number | string
  system?: TransferSystem
}

export default defineComponent({
  components: {
    Header,
  },
  setup(_) {
    const dropFile = ref(null as { name: String; data: any } | null)
    const csvData = ref([] as CsvData[])

    const inputUrl = ref('')

    const deleteDropFile = () => {
      dropFile.value = null
      csvData.value = []
      inputUrl.value = ''
    }

    const uploadedData = () => {
      csvData.value = []
      const csvfile = dropFile.value
      const reader: any = new FileReader()

      const loadCSV = () => {
        const lines = reader.result.split('\n') // 改行毎にデータを分ける
        lines.shift() // csvファイルの先頭（ヘッダ）を削除
        // csvファイルの各行をcsvDataにオブジェクトとしてpushする
        lines.forEach((element: any) => {
          const workerData = element.split(',') // 区切り文字はカンマ
          csvData.value.push({
            walletAddress: workerData[0],
            amount: workerData[1],
          })
        })
      }
      reader.onload = loadCSV
      reader.readAsText(csvfile)
    }

    const sendTransfer = () => {
      const contractAddress = inputUrl.value.split('/')[5]
      const tokenId = inputUrl.value.split('/')[6]

      csvData.value.forEach(async (element) => {
        const receiver = element.walletAddress.trim()
        const amount = element.amount.trim()

        const options: TransferOptions = {
          type: 'erc1155',
          receiver: receiver,
          contractAddress: contractAddress,
          tokenId: tokenId,
          amount: amount,
        }
        console.log(options)

        await Moralis.transfer(options)
      })
    }

    return {
      dropFile,
      csvData,
      inputUrl,

      deleteDropFile,
      uploadedData,
      sendTransfer,
    }
  },
})
</script>
