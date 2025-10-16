import { inputs } from './types'
import { NFT } from './types/NFT'

export default function main(): void {
  const nft = new NFT(inputs.validator, inputs.chainId)
  nft.mint(inputs.validator, inputs.docLink)
  console.log('NFT creado y asignado al validador: ' + inputs.validator)
}
