import { Middleware } from '@nuxt/types'

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

  // Wallet接続画面へリダイレクト
  return redirect('/connect')
}

export default middleware
