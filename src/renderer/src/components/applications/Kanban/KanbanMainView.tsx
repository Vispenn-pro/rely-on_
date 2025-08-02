import { useKanban } from "@renderer/hooks/useKanban"
import ColumnContainer from "./components/ColumnContainer";
import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { useMemo, useRef, useState } from "react";
import { KanbanColumnType, KanbanItemType, KanbanType } from "@shared/types";
import { createPortal } from "react-dom";
import Task from "./components/Task";
import { CiCirclePlus } from "react-icons/ci";
import { TbTrash } from "react-icons/tb";

type Props = {
    kanban: KanbanType
}

export default function KanbanMainView({ kanban }: Props) {

  const { updateKanban, deleteKanban } = useKanban()
  const columnsIds = useMemo(() => kanban.columns.map(column => column.id) || [], [kanban]);

  const titleElementRef = useRef<HTMLHeadingElement>(null);

  const [activeDraggedColumn, setActiveDraggedColumn] = useState<KanbanColumnType | null>(null);
  const [activeDraggedTask, setActiveDraggedTask] = useState<KanbanItemType | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  )

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;

    switch (active.data.current?.type) {
      case 'Task':
        setActiveDraggedTask(active.data.current?.task || null);
        break;
      case 'Column':
        setActiveDraggedColumn(active.data.current?.column || null);
        break;
      default:
        setActiveDraggedColumn(null);
        setActiveDraggedTask(null);
        break;
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || !kanban) return;

    if (active.data.current?.type !== 'Column') return;

    setActiveDraggedColumn(null);
    setActiveDraggedTask(null);
    if (active.id === over.id) return;

    const activeElementIndex = kanban.columns.findIndex(column => column.id === active.id);
    const overElementIndex = kanban.columns.findIndex(column => column.id === over.id);

    if (activeElementIndex === -1 || overElementIndex === -1) return;

    const updated = {
      ...kanban,
      columns: arrayMove(kanban.columns, activeElementIndex, overElementIndex)
    };

    await updateKanban(updated, true);
  };

  const handleDragOver = async (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over || !kanban) return;

    if (active.id === over.id) return;

    const isTask = active.data.current?.type === 'Task';
    const isOverATask = over.data.current?.type === 'Task';

    if (!isTask) return;

    if (isOverATask) {
      const activeElementIndex = kanban.items.findIndex(item => item.id === active.id);
      const overElementIndex = kanban.items.findIndex(item => item.id === over.id);

      if (activeElementIndex === -1 || overElementIndex === -1) return;

      if (kanban.items[activeElementIndex].columnId !== kanban.items[overElementIndex].columnId) {
        kanban.items[activeElementIndex].columnId = kanban.items[overElementIndex].columnId
      }

      const updatedItems = arrayMove(kanban.items, activeElementIndex, overElementIndex);

      const updatedKanban = {
        ...kanban,
        items: updatedItems,
      };

      await updateKanban(updatedKanban, true);
    }

    if (!isOverATask) {
      const activeElementIndex = kanban.items.findIndex(item => item.id === active.id);
      const overElementIndex = kanban.columns.findIndex(column => column.id === over.id);

      if (activeElementIndex === -1 || overElementIndex === -1) return;

      const updatedItems = kanban.items.map(item => {
        if (item.id === active.id) {
          return { ...item, columnId: kanban.columns[overElementIndex].id };
        }
        return item;
      });

      const updatedKanban = {
        ...kanban,
        items: updatedItems,
      };

      await updateKanban(updatedKanban, true);
    }

  }

  const handleNewColumn = async () => {
    if (!kanban) return;
    const newColumn: KanbanColumnType = {
      id: crypto.randomUUID(),
      name: 'New Column ' + ((kanban.columns.length ?? 1) + 1),
    };
    const updatedKanban = {
      ...kanban,
      columns: [...kanban.columns, newColumn],
    };

    await updateKanban(updatedKanban, true)
  }

  const handleBlur = () => {
    if (!titleElementRef.current) return;
    const newName = titleElementRef.current.innerText.trim();
    if (newName && newName !== kanban.name) {
      handleRenameKanbanName(newName);
    } else {
      titleElementRef.current.innerText = kanban.name;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      titleElementRef.current?.blur();
    }
  };

  const handleRenameKanbanName = async (name: string) => {
    const updatedKanban = {
      ...kanban,
      name,
    };

    await updateKanban(updatedKanban, true)
  }

  const handleDeleteKanbanClick = async () => handleDeleteKanban()

  const handleDeleteKanban = async () => {
    deleteKanban(kanban.id)
  }

  return <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} onDragOver={handleDragOver} sensors={sensors}>
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center gap-4 p-4">
        <h1 className="text-2xl font-bold" ref={titleElementRef} onBlur={handleBlur}
          onKeyDown={handleKeyDown} contentEditable={true} suppressContentEditableWarning>{kanban.name}</h1>
          <button onClick={handleDeleteKanbanClick} className="cursor-pointer hover:text-zinc-500 text-zinc-600">
            <TbTrash size={20} />
          </button>
      </div>
      <div className="flex h-full gap-2 p-4 overflow-x-auto overflow-y-hidden">
        <SortableContext items={columnsIds}>
          {kanban.columns.map((column) => (
            <ColumnContainer key={column.id} column={column} />
          ))}
        </SortableContext>
        <button onClick={handleNewColumn} className="h-[50px] w-[250px] min-w-[250px] cursor-pointer rounded-lg border-zinc-700 -column border-2 flex items-center justify-center gap-2">
          <CiCirclePlus />
          Ajouter une colonne
        </button>
      </div>
    </div>
    {createPortal(<DragOverlay>
      {activeDraggedColumn ? (
        <ColumnContainer column={activeDraggedColumn} />
      ) : activeDraggedTask ? (
        <Task task={activeDraggedTask} />
      ) : null}
    </DragOverlay>, document.body)}
  </DndContext>
}
