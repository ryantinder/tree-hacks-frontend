import { useState } from 'react'
import { useAccount, useEnsName } from 'wagmi'
import { useResonateOwner, useResonatePoolCreatedEvent } from '../generated'
export function Account() {
    const { address } = useAccount()
    const [ count, setCount ] = useState(0)
    const { data: ensName } = useEnsName({ address })
    const { data: owner, refetch } = useResonateOwner()
    const event = useResonatePoolCreatedEvent()
    return (
        <div>
            <div>
                {ensName ?? address}
            </div>
            <div>
                {owner ?? 'Loading...'}
            </div>
            <div>
                <button onClick={() => {
                    setCount(count + 1)
                    refetch()
                }}>Refresh</button>
            </div>
            <div>
                {count}
            </div>
        </div>
    )
}
