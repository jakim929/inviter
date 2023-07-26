import { Address, Hex } from 'viem'
import { create } from 'zustand'
import { produce } from 'immer'

export type SignedInvite = {
  nonce: Hex // UID for the invite
  issuer: Address
  signature: Hex
}

export type InviteRequest = SignedInvite & {
  recipient?: Address
  commitTransactionHash?: Hex
  claimAndMintTransactionHash?: Hex
}

type Store = {
  inviteRequests: InviteRequest[]
  addInviteRequest: (inviteProcess: InviteRequest) => void
  removeInviteRequest: (nonce: Hex) => void
  setRecipient: (nonce: Hex, recipient: Address) => void
  setCommitTransactionHash: (nonce: Hex, commitTransactionHash: Hex) => void
  setClaimAndMintTransactionHash: (
    nonce: Hex,
    claimAndMintTransactionHash: Hex,
  ) => void
}

export const useStore = create<Store>()((set) => ({
  inviteRequests: [],
  addInviteRequest: (signedInvite: SignedInvite) =>
    set(
      produce<Store>((draft) => {
        draft.inviteRequests.push(signedInvite)
      }),
    ),
  removeInviteRequest: (nonce: Hex) =>
    set(
      produce<Store>((draft) => {
        const inviteRequestIndex = draft.inviteRequests.findIndex(
          (el) => el.nonce === nonce,
        )
        draft.inviteRequests.splice(inviteRequestIndex)
      }),
    ),
  setRecipient: (nonce: Hex, recipient: Address) =>
    set(
      produce<Store>((draft) => {
        const inviteRequestIndex = draft.inviteRequests.findIndex(
          (el) => el.nonce === nonce,
        )
        draft.inviteRequests[inviteRequestIndex].recipient = recipient
      }),
    ),
  setCommitTransactionHash: (nonce: Hex, commitTransactionHash: Hex) =>
    set(
      produce<Store>((draft) => {
        const inviteRequestIndex = draft.inviteRequests.findIndex(
          (el) => el.nonce === nonce,
        )
        draft.inviteRequests[inviteRequestIndex].commitTransactionHash =
          commitTransactionHash
      }),
    ),
  setClaimAndMintTransactionHash: (
    nonce: Hex,
    claimAndMintTransactionHash: Hex,
  ) =>
    set(
      produce<Store>((draft) => {
        const inviteRequestIndex = draft.inviteRequests.findIndex(
          (el) => el.nonce === nonce,
        )
        draft.inviteRequests[inviteRequestIndex].claimAndMintTransactionHash =
          claimAndMintTransactionHash
      }),
    ),
}))
