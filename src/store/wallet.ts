import Vue from 'vue'
import { getAccessorType, getterTree, mutationTree } from 'typed-vuex'

export const initialState = {
  walletAddress: '' as String,
}

export const state = () => ({
  walletAddress: '' as String,
})

export const getters = getterTree(state, {
  walletAddress: (state) => state.walletAddress,
})

export const mutations = mutationTree(state, {
  setAddress(state, address: String): void {
    Vue.set(state, 'walletAddress', address)
  },
  removeEntry(state): void {
    state.walletAddress = ''
  },
})

export const accessorType = getAccessorType({
  state,
  getters,
  mutations,
})
