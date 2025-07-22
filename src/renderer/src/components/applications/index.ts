import { APPLICATIONS_NAME } from '@shared/constant'
import Notes from './Notes'
import Kanban from './Kanban'
// Insert new application imports here

export type AppComponents = {
  Sidebar: React.ComponentType<any>
  Content: React.ComponentType<any>
}

export const APPLICATIONS_MAP: Record<string, AppComponents> = {
  [APPLICATIONS_NAME.NOTES]: Notes,
  [APPLICATIONS_NAME.KANBAN]: Kanban
  // Insert new application mapping here
}
