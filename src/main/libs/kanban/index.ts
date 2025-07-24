import { sampleKanbanPreviewMockDatas, sampleKanbansMock } from '@shared/mocks'
import { KanbanPreviewType, KanbanType } from '@shared/types'
import { IpcMain } from 'electron'
import {
  KanbanContextBridgeType,
  KanbanCreateContextBridgeType,
  KanbanUpdateContextBridgeType,
} from 'src/preload/kanbanContextBrigde'

const KanbanIPCHandlers = (ipcMain: IpcMain) => {
  ipcMain.handle('getKanbans', (_, ...args: Parameters<() => Promise<KanbanPreviewType[]>>) =>
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
    )
}

export default KanbanIPCHandlers

async function getKanbans() {
  return sampleKanbanPreviewMockDatas;
}

async function getKanban(id: string) {
  return sampleKanbansMock.find(kanban => kanban.id === id) || null;
}

async function createKanban(name: string = 'New Kanban') {
  const newKanban: KanbanType = {
    id: crypto.randomUUID(),
    name,
    lastActivity: new Date().toISOString(),
    columns: [],
    items: [],
  };
  sampleKanbansMock.push(newKanban);
  return newKanban;
}

async function deleteKanban(id: string) {
  const index = sampleKanbansMock.findIndex(kanban => kanban.id === id);
  if (index !== -1) {
    const deletedKanban = sampleKanbansMock.splice(index, 1)[0];
    return deletedKanban;
  }
  throw new Error(`Kanban with id ${id} not found`);
}

async function updateKanban(kanban: KanbanType) : Promise<KanbanType> {
  const index = sampleKanbansMock.findIndex(k => k.id === kanban.id);
  if (index !== -1) {
    sampleKanbansMock[index] = kanban;
    return kanban;
  }
  throw new Error(`Kanban with id ${kanban.id} not found`);
}
