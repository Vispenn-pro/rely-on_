import { useKanban } from '@renderer/hooks/useKanban'
import { KanbanPreviewType } from '@shared/types'
import React from 'react'

type Props = {
    kanban: KanbanPreviewType
}

export default function KanbanPreviewItem({ kanban }: Props) {

    const { setActiveKanban, fetchKanbanById } = useKanban()

    const handleKanbanClick = async (id: string) => {
        const kanban = await fetchKanbanById(id)
        if (!kanban) {
            console.error('Kanban not found or failed to fetch');
            return;
        }
        setActiveKanban(kanban)
    }

    return (
        <li
            className="p-2 rounded bg-zinc-700 hover:bg-zinc-600 cursor-pointer"
            onClick={() => handleKanbanClick(kanban.id)}
        >
            <div className="flex flex-col">
                <span className="text-sm font-semibold truncate">{kanban.name}</span>
                <span className="text-xs text-zinc-400">
                    {new Date(kanban.lastActivity).toLocaleString("fr-FR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                    }).replace(":", "h")}
                </span>
            </div>
        </li>
    )
}