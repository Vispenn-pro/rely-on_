import { APPLICATIONS } from '@shared/constant'
import { ApplicationType } from '@shared/types'
import { atom } from 'jotai'

export const currentApplicationAtom = atom<ApplicationType>(APPLICATIONS[0])
