import { ElectronAPI } from '@electron-toolkit/preload'
import { KanbanPreviewType, KanbanType } from '@shared/types'

declare global {
  interface Window {
    // electron: ElectronAPI
    // Empty object for now
    context: {

    },
    kanban: {
      getKanbans: () => Promise<KanbanPreviewType[]>
      getKanban: (id: string) => Promise<KanbanType>
      createKanban: (id: string) => Promise<KanbanType>
      deleteKanban: (id: string) => Promise<KanbanType>
      updateKanban: (id: string) => Promise<KanbanType>
      createColumn: (id: string) => Promise<KanbanColumnType>
      deleteColumn: (id: string) => Promise<KanbanColumnType>
      updateColumn: (id: string) => Promise<KanbanColumnType>
      createItem: (id: string) => Promise<KanbanItemType>
      deleteItem: (id: string) => Promise<KanbanItemType>
      updateItem: (id: string) => Promise<KanbanItemType>
    }
  }
}
