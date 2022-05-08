import { Middleware } from '@nuxt/types'
import { Moralis } from 'moralis'

// Wallet接続が必要な画面で要求する
const middleware: Middleware = async ({ app, route, redirect }) => {
  // ログインまたはトップページであれば無視
  if (route.path === '/connect' || route.path === '/') {
    return
  }

  // すでにWalletが接続されている場合は無視
  if (app.$accessor.wallet.walletAddress) {
    return
  }

  const serverUrl = process.env.moralisServerUrl
  const appId = process.env.moralisAppId
  const moralisSecret = process.env.moralisSecret
  await Moralis.start({ serverUrl, appId, moralisSecret })
  await Moralis.enableWeb3()

  const user = Moralis.User.current()
  if (user) {
    const walletAddress = user.get(`ethAddress`)
    app.$accessor.wallet.setAddress(walletAddress)
    const currentChainId = Moralis.getChainId()
    app.$accessor.wallet.setChainId(currentChainId)
    console.log(`wallet address: ${walletAddress}, chainId: ${currentChainId}`)

    return
  }

  // Wallet接続画面へリダイレクト
  return redirect('/connect')
}

export default middleware
