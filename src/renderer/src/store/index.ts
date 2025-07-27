import { APPLICATIONS } from '@shared/constant'
import { ApplicationType, KanbanPreviewType, KanbanType } from '@shared/types'
import { atom } from 'jotai'

export const currentApplicationAtom = atom<ApplicationType>(APPLICATIONS[1])

export const kanbanPreviewAtom = atom<KanbanPreviewType[]>([])
export const currentKanbanAtom = atom<KanbanType | null>(null)
