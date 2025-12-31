import { createAppKit } from '@reown/appkit'

export const PROJECT_ID = 'b113be1d4d4bec533241f1af1982e154'

export const appKit = createAppKit({
  projectId: PROJECT_ID,
  metadata: {
    name: 'Stacks Mini App',
    description: 'Builder Challenge – WalletConnect + Stacks',
    url: 'https://stacks-miniapp.vercel.app',
    icons: ['https://avatars.githubusercontent.com/u/37784886']
  }
})
