import Vue from 'vue'
import { getAccessorType, getterTree, mutationTree } from 'typed-vuex'

export const initialState = {
  walletAddress: '' as String,
  currentChainId: '' as String,
}

export const state = () => ({
  walletAddress: '' as String,
  currentChainId: '' as String,
})

export const getters = getterTree(state, {
  walletAddress: (state) => state.walletAddress,
  currentChainId: (state) => state.currentChainId,
})

export const mutations = mutationTree(state, {
  setAddress(state, address: String): void {
    Vue.set(state, 'walletAddress', address)
  },
  removeAddress(state): void {
    state.walletAddress = ''
  },
  setChainId(state, chainId: String | null): void {
    Vue.set(state, 'currentChainId', chainId)
  },
  removeChainId(state): void {
    state.currentChainId = ''
  },
})

export const accessorType = getAccessorType({
  state,
  getters,
  mutations,
})
