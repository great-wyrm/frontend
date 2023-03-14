/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import BN from 'bn.js'
import { ContractOptions } from 'web3-eth-contract'
import { EventLog } from 'web3-core'
import { EventEmitter } from 'events'
import { Callback, PayableTransactionObject, NonPayableTransactionObject, BlockType, ContractEventLog, BaseContract } from './types'

export interface EventOptions {
  filter?: object
  fromBlock?: BlockType
  topics?: string[]
}

export type PathChosen = ContractEventLog<{
  sessionId: string
  tokenId: string
  stage: string
  path: string
  0: string
  1: string
  2: string
  3: string
}>
export type PathRegistered = ContractEventLog<{
  sessionId: string
  stage: string
  path: string
  0: string
  1: string
  2: string
}>
export type SessionActivated = ContractEventLog<{
  sessionId: string
  isActive: boolean
  0: string
  1: boolean
}>
export type SessionChoosingActivated = ContractEventLog<{
  sessionId: string
  isChoosingActive: boolean
  0: string
  1: boolean
}>
export type SessionCreated = ContractEventLog<{
  sessionId: string
  playerTokenAddress: string
  paymentTokenAddress: string
  paymentAmount: string
  uri: string
  active: boolean
  isForgiving: boolean
  0: string
  1: string
  2: string
  3: string
  4: string
  5: boolean
  6: boolean
}>
export type SessionUriChanged = ContractEventLog<{
  sessionId: string
  uri: string
  0: string
  1: string
}>
export type StageRewardChanged = ContractEventLog<{
  sessionId: string
  stage: string
  terminusAddress: string
  terminusPoolId: string
  rewardAmount: string
  0: string
  1: string
  2: string
  3: string
  4: string
}>

