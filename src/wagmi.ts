import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { configureChains, createConfig } from 'wagmi'
import { optimism } from 'wagmi/chains'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'

const walletConnectProjectId = '898f836c53a18d0661340823973f0cb4'

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [optimism],
  [
    jsonRpcProvider({
      rpc: (chain) => {
        if (chain === optimism) {
          return {
            http: import.meta.env.VITE_RPC_URL,
          }
        } else {
          return null
        }
      },
    }),
  ],
)

const { connectors } = getDefaultWallets({
  appName: 'Optimist Inviter',
  chains,
  projectId: walletConnectProjectId,
})

export const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
})

export { chains }
