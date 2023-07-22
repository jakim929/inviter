import './index.css'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'

import { InviteFlow } from './components/InviteFlow'

export function App() {
  const { isConnected } = useAccount()

  return (
    <>
      <h1>Evmts example</h1>
      <ConnectButton />
      <InviteFlow />
    </>
  )
}
