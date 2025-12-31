import { useEffect, useState } from 'react'
export default function App() {
const [address, setAddress] = useState(null)
const [balance, setBalance] = useState(null)
const [loading, setLoading] = useState(false)


useEffect(() => {
appKit.on('connect', async (session) => {
const acc = session.accounts?.[0]
if (!acc) return
setAddress(acc)
await fetchBalance(acc)
})


appKit.on('disconnect', () => {
setAddress(null)
setBalance(null)
})
}, [])


async function fetchBalance(stacksAddress) {
try {
setLoading(true)
const res = await fetch(
`https://stacks-node-api.mainnet.stacks.co/extended/v1/address/${stacksAddress}/balances`
)
const data = await res.json()
setBalance(data.stx.balance)
} catch (e) {
console.error(e)
} finally {
setLoading(false)
}
}


return (
<div style={{ fontFamily: 'sans-serif', padding: 32 }}>
<h1>Stacks MiniApp</h1>


{!address && (
<button onClick={() => appKit.open()}>
Connect Wallet
</button>
)}


{address && (
<>
<p><strong>Address:</strong> {address}</p>
{loading && <p>Loading balance...</p>}
{balance && (
<p><strong>STX Balance:</strong> {Number(balance) / 1_000_000} STX</p>
)}
<button onClick={() => appKit.disconnect()}>
Disconnect
</button>
</>
)}


<hr />
<p>
✅ WalletConnect / Reown AppKit integrated<br />
✅ Stacks RPC balance fetch<br />
⏳ Smart contract metrics & GitHub tracking (next step)
</p>
</div>
)
}