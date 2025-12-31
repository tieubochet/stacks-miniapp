// src/App.jsx
import { useEffect, useState } from 'react'
import { appKit } from './config/appkit'

export default function App() {
  const [address, setAddress] = useState(null)
  const [balance, setBalance] = useState(null)

  useEffect(() => {
    appKit.on('connect', async (session) => {
      const acc = session.accounts?.[0]
      if (!acc) return
      setAddress(acc)
      fetchBalance(acc)
    })

    appKit.on('disconnect', () => {
      setAddress(null)
      setBalance(null)
    })
  }, [])

  async function fetchBalance(addr) {
    const res = await fetch(
      `https://stacks-node-api.mainnet.stacks.co/extended/v1/address/${addr}/balances`
    )
    const data = await res.json()
    setBalance(Number(data.stx.balance) / 1_000_000)
  }

  return (
    <div style={{ padding: 32 }}>
      <h1>Stacks Mini App</h1>

      {!address && (
        <button onClick={() => appKit.open()}>
          Connect Wallet
        </button>
      )}

      {address && (
        <>
          <p><b>Address:</b> {address}</p>
          <p><b>Balance:</b> {balance} STX</p>
          <button onClick={() => appKit.disconnect()}>
            Disconnect
          </button>
        </>
      )}
    </div>
  )
}
