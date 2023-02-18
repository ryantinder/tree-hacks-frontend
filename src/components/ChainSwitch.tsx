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
        <Menu as="div" className="inline-block text-left">
            <div>
                <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                    {chain && chain.name || 'Select Network'}
                    <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <div className='flex flex-col border-2 rounded-md'>
                {chains.map((chain, i) => {
                    return (
                        <div
                            key={chain.id}
                            className='px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 hover:cursor-pointer rounded-md'
                            onClick={() => {
                                switchNetwork?.(chain.id)
                            }}
                        >
                            {chain.name}
                        </div>
                    )
                })}
                </div>
            </Transition>
        </Menu>
        <Web3Button />
        </div>
    )
}