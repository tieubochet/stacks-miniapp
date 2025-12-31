import { useEffect, useState } from 'react'
import { initClient, connectWallet } from './wallet'

export default function App() {
  const [client, setClient] = useState(null)
  const [address, setAddress] = useState(null)
  const [balance, setBalance] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    initClient().then(setClient)
  }, [])

  async function onConnect() {
    if (!client) return

    const session = await connectWallet(client)

    const account =
      session.namespaces.stacks.accounts[0] // stacks:1:SPxxx

    const addr = account.split(':')[2]

    setAddress(addr)
    fetchBalance(addr)
  }

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
        <button onClick={onConnect}>
          Connect Wallet
        </button>
      )}

      {address && (
        <>
          <p><b>Address:</b> {address}</p>
          {loading && <p>Loading...</p>}
          {balance !== null && (
            <p><b>Balance:</b> {balance} STX</p>
          )}
        </>
      )}
    </div>
  )
}
