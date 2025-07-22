import { sampleKanbanPreviewMockDatas, sampleKanbansMock } from '@shared/mocks'
import { KanbanPreviewType } from '@shared/types'
import { IpcMain } from 'electron'
import {
  KanbanColumnContextBridgeType,
  KanbanContextBridgeType,
  KanbanItemContextBridgeType
} from 'src/preload/kanbanContextBrigde'

const KanbanIPCHandlers = (ipcMain: IpcMain) => {
  ;(ipcMain.handle('getKanbans', (_, ...args: Parameters<() => Promise<KanbanPreviewType[]>>) =>
    getKanbans(...args)
  ),
    ipcMain.handle('getKanban', (_, ...args: Parameters<KanbanContextBridgeType>) =>
      getKanban(...args)
    ),
    ipcMain.handle('createKanban', (_, ...args: Parameters<KanbanContextBridgeType>) =>
      createKanban(...args)
    ),
    ipcMain.handle('deleteKanban', (_, ...args: Parameters<KanbanContextBridgeType>) =>
      deleteKanban(...args)
    ),
    ipcMain.handle('updateKanban', (_, ...args: Parameters<KanbanContextBridgeType>) =>
      updateKanban(...args)
    ),
    ipcMain.handle('createColumn', (_, ...args: Parameters<KanbanColumnContextBridgeType>) =>
      createColumn(...args)
    ),
    ipcMain.handle('deleteColumn', (_, ...args: Parameters<KanbanColumnContextBridgeType>) =>
      deleteColumn(...args)
    ),
    ipcMain.handle('updateColumn', (_, ...args: Parameters<KanbanColumnContextBridgeType>) =>
      updateColumn(...args)
    ),
    ipcMain.handle('createItem', (_, ...args: Parameters<KanbanItemContextBridgeType>) =>
      createItem(...args)
    ),
    ipcMain.handle('deleteItem', (_, ...args: Parameters<KanbanItemContextBridgeType>) =>
      deleteItem(...args)
    ),
    ipcMain.handle('updateItem', (_, ...args: Parameters<KanbanItemContextBridgeType>) =>
      updateItem(...args)
    ))
}

export default KanbanIPCHandlers

async function getKanbans() {
  return sampleKanbanPreviewMockDatas;
}

async function getKanban(id: string) {
  return sampleKanbansMock.find(kanban => kanban.id === id) || null;
}

async function createKanban(id: string) {}

async function deleteKanban(id: string) {}

async function updateKanban(id: string) {}

async function createColumn(id: string) {}

async function deleteColumn(id: string) {}

async function updateColumn(id: string) {}

async function createItem(id: string) {}

async function deleteItem(id: string) {}

async function updateItem(id: string) {}
