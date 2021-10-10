import { TxInfo } from '@terra-money/terra.js'
import { TxResult } from '@terra-money/wallet-provider'

export enum PostTxStatus {
  POST = 'POST',
  BROADCAST = 'BROADCAST',
  DONE = 'DONE',
  ERROR = 'ERROR',
  READY = 'READY',
}

type StreamReady = {
  status: PostTxStatus.READY
}
type StreamPost = {
  status: PostTxStatus.POST
}
type StreamBroadcast = {
  status: PostTxStatus.BROADCAST
  value: TxResult
}
type StreamDone = {
  status: PostTxStatus.DONE
  value: TxInfo
}
type StreamError = {
  status: PostTxStatus.ERROR
  error: unknown
}

export type StreamResultType =
  | StreamReady
  | StreamPost
  | StreamBroadcast
  | StreamDone
  | StreamError
