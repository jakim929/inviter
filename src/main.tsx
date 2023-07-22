import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { WagmiConfig } from 'wagmi'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { App } from './App'
import { chains, config } from './wagmi'
import { InvitePage } from './pages/InvitePage'
import { ErrorPage } from './pages/ErrorPage'

const router = createBrowserRouter([
  {
    path: '/invite',
    element: <InvitePage />,
  },
  {
    path: '/accept',
    element: <div>Hello world!</div>,
  },
])

const root = document.getElementById('root')

if (!root) {
  throw new Error('No root element found')
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <WagmiConfig config={config}>
      <RainbowKitProvider chains={chains}>
        <RouterProvider router={router} />
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>,
)
