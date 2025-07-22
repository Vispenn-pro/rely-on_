import { KanbanColumnType, KanbanItemType, KanbanPreviewType, KanbanType } from '@shared/types'
import { ipcRenderer } from 'electron'

export type KanbanContextBridgeType = (id: string) => Promise<KanbanType>
export type KanbanColumnContextBridgeType = (id: string) => Promise<KanbanColumnType>
export type KanbanItemContextBridgeType = (id: string) => Promise<KanbanItemType>

const kanbanContextBrigde = {
  getKanbans: (...args: Parameters<() => Promise<KanbanPreviewType[]>>) => ipcRenderer.invoke('getKanbans', ...args),
  getKanban: (...args: Parameters<KanbanContextBridgeType>) => ipcRenderer.invoke('getKanban', ...args),
  createKanban: (...args: Parameters<KanbanContextBridgeType>) => ipcRenderer.invoke('createKanban', ...args),
  deleteKanban: (...args: Parameters<KanbanContextBridgeType>) => ipcRenderer.invoke('deleteKanban', ...args),
  updateKanban: (...args: Parameters<KanbanContextBridgeType>) => ipcRenderer.invoke('updateKanban', ...args),
  createColumn: (...args: Parameters<KanbanColumnContextBridgeType>) => ipcRenderer.invoke('createColumn', ...args),
  deleteColumn: (...args: Parameters<KanbanColumnContextBridgeType>) => ipcRenderer.invoke('deleteColumn', ...args),
  updateColumn: (...args: Parameters<KanbanColumnContextBridgeType>) => ipcRenderer.invoke('updateColumn', ...args),
  createItem: (...args: Parameters<KanbanItemContextBridgeType>) => ipcRenderer.invoke('createItem', ...args),
  deleteItem: (...args: Parameters<KanbanItemContextBridgeType>) => ipcRenderer.invoke('deleteItem', ...args),
  updateItem: (...args: Parameters<KanbanItemContextBridgeType>) => ipcRenderer.invoke('updateItem', ...args),
}

export default kanbanContextBrigde
