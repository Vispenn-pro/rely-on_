import { currentKanbanAtom, kanbanPreviewAtom } from '@renderer/store'
import { KanbanType } from '@shared/types'
import { useAtom } from 'jotai'
import { useEffect } from 'react'

export const useKanban = () => {

    const [kanbanPreviews, setKanbanPreview] = useAtom(kanbanPreviewAtom)
    const [currentKanban, setCurrentKanban] = useAtom(currentKanbanAtom)

    const fetchKanbanPreviews = async () => setKanbanPreview(await window.kanban.getKanbans())

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

    const updateKanban = async (kanbanToUpdate: KanbanType, setAsCurrentKanban: boolean = false) => {
        const kanban = {
            ...kanbanToUpdate,
            lastActivity: new Date()
        };
        updatePreviewLastActivity(kanban.id)
        if (setAsCurrentKanban) setCurrentKanban(kanban);
        const result = await window.kanban.updateKanban(kanban);
        if (setAsCurrentKanban && result !== kanban) setCurrentKanban(result)
        updatePreview(result)
        return result;
    }

    const createNewKanban = async (setAsCurrentKanban: boolean = false) => {
        const result = await window.kanban.createKanban(`Kanban #${Math.floor(Math.random() * 9000) + 1000}`);
        createPreview(result)
        if (setAsCurrentKanban) setCurrentKanban(result)
        return result;
    }

    const updatePreviewLastActivity = (id: string) => {
        setKanbanPreview(prev =>
            prev.map(kb =>
                kb.id === id
                    ? { ...kb, lastActivity: new Date() }
                    : kb
            )
        );
    }

    const deleteKanban = async(id: string) => {
        const result = await window.kanban.deleteKanban(id)
        removePreview(result)
        if(currentKanban?.id === result.id) {
            if(kanbanPreviews.length > 0) {
                const newKanban = await fetchKanbanById(kanbanPreviews[0].id)
                setCurrentKanban(newKanban)
            } else {
                setCurrentKanban(null)
            }
        }
        return result;
    }

    const updatePreview = (kanban: KanbanType) => setKanbanPreview(prev => prev.map(kb => kb.id === kanban.id ? { ...kb, name: kanban.name, lastActivity: kanban.lastActivity } : kb));
    const createPreview = (kanban: KanbanType) => setKanbanPreview(prev => [...prev, { id: kanban.id, name: kanban.name, lastActivity: kanban.lastActivity }]);
    const removePreview = (kanban: KanbanType) => setKanbanPreview(kanbanPreviews.filter(kb => kb.id !== kanban.id));

    return { kanbanPreviews, currentKanban, deleteKanban, setCurrentKanban, updateKanban, fetchKanbanById, getItemsByColumnId, createNewKanban, fetchKanbanPreviews }
}
