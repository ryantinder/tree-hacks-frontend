import { BigNumber, ethers } from 'ethers'
import { formatUnits } from 'ethers/lib/utils.js'
import { useState } from 'react'
import { useAccount, useEnsName } from 'wagmi'
import { useErc20Name, useErc20Symbol, useErc4626Asset, useResonateOwner, useResonatePoolCreatedEvent, useResonatePools } from '../generated'
export function Pool(props: { poolId: string }) {
    const { data: pool, isLoading, error} = useResonatePools({args: [props.poolId as `0x${string}`]})
    const { data: lockupAsset } = useErc4626Asset({address: pool?.adapter})
    const { data: assetName } = useErc20Symbol({address: pool?.asset})
    const { data: lockupAssetName } = useErc20Symbol({address: lockupAsset})
    return (
        <tr>
            <td className='px-4'>
                {props.poolId}
            </td>
            <td className='px-4'>
                {pool && formatUnits(pool?.packetSize, 18)}&nbsp;&nbsp;
                {lockupAssetName ?? lockupAsset ?? 'Loading...'}
            </td>
            <td className='px-4'>
                {pool && formatUnits(pool?.packetSize.mul(pool?.rate).div(BigNumber.from(10).pow(18)), 18)}&nbsp;&nbsp;
                {assetName != ethers.constants.AddressZero ? assetName : 'Loading...'}
            </td>

            <td>{error && error.message}</td>
        </tr>
    )
}
