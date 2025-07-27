import { sampleKanbansMock } from '@shared/mocks'
import { KanbanPreviewType, KanbanType } from '@shared/types'
import { IpcMain } from 'electron'
import {
  KanbanContextBridgeType,
  KanbanCreateContextBridgeType,
  KanbanUpdateContextBridgeType
} from 'src/preload/kanbanContextBrigde'

const KanbanIPCHandlers = (ipcMain: IpcMain) => {
  ;(ipcMain.handle('getKanbans', (_, ...args: Parameters<() => Promise<KanbanPreviewType[]>>) =>
    getKanbans(...args)
  ),
    ipcMain.handle('getKanban', (_, ...args: Parameters<KanbanContextBridgeType>) =>
      getKanban(...args)
    ),
    ipcMain.handle('createKanban', (_, ...args: Parameters<KanbanCreateContextBridgeType>) =>
      createKanban(...args)
    ),
    ipcMain.handle('deleteKanban', (_, ...args: Parameters<KanbanContextBridgeType>) =>
      deleteKanban(...args)
    ),
    ipcMain.handle('updateKanban', (_, ...args: Parameters<KanbanUpdateContextBridgeType>) =>
      updateKanban(...args)
    ))
}

export default KanbanIPCHandlers

let kanbanMocks = sampleKanbansMock;

async function getKanbans(): Promise<KanbanPreviewType[]> {
  return kanbanMocks
    .map((kanban): KanbanPreviewType => ({
      id: kanban.id,
      name: kanban.name,
      lastActivity: new Date(kanban.lastActivity),
    }))
    .sort((a, b) => b.lastActivity.getTime() - a.lastActivity.getTime());
}

async function getKanban(id: string) {
  return kanbanMocks.find((kanban) => kanban.id === id) || null
}

async function createKanban(name: string = 'New Kanban') {
  const newKanban: KanbanType = {
    id: crypto.randomUUID(),
    name,
    lastActivity: new Date(),
    columns: [],
    items: []
  }
  kanbanMocks.push(newKanban)
  return newKanban
}

async function deleteKanban(id: string) {
  const index = kanbanMocks.findIndex((kanban) => kanban.id === id)
  if (index !== -1) {
    const deletedKanban = kanbanMocks.splice(index, 1)[0]
    return deletedKanban
  }
  throw new Error(`Kanban with id ${id} not found`)
}

async function updateKanban(kanban: KanbanType): Promise<KanbanType> {
  const index = kanbanMocks.findIndex((k) => k.id === kanban.id);
  if (index !== -1) {
    kanban.lastActivity = new Date();
    kanbanMocks[index] = kanban;
    return kanban;
  }
  throw new Error(`Kanban with id ${kanban.id} not found`);
}