export interface GOFPFacet extends BaseContract {
  constructor(jsonInterface: any[], address?: string, options?: ContractOptions): GOFPFacet
  clone(): GOFPFacet
  methods: {
    adminTerminusInfo(): NonPayableTransactionObject<{
      0: string
      1: string
    }>

    chooseCurrentStagePaths(
      sessionId: number | string | BN,
      tokenIds: (number | string | BN)[],
      paths: (number | string | BN)[],
    ): NonPayableTransactionObject<void>

    createSession(
      playerTokenAddress: string,
      paymentTokenAddress: string,
      paymentAmount: number | string | BN,
      isActive: boolean,
      uri: string,
      stages: (number | string | BN)[],
      isForgiving: boolean,
    ): NonPayableTransactionObject<void>

    getCorrectPathForStage(sessionId: number | string | BN, stage: number | string | BN): NonPayableTransactionObject<string>

    getCurrentStage(sessionId: number | string | BN): NonPayableTransactionObject<string>

    getPathChoice(
      sessionId: number | string | BN,
      tokenId: number | string | BN,
      stage: number | string | BN,
    ): NonPayableTransactionObject<string>

    getSession(
      sessionId: number | string | BN,
    ): NonPayableTransactionObject<[string, string, string, boolean, boolean, string, string[], boolean]>

    getSessionTokenStakeGuard(sessionId: number | string | BN, tokenId: number | string | BN): NonPayableTransactionObject<boolean>

    getStageReward(sessionId: number | string | BN, stage: number | string | BN): NonPayableTransactionObject<[string, string, string]>

    getStakedTokenInfo(
      nftAddress: string,
      tokenId: number | string | BN,
    ): NonPayableTransactionObject<{
      0: string
      1: string
    }>

    init(adminTerminusAddress: string, adminTerminusPoolID: number | string | BN): NonPayableTransactionObject<void>

    numSessions(): NonPayableTransactionObject<string>

    numTokensStakedIntoSession(sessionId: number | string | BN, staker: string): NonPayableTransactionObject<string>

    onERC1155BatchReceived(
      arg0: string,
      arg1: string,
      arg2: (number | string | BN)[],
      arg3: (number | string | BN)[],
      arg4: string | number[],
    ): NonPayableTransactionObject<string>

    onERC1155Received(
      arg0: string,
      arg1: string,
      arg2: number | string | BN,
      arg3: number | string | BN,
      arg4: string | number[],
    ): NonPayableTransactionObject<string>

    onERC721Received(arg0: string, arg1: string, arg2: number | string | BN, arg3: string | number[]): NonPayableTransactionObject<string>

    setCorrectPathForStage(
      sessionId: number | string | BN,
      stage: number | string | BN,
      path: number | string | BN,
      setIsChoosingActive: boolean,
    ): NonPayableTransactionObject<void>

    setSessionActive(sessionId: number | string | BN, isActive: boolean): NonPayableTransactionObject<void>

    setSessionChoosingActive(sessionId: number | string | BN, isChoosingActive: boolean): NonPayableTransactionObject<void>

    setSessionUri(sessionId: number | string | BN, uri: string): NonPayableTransactionObject<void>

    setStageRewards(
      sessionId: number | string | BN,
      stages: (number | string | BN)[],
      terminusAddresses: string[],
      terminusPoolIds: (number | string | BN)[],
      rewardAmounts: (number | string | BN)[],
    ): NonPayableTransactionObject<void>

    stakeTokensIntoSession(sessionId: number | string | BN, tokenIds: (number | string | BN)[]): NonPayableTransactionObject<void>

    supportsInterface(interfaceId: string | number[]): NonPayableTransactionObject<boolean>

    tokenOfStakerInSessionByIndex(
      sessionId: number | string | BN,
      staker: string,
      index: number | string | BN,
    ): NonPayableTransactionObject<string>

    unstakeTokensFromSession(sessionId: number | string | BN, tokenIds: (number | string | BN)[]): NonPayableTransactionObject<void>
  }
  events: {
    PathChosen(cb?: Callback<PathChosen>): EventEmitter
    PathChosen(options?: EventOptions, cb?: Callback<PathChosen>): EventEmitter

    PathRegistered(cb?: Callback<PathRegistered>): EventEmitter
    PathRegistered(options?: EventOptions, cb?: Callback<PathRegistered>): EventEmitter

    SessionActivated(cb?: Callback<SessionActivated>): EventEmitter
    SessionActivated(options?: EventOptions, cb?: Callback<SessionActivated>): EventEmitter

    SessionChoosingActivated(cb?: Callback<SessionChoosingActivated>): EventEmitter
    SessionChoosingActivated(options?: EventOptions, cb?: Callback<SessionChoosingActivated>): EventEmitter

    SessionCreated(cb?: Callback<SessionCreated>): EventEmitter
    SessionCreated(options?: EventOptions, cb?: Callback<SessionCreated>): EventEmitter

    SessionUriChanged(cb?: Callback<SessionUriChanged>): EventEmitter
    SessionUriChanged(options?: EventOptions, cb?: Callback<SessionUriChanged>): EventEmitter

    StageRewardChanged(cb?: Callback<StageRewardChanged>): EventEmitter
    StageRewardChanged(options?: EventOptions, cb?: Callback<StageRewardChanged>): EventEmitter

    allEvents(options?: EventOptions, cb?: Callback<EventLog>): EventEmitter
  }

  once(event: 'PathChosen', cb: Callback<PathChosen>): void
  once(event: 'PathChosen', options: EventOptions, cb: Callback<PathChosen>): void

  once(event: 'PathRegistered', cb: Callback<PathRegistered>): void
  once(event: 'PathRegistered', options: EventOptions, cb: Callback<PathRegistered>): void

  once(event: 'SessionActivated', cb: Callback<SessionActivated>): void
  once(event: 'SessionActivated', options: EventOptions, cb: Callback<SessionActivated>): void

  once(event: 'SessionChoosingActivated', cb: Callback<SessionChoosingActivated>): void
  once(event: 'SessionChoosingActivated', options: EventOptions, cb: Callback<SessionChoosingActivated>): void

  once(event: 'SessionCreated', cb: Callback<SessionCreated>): void
  once(event: 'SessionCreated', options: EventOptions, cb: Callback<SessionCreated>): void

  once(event: 'SessionUriChanged', cb: Callback<SessionUriChanged>): void
  once(event: 'SessionUriChanged', options: EventOptions, cb: Callback<SessionUriChanged>): void

  once(event: 'StageRewardChanged', cb: Callback<StageRewardChanged>): void
  once(event: 'StageRewardChanged', options: EventOptions, cb: Callback<StageRewardChanged>): void
}
