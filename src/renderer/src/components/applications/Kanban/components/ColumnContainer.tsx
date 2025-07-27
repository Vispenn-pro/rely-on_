import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CiCirclePlus } from "react-icons/ci";
import { GoTrash } from "react-icons/go";
import { useKanban } from "@renderer/hooks/useKanban";
import { KanbanColumnType, KanbanItemType } from "@shared/types";
import { useMemo, useRef } from "react";
import Task from "./Task";

type Props = {
  column: KanbanColumnType
};

const ColumnContainer = ({ column }: Props) => {

  const { currentKanban, updateKanban, getItemsByColumnId, setCurrentKanban } = useKanban();
  const items = useMemo(() => getItemsByColumnId(column.id), [column]);
  const tasksIds = useMemo(() => items.map(item => item.id) || [], [items]);

  const spanRef = useRef<HTMLSpanElement>(null);

  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: column.id,
    data: {
      type: 'Column',
      column,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if (isDragging) {
    return (
      <div ref={setNodeRef} style={style} className="w-[275px] min-w-[275px] min-h-[500px] cursor-pointer rounded-md bg-zinc-700 border-zinc-700 border-2 flex flex-col opacity-50">
      </div>
    )
  }

  const handleBlur = () => {
    if (!spanRef.current) return;
    const newName = spanRef.current.innerText.trim();
    if (newName && newName !== column.name) {
      handleRenameColumnName(newName);
    } else {
      spanRef.current.innerText = column.name;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      spanRef.current?.blur();
    }
  };

  const handleDeleteColumn = async () => {
    if (!currentKanban) return;
    const updatedKanban = {
      ...currentKanban,
      columns: currentKanban.columns.filter(col => col.id !== column.id),
      items: currentKanban.items.filter(item => item.columnId !== column.id),
    };
    setCurrentKanban(updatedKanban);
    const result = await updateKanban(updatedKanban);
    if (result !== updatedKanban) setCurrentKanban(result);
  }

  const handleNewTaskModal = async () => {
    handleNewTask("Je suis une tâche")
  }

  const handleNewTask = async (title: string) => {
    if (!currentKanban) return;
    const newTask: KanbanItemType = {
      id: crypto.randomUUID(),
      title,
      description: "",
      columnId: column.id
    };
    const updatedKanban = {
      ...currentKanban,
      items: [...currentKanban.items, newTask],
    };

    await updateKanban(updatedKanban, true)
  }

  const handleRenameColumnName = async (name: string) => {
    if (!currentKanban) return;

    const updatedColumns = currentKanban.columns.map(col =>
      col.id === column.id ? { ...col, name } : col
    );

    const updatedKanban = {
      ...currentKanban,
      columns: updatedColumns,
    };

    await updateKanban(updatedKanban, true)
  }

  return (
    <>
      <div ref={setNodeRef} style={style} className="flex flex-col w-[275px] min-w-[275px] min-h-[500px] max-h-full h-auto cursor-pointer rounded-md border-zinc-700 border-2 bg-zinc-700">
        <div {...attributes} {...listeners} className="flex justify-between bg-zinc-800 p-3 text-md h-[60px] cursor-grab rounded-md rounded-b-none font-bold border-zinc-700 border-2">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-full bg-zinc-700 text-xs">{items.length}</span>
            <span className="truncate cursor-pointer px-2" ref={spanRef} onBlur={handleBlur}
              onKeyDown={handleKeyDown} contentEditable={true} suppressContentEditableWarning>{column.name}</span>
          </div>
          <button onClick={handleDeleteColumn} className="p-1 text-zinc-700 hover:text-zinc-500 text-xs cursor-pointer"><GoTrash size={16} /></button>
        </div>

        <div className="flex-grow overflow-y-auto">
          <SortableContext items={tasksIds}>
            <div className="flex flex-col gap-2 p-1 w-full">
              {items.map((item) => (
                <Task key={item.id} task={item} />
              ))}
            </div>
          </SortableContext>
        </div>

        <button onClick={handleNewTaskModal} className="flex items-center gap-2 p-3 bg-zinc-800 rounded-md rounded-t-none border-t-2 border-zinc-700 cursor-pointer">
          <CiCirclePlus />
          <span>Ajouter une tâche</span>
        </button>
      </div>
    </>
  );
};

export default ColumnContainer;