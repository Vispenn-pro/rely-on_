import { ReactElement } from 'react'

export type ApplicationType = {
  id: string
  name: string
  icon: ReactElement
}


//#region Kanban
export type KanbanPreviewType = {
  id: string
  name: string
  lastActivity: string
}

export type KanbanType = {
  id: string
  name: string
  lastActivity: string
  columns: KanbanColumnType[]
  items: KanbanItemType[]
}

export type KanbanColumnType = {
  id: string
  name: string
  order: number
}

export type KanbanItemType = {
  id: string
  title: string
  description?: string
  columnId: string
  order: number
}
//#endregion