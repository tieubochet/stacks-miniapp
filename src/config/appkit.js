// src/config/appkit.js
import { createAppKit } from '@reown/appkit'

export const PROJECT_ID = 'b113be1d4d4bec533241f1af1982e154'

export const appKit = createAppKit({
  projectId: PROJECT_ID,
  chains: [
    {
      id: 'stacks-mainnet',
      name: 'Stacks Mainnet',
      rpcUrl: 'https://stacks-node-api.mainnet.stacks.co'
    }
  ],
  metadata: {
    name: 'Stacks Mini App',
    description: 'Builder Challenge App',
    url: 'https://stacks-miniapp.vercel.app',
    icons: ['https://avatars.githubusercontent.com/u/37784886']
  }
})
