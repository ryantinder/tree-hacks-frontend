import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi'
import { chains } from '../wagmi'
import { Web3Button } from '@web3modal/react'

function classNames(class1: string, class2: string) {
    return class1 + ' ' + class2
}

export function ChainSwitch() {
    const { chain } = useNetwork()
    const { isConnected } = useAccount()
    const { chains, error, isLoading, pendingChainId, switchNetwork } = useSwitchNetwork()    

    return (
        <div className='flex absolute'>
        <Web3Button />
        </div>
    )
}