import './index.css'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { WagmiConfig } from 'wagmi'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { chains, config } from './wagmi'
import { InvitePage } from './pages/InvitePage'
import { ErrorPage } from './pages/ErrorPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <InvitePage />,
    errorElement: <ErrorPage />,
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
