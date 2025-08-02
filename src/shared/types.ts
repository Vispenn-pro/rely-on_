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
  lastActivity: Date
}

export type KanbanType = {
  id: string
  name: string
  lastActivity: Date
  columns: KanbanColumnType[]
  items: KanbanItemType[]
  labels: KanbanLabelType[]
}

export type KanbanColumnType = {
  id: string
  name: string
}

export type KanbanItemType = {
  id: string
  title: string
  description?: string
  columnId: string
  labels: KanbanLabelType['id'][]
}

export type KanbanLabelType = {
  id: string
  title: string
  color: string
}
//#endregion