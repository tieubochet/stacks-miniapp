import { useEffect, useState } from 'react'
import { appKit } from './config/appkit'

export default function App() {
  const [address, setAddress] = useState(null)
  const [balance, setBalance] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    appKit.on('connect', async (session) => {
      // WalletConnect trả account dạng CAIP
      // ví dụ: stacks:SP2C2...XYZ
      const stacksAccount = session.accounts?.find(
        acc => acc.startsWith('stacks:')
      )

      if (!stacksAccount) {
        console.warn('No Stacks account found')
        return
      }

      const addr = stacksAccount.split(':')[1]
      setAddress(addr)
      fetchBalance(addr)
    })

    appKit.on('disconnect', () => {
      setAddress(null)
      setBalance(null)
    })
  }, [])

  async function fetchBalance(addr) {
    try {
      setLoading(true)
      const res = await fetch(
        `https://stacks-node-api.mainnet.stacks.co/extended/v1/address/${addr}/balances`
      )
      const data = await res.json()
      setBalance(Number(data.stx.balance) / 1_000_000)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: 32, fontFamily: 'sans-serif' }}>
      <h1>Stacks Mini App</h1>

      {!address && (
        <button onClick={() => appKit.open()}>
          Connect Wallet
        </button>
      )}

      {address && (
        <>
          <p><b>Address:</b> {address}</p>
          {loading && <p>Loading balance...</p>}
          {balance !== null && (
            <p><b>Balance:</b> {balance} STX</p>
          )}
          <button onClick={() => appKit.disconnect()}>
            Disconnect
          </button>
        </>
      )}

      <hr />
      <p>
        ✅ WalletConnect / Reown AppKit<br />
        ✅ Stacks RPC balance<br />
        ⏳ Contracts / Leaderboard (next)
      </p>
    </div>
  )
}
