import { APPLICATIONS } from '@shared/constant'
import { ApplicationType, KanbanType } from '@shared/types'
import { atom } from 'jotai'

export const currentApplicationAtom = atom<ApplicationType>(APPLICATIONS[0])

export const currentKanbanAtom = atom<KanbanType | null>(null)