import { APPLICATIONS } from '@shared/constant'
import { ApplicationType, KanbanType } from '@shared/types'
import { atom } from 'jotai'

export const currentApplicationAtom = atom<ApplicationType>(APPLICATIONS[1])

export const currentKanbanAtom = atom<KanbanType | null>(null)
