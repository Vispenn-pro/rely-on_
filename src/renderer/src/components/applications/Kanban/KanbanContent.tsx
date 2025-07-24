import { useKanban } from "@renderer/hooks/useKanban"
import PlusIcon from "@renderer/components/icons/PlusIcon";
import ColumnContainer from "./components/ColumnContainer";
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { useMemo, useState } from "react";
import { KanbanColumnType } from "@shared/types";
import { createPortal } from "react-dom";

type Props = {}

export default function KanbanContent({ }: Props) {

  const { currentKanban, updateKanban } = useKanban()
  const columnsIds = useMemo(() => currentKanban?.columns.map(column => column.id) || [], [currentKanban]);

  const [activeDraggedColumn, setActiveDraggedColumn] = useState<KanbanColumnType | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  )

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    if (active.data.current?.type === 'Column') {
      setActiveDraggedColumn(active.data.current?.column || null);
      return;
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || !currentKanban) return;

    setActiveDraggedColumn(null);
    if (active.id === over.id) return;

    const activeColumnIndex = currentKanban.columns.findIndex(col => col.id === active.id);
    const overColumnIndex = currentKanban.columns.findIndex(col => col.id === over.id);

    if (activeColumnIndex === -1 || overColumnIndex === -1) return;

    const updated = {
      ...currentKanban,
      columns: arrayMove(currentKanban.columns, activeColumnIndex, overColumnIndex),
    };

    await updateKanban(updated, true);
  };

  const handleNewColumn = async () => {
    if (!currentKanban) return;
    const newColumn: KanbanColumnType = {
      id: crypto.randomUUID(),
      name: 'New Column ' + ((currentKanban?.columns.length ?? 1) + 1),
    };
    const updatedKanban = {
      ...currentKanban,
      columns: [...currentKanban.columns, newColumn],
    };

    await updateKanban(updatedKanban, true)
  }

  return <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} sensors={sensors}>
    <div className="flex flex-col h-full">
      <div className="flex flex-col gap-4 p-4">
        <h1 className="text-2xl font-bold">{currentKanban?.name}</h1>
      </div>
      <div className="flex gap-2 p-4">
        <SortableContext items={columnsIds}>
          {currentKanban?.columns.map((column) => (
            <ColumnContainer key={column.id} column={column} />
          ))}
        </SortableContext>
        <button onClick={handleNewColumn} className="h-[50px] w-[250px] min-w-[250px] cursor-pointer rounded-lg border-zinc-700 -column border-2 flex items-center justify-center gap-2">
          <PlusIcon />
          Ajouter une colonne
        </button>
      </div>
    </div>
    {createPortal(<DragOverlay>
      {activeDraggedColumn && (
        <ColumnContainer column={activeDraggedColumn} />
      )}
    </DragOverlay>, document.body)}
  </DndContext>
}
