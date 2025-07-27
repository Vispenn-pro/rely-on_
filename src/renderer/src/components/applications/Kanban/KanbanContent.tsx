import { useKanban } from "@renderer/hooks/useKanban"
import ColumnContainer from "./components/ColumnContainer";
import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { useMemo, useRef, useState } from "react";
import { KanbanColumnType, KanbanItemType } from "@shared/types";
import { createPortal } from "react-dom";
import Task from "./components/Task";
import { CiCirclePlus } from "react-icons/ci";
import { TbTrash } from "react-icons/tb";

type Props = {}

export default function KanbanContent({ }: Props) {

  const { currentKanban, updateKanban, deleteKanban } = useKanban()
  const columnsIds = useMemo(() => currentKanban?.columns.map(column => column.id) || [], [currentKanban]);

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
    if (!over || !currentKanban) return;

    if (active.data.current?.type !== 'Column') return;

    setActiveDraggedColumn(null);
    setActiveDraggedTask(null);
    if (active.id === over.id) return;

    const activeElementIndex = currentKanban.columns.findIndex(column => column.id === active.id);
    const overElementIndex = currentKanban.columns.findIndex(column => column.id === over.id);

    if (activeElementIndex === -1 || overElementIndex === -1) return;

    const updated = {
      ...currentKanban,
      columns: arrayMove(currentKanban.columns, activeElementIndex, overElementIndex)
    };

    await updateKanban(updated, true);
  };

  const handleDragOver = async (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over || !currentKanban) return;

    if (active.id === over.id) return;

    const isTask = active.data.current?.type === 'Task';
    const isOverATask = over.data.current?.type === 'Task';

    if (!isTask) return;

    if (isOverATask) {
      const activeElementIndex = currentKanban.items.findIndex(item => item.id === active.id);
      const overElementIndex = currentKanban.items.findIndex(item => item.id === over.id);

      if (activeElementIndex === -1 || overElementIndex === -1) return;

      if (currentKanban.items[activeElementIndex].columnId !== currentKanban.items[overElementIndex].columnId) {
        currentKanban.items[activeElementIndex].columnId = currentKanban.items[overElementIndex].columnId
      }

      const updatedItems = arrayMove(currentKanban.items, activeElementIndex, overElementIndex);

      const updatedKanban = {
        ...currentKanban,
        items: updatedItems,
      };

      await updateKanban(updatedKanban, true);
    }

    if (!isOverATask) {
      const activeElementIndex = currentKanban.items.findIndex(item => item.id === active.id);
      const overElementIndex = currentKanban.columns.findIndex(column => column.id === over.id);

      if (activeElementIndex === -1 || overElementIndex === -1) return;

      const updatedItems = currentKanban.items.map(item => {
        if (item.id === active.id) {
          return { ...item, columnId: currentKanban.columns[overElementIndex].id };
        }
        return item;
      });

      const updatedKanban = {
        ...currentKanban,
        items: updatedItems,
      };

      await updateKanban(updatedKanban, true);
    }

  }

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

  const handleBlur = () => {
    if (!titleElementRef.current || !currentKanban) return;
    const newName = titleElementRef.current.innerText.trim();
    if (newName && newName !== currentKanban.name) {
      handleRenameKanbanName(newName);
    } else {
      titleElementRef.current.innerText = currentKanban.name;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      titleElementRef.current?.blur();
    }
  };

  const handleRenameKanbanName = async (name: string) => {
    if (!currentKanban) return;

    const updatedKanban = {
      ...currentKanban,
      name,
    };

    await updateKanban(updatedKanban, true)
  }

  const handleDeleteKanbanClick = async () => handleDeleteKanban()

  const handleDeleteKanban = async () => {
    if(!currentKanban) return
    deleteKanban(currentKanban?.id)
  }

  if (!currentKanban) return <div className="w-full h-full flex flex-col gap-2 justify-center items-center text-center">
    <h2 className="font-bold text-2xl">Bienvenue dans votre espace Kanban.</h2>
    <span className="font-semibold text-lg">Où vos idées prennent vie et votre organisation devient un jeu d'enfant !</span>
  </div>

  return <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} onDragOver={handleDragOver} sensors={sensors}>
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center gap-4 p-4">
        <h1 className="text-2xl font-bold" ref={titleElementRef} onBlur={handleBlur}
          onKeyDown={handleKeyDown} contentEditable={true} suppressContentEditableWarning>{currentKanban?.name}</h1>
          <button onClick={handleDeleteKanbanClick} className="cursor-pointer hover:text-zinc-500 text-zinc-600">
            <TbTrash size={20} />
          </button>
      </div>
      <div className="flex h-full gap-2 p-4 overflow-x-auto overflow-y-hidden">
        <SortableContext items={columnsIds}>
          {currentKanban?.columns.map((column) => (
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
