import { ApplicationType } from './types'

export const APPLICATIONS_NAME = {
  NOTES: 'Notes',
  KANBAN: 'Kanban'
  // Insert new application names here | [DO NOT EDIT THIS LINE]
}

export const APPLICATIONS: ApplicationType[] = [
  {
    id: '1883139c-e9be-471b-b634-25f878ba724a',
    name: APPLICATIONS_NAME.NOTES,
    icon: <span>NT</span>
  },
  {
    id: '446a7d83-27ff-4d5e-8a29-6e6e2d7bb153',
    name: APPLICATIONS_NAME.KANBAN,
    icon: <span>KB</span>
  }
  // Insert new application objects here | [DO NOT EDIT THIS LINE]
]
