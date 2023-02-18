import { modalConnectors, walletConnectProvider } from '@web3modal/ethereum'
import { configureChains, createClient } from 'wagmi'
import { goerli, mainnet, optimism} from 'wagmi/chains'

export const walletConnectProjectId = 'fb98045db6cc26b21531a45e07c8a549'

const { chains, provider, webSocketProvider } = configureChains(
  [mainnet, optimism, ...(process.env.NODE_ENV === 'development' ? [goerli] : [])],
  [walletConnectProvider({ projectId: walletConnectProjectId })],
)

export const client = createClient({
  autoConnect: true,
  connectors: modalConnectors({ appName: 'My wagmi + Web3Modal App', chains }),
  provider,
  webSocketProvider,
})

export { chains }
