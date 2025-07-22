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
                console.log('Kanban Previews:', previews);
            })
            .catch((error) => {
                console.error('Failed to fetch kanban previews:', error);
                console.log('Fallback to default kanban previews');
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

    return { kanbanPreviews, currentKanban, setCurrentKanban, fetchKanbanById }
}
