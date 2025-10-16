import { MimicClient } from '@mimicprotocol/sdk'
import { ethers } from 'ethers'

const VAULT_ADDRESS = import.meta.env.VITE_VAULT_ADDRESS
const NFT_CONTRACT = import.meta.env.VITE_NFT_CONTRACT
const USDC_CONTRACT = import.meta.env.VITE_USDC_CONTRACT
const VALIDATOR_ADDR = import.meta.env.VITE_VALIDATOR_ADDRESS

function getMimic(signer) {
  const provider = signer?.provider || (window?.ethereum ? new ethers.BrowserProvider(window.ethereum) : undefined)
  return new MimicClient({ signer, provider, vaultAddress: VAULT_ADDRESS })
}

export async function createDocumentNFT({ signer, docLink, amount }) {
  const mimic = getMimic(signer)
  const iface = new ethers.Interface(["function mint(address to, string memory tokenURI) returns (uint256)"])
  const calldata = iface.encodeFunctionData('mint', [VALIDATOR_ADDR, docLink])
  const task = await mimic.tasks.create({ name: 'createDocumentNFT', trigger: { type: 'manual', signer: await signer.getAddress() }, actions: [{ target: NFT_CONTRACT, calldata }] })
  await mimic.tasks.submit(task.id)
  return { nftId: null, docLink, amount, owner: VALIDATOR_ADDR, taskId: task.id }
}

export async function validatorApproveAndFund({ signer, nftId, amount, exportador }) {
  const mimic = getMimic(signer)
  const ifaceNFT = new ethers.Interface(["function approve(uint256 tokenId)"])
  const ifaceERC20 = new ethers.Interface(["function transfer(address to, uint256 amount)"])
  const calldata1 = ifaceNFT.encodeFunctionData('approve', [nftId])
  const calldata2 = ifaceERC20.encodeFunctionData('transfer', [exportador, amount])
  const task = await mimic.tasks.create({ name: 'validateAndFund', trigger: { type: 'manual', signer: await signer.getAddress() }, actions: [{ target: NFT_CONTRACT, calldata: calldata1 }, { target: USDC_CONTRACT, calldata: calldata2 }] })
  await mimic.tasks.submit(task.id)
  return { success: true, newOwner: await signer.getAddress(), taskId: task.id }
}

export async function importerPayAndReceive({ signer, nftId, importador, validator, amount }) {
  const mimic = getMimic(signer)
  const ifaceERC20 = new ethers.Interface(["function transferFrom(address from, address to, uint256 amount) returns (bool)"])
  const ifaceNFT = new ethers.Interface(["function safeTransferFrom(address from, address to, uint256 tokenId)"])
  const calldata1 = ifaceERC20.encodeFunctionData('transferFrom', [await signer.getAddress(), validator, amount])
  const calldata2 = ifaceNFT.encodeFunctionData('safeTransferFrom', [validator, importador, nftId])
  const task = await mimic.tasks.create({ name: 'settleAndTransferNFT', trigger: { type: 'manual', signer: await signer.getAddress() }, actions: [{ target: USDC_CONTRACT, calldata: calldata1 }, { target: NFT_CONTRACT, calldata: calldata2 }] })
  await mimic.tasks.submit(task.id)
  return { success: true, newOwner: importador, taskId: task.id }
}
