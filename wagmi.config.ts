import { defineConfig } from '@wagmi/cli'
import { blockExplorer, react } from '@wagmi/cli/plugins'
import { erc } from '@wagmi/cli/plugins'
export default defineConfig({
  out: 'src/generated.ts',
  contracts: [],
  plugins: [
    erc({
        20: true,
        4626: true
    }),
    blockExplorer({
        baseUrl: 'https://api.etherscan.io/api',
        apiKey: '5SFYDINPP3K6VE7IYJI2S2G4Y74MQYZYTH',
        contracts: [
            {
                name: 'resonate',
                address: '0x80CA847618030Bc3e26aD2c444FD007279DaF50A'
            },
            {
                name: 'weth',
                address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
            },
            {
                name: 'priceProvider',
                address: '0x0F89ba3F140Ea9370aB05d434B8e32fDf41a6093'
            }
        ]
    }),
    react()
  ],
})
