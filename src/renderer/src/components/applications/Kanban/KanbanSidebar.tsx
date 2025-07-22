import { useKanban } from '@renderer/hooks/useKanban'
import React, { useEffect } from 'react'

type Props = {}

export default function KanbanSidebar({}: Props) {

  const { kanbanPreviews, setCurrentKanban, fetchKanbanById } = useKanban()

  const handleKanbanClick = async (id: string) => {
    const kanban = await fetchKanbanById(id)
    if (!kanban) {
      console.error('Kanban not found or failed to fetch');
      return;
    }
    setCurrentKanban(kanban)
  }

  return (
    <>
      <ul className='list-none p-0 m-0 flex flex-col gap-2'>
        {kanbanPreviews.map((kanban) => <li className='p-2 rounded bg-zinc-700 hover:bg-zinc-600 cursor-pointer' onClick={() => handleKanbanClick(kanban.id)} key={kanban.id}>
          <div className='flex flex-col'>
            <span className='text-sm font-semibold'>{kanban.name}</span>
            <span className='text-xs text-zinc-400'>{new Date(kanban.lastActivity).toLocaleDateString()}</span>
          </div>
        </li>)}
      </ul>
    </>
  )
}