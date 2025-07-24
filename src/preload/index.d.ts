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
      createKanban: (name: string) => Promise<KanbanType>
      deleteKanban: (id: string) => Promise<KanbanType>
      updateKanban: (kanban: KanbanType) => Promise<KanbanType>
    }
  }
}
