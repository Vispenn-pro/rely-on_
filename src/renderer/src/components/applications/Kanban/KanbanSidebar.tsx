import { ActionButton } from '@renderer/components/Button'
import { useKanban } from '@renderer/hooks/useKanban'
import { useEffect, useMemo } from 'react'
import { LuFilePenLine } from 'react-icons/lu'
import KanbanPreviewItem from './components/KanbanPreviewItem'

type Props = {}

export default function KanbanSidebar({ }: Props) {

  const { kanbanPreviews, createNewKanban, fetchKanbanPreviews } = useKanban()

  useEffect(() => {
    fetchKanbanPreviews()
  }, [])

  const sortedKanbans = useMemo(() => {
    return [...kanbanPreviews].sort((a, b) => b.lastActivity.getTime() - a.lastActivity.getTime());
  }, [kanbanPreviews]);

  const handleNewKanban = async () => createNewKanban(true)

  return (
    <>
    
      <div className="flex my-2 w-full">
        <ActionButton className='p-2 flex items-center gap-2 flex-grow' onClick={handleNewKanban}>
          <LuFilePenLine className="w-4 h-4 text-zinc-300" />
          <span>Nouveau Kanban</span>
        </ActionButton>
      </div>

      <ul className='list-none p-0 m-0 flex flex-col gap-2'>
        {sortedKanbans.map((kanban) => (
          <KanbanPreviewItem key={kanban.id} kanban={kanban} />
        ))}
      </ul>
    </>
  )
}
