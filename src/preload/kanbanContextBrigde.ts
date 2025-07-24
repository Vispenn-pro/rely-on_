import { KanbanColumnType, KanbanItemType, KanbanPreviewType, KanbanType } from '@shared/types'
import { ipcRenderer } from 'electron'

export type KanbanEmptyContextBridgeType = () => Promise<KanbanPreviewType[]>
export type KanbanContextBridgeType = (id: string) => Promise<KanbanType>
export type KanbanCreateContextBridgeType = (name: string) => Promise<KanbanType>
export type KanbanUpdateContextBridgeType = (kanban: KanbanType) => Promise<KanbanType>
export type KanbanColumnContextBridgeType = (id: string) => Promise<KanbanColumnType>
export type KanbanItemContextBridgeType = (id: string) => Promise<KanbanItemType>

const kanbanContextBrigde = {
  getKanbans: (...args: Parameters<KanbanEmptyContextBridgeType>) => ipcRenderer.invoke('getKanbans', ...args),
  getKanban: (...args: Parameters<KanbanContextBridgeType>) => ipcRenderer.invoke('getKanban', ...args),
  createKanban: (...args: Parameters<KanbanCreateContextBridgeType>) => ipcRenderer.invoke('createKanban', ...args),
  deleteKanban: (...args: Parameters<KanbanContextBridgeType>) => ipcRenderer.invoke('deleteKanban', ...args),
  updateKanban: (...args: Parameters<KanbanUpdateContextBridgeType>) => ipcRenderer.invoke('updateKanban', ...args),
}

export default kanbanContextBrigde
