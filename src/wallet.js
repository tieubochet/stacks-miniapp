import SignClient from '@walletconnect/sign-client'

export const PROJECT_ID = 'b113be1d4d4bec533241f1af1982e154'

export async function initClient() {
  return await SignClient.init({
    projectId: PROJECT_ID,
    relayUrl: 'wss://relay.walletconnect.com', // BẮT BUỘC
    metadata: {
      name: 'Stacks Mini App',
      description: 'Builder Challenge – WalletConnect + Stacks',
      url: 'https://stacks-miniapp.vercel.app',
      icons: ['https://avatars.githubusercontent.com/u/37784886']
    }
  })
}

export async function connectWallet(client) {
  const { uri, approval } = await client.connect({
    optionalNamespaces: {
      stacks: {
        methods: [],
        chains: ['stacks:1'],
        events: []
      }
    }
  })

  if (uri) {
    // mở WalletConnect universal link
    window.open(
      `https://walletconnect.com/wc?uri=${encodeURIComponent(uri)}`,
      '_blank'
    )
  }

  const session = await approval()
  return session
}
