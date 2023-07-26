import { Address } from "viem"

export const getDisplayAddress = (addr: Address) => {
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`
}