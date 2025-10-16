import { inputs } from './types'
import { NFT } from './types/NFT'
import { ERC20 } from './types/ERC20'
import { Transfer } from '@mimicprotocol/lib-ts'

export default function main(): void {
  const nft = new NFT(inputs.importador, inputs.chainId)
  const usdc = new ERC20(inputs.importador, inputs.chainId)
  Transfer.create(usdc, inputs.amount, inputs.validator).send()
  nft.safeTransferFrom(inputs.validator, inputs.importador, inputs.nftId)
  console.log('Importador ' + inputs.importador + ' recibió NFT ' + inputs.nftId)
}
