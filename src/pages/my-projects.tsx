import { Web3Button } from '@web3modal/react'
import { ethers } from 'ethers'
import { Fragment, useEffect, useState } from 'react'
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi'

import { Account } from '../components'
import { ChainSwitch } from '../components/ChainSwitch'
import { Pool } from '../components/Pool'
import Table from '../components/Table'
import { client } from '../wagmi'
import Header from '../components/Header'

async function getPoolIds(provider: ethers.providers.Provider): Promise<string[]> {
    return new Promise(() => {});
}

function Page() {
    const { isConnected } = useAccount()
    const { chain } = useNetwork()
    const { chains, error, isLoading, pendingChainId, switchNetwork } = useSwitchNetwork()    
    const [poolIds, setPoolIds] = useState<string[]>([])
    useEffect(() => {
        if (isConnected && chain) {
            console.log("connected")
            getPoolIds(client.provider).then(setPoolIds)
        } else {
            setPoolIds([])
            console.log("not connected")
        }
    }, [isConnected, chain])
    // CONST = https://shuttle-9.estuary.tech/gw/ipfs/bafkreicffpxbqxni5qdthwigzrz7jz6nffdzv3thi762xxiqgaqstiuygu/
    // table data
    // we want to find out which ones the user has addresses to.
    const addresses = [
        "0x0",
        "0x1",
        "0x2",
      ];
      //end table data

    return (
        <>        
        <div className="text-5xl mx-4 mt-4">Your Projects</div>
        <div className="text-3xl mt-6 mx-4">Connect your wallet, then interact with projects!</div>
            
                <Table addresses={addresses}/>
            <div>{error && error.message}</div>
        </>
    )
}

export default Page
