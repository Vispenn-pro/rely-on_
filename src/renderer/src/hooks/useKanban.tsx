import { currentKanbanAtom } from '@renderer/store'
import { KanbanPreviewType, KanbanType } from '@shared/types'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'

export const useKanban = () => {
    const [kanbanPreviews, setKanbanPreview] = useState<KanbanPreviewType[]>([])
    const [currentKanban, setCurrentKanban] = useAtom(currentKanbanAtom)

    useEffect(() => {
        fetchKanbanPreviews();
    }, [])

    const fetchKanbanPreviews = async () => {
        window.kanban.getKanbans()
            .then((previews: KanbanPreviewType[]) => {
                setKanbanPreview(previews);
            })
            .catch((error) => {
                console.error('Failed to fetch kanban previews:', error);
            });
    }

    const fetchKanbanById = async (id: string): Promise<KanbanType | null> => {
        try {
            const kanban = await window.kanban.getKanban(id);
            return kanban;
        } catch (error) {
            console.error('Failed to fetch kanban by ID:', error);
            return null;
        }
    };

    const getItemsByColumnId = (columnId: string) => {
        return currentKanban?.items.filter(item => item.columnId === columnId) || [];
    }

    const updateKanban = async (kanban: KanbanType, setAsCurrentKanban: boolean = false) => {
        if(setAsCurrentKanban) setCurrentKanban(kanban);
        const result = await window.kanban.updateKanban(kanban);
        if(setAsCurrentKanban && result !== kanban) setCurrentKanban(result)
        return result;
    }

    return { kanbanPreviews, currentKanban, setCurrentKanban, updateKanban, fetchKanbanById, getItemsByColumnId }
}
