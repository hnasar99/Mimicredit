import { inputs } from './types'
import { NFT } from './types/NFT'
import { ERC20 } from './types/ERC20'
import { Transfer } from '@mimicprotocol/lib-ts'

export default function main(): void {
  const nft = new NFT(inputs.exportador, inputs.chainId)
  const usdc = new ERC20(inputs.exportador, inputs.chainId)
  nft.approve(inputs.nftId)
  Transfer.create(usdc, inputs.amount, inputs.exportador).send()
  console.log('NFT ' + inputs.nftId + ' validado y fondos enviados a ' + inputs.exportador)
}
