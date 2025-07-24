import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import PlusIcon from "@renderer/components/icons/PlusIcon";
import TrashIcon from "@renderer/components/icons/TrashIcon";
import { useKanban } from "@renderer/hooks/useKanban";
import { KanbanColumnType, KanbanItemType } from "@shared/types";
import { useMemo, useRef } from "react";

type Props = {
  column: KanbanColumnType
};

const ColumnContainer = ({ column }: Props) => {

  const { currentKanban, updateKanban, getItemsByColumnId, setCurrentKanban } = useKanban();
  const items = useMemo(() => getItemsByColumnId(column.id), [column]);

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
      <div ref={setNodeRef} style={style} className="w-[300px] min-h-[500px] min-w-[250px] cursor-pointer rounded-md bg-zinc-700 border-zinc-700 border-2 flex flex-col opacity-50">
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
      <div ref={setNodeRef} style={style} className="w-[300px] min-h-[500px] min-w-[250px] cursor-pointer rounded-md bg-zinc-700 border-zinc-700 border-2 flex flex-col">
        <div {...attributes} {...listeners} className="flex justify-between bg-zinc-800 p-3 text-md h-[60px] cursor-grab rounded-md rounded-b-none font-bold border-zinc-700 border-2">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-full bg-zinc-700 text-xs">{items.length}</span>
            <span className="truncate cursor-pointer px-2" ref={spanRef} onBlur={handleBlur}
              onKeyDown={handleKeyDown} contentEditable={true} suppressContentEditableWarning>{column.name}</span>
          </div>
          <button onClick={handleDeleteColumn} className="p-1 stroke-zinc-700 hover:stroke-zinc-500 text-xs cursor-pointer"><TrashIcon /></button>
        </div>
        <div className="flex flex-grow">

        </div>
        <button onClick={handleNewTaskModal} className="flex items-center gap-2 p-3 bg-zinc-800 rounded-md rounded-t-none border-t-2 border-zinc-700 cursor-pointer">
          <PlusIcon />
          <span>Ajouter une tâche</span>
        </button>
      </div>
    </>
  );
};

export default ColumnContainer;