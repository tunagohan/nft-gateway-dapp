import { getAccessorType, getterTree, mutationTree } from 'typed-vuex'

import * as wallet from './wallet'

export const state = () => ({})

const initialState = {
  wallet: wallet.initialState,
}

export const getters = getterTree(state, {})

export const mutations = mutationTree(state, {
  initialize(state) {
    Object.assign(state, initialState)
  },
})

export const pattern = {
  state,
  getters,
  mutations,
  modules: {
    wallet,
  },
}

export const accessorType = getAccessorType(pattern)
