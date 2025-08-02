import { useKanban } from "@renderer/hooks/useKanban";
import { cn } from "@renderer/utils";
import { KanbanItemType, KanbanLabelType, KanbanType } from "@shared/types";
import { useEffect, useRef, useState } from "react";
import { TbTrash } from "react-icons/tb";
import { TiDelete } from "react-icons/ti";
import { RiExpandLeftLine, RiExpandRightLine } from "react-icons/ri";
import { FaCirclePlus } from "react-icons/fa6";

type Props = {
    task: KanbanItemType
};

const KanbanTaskView = ({ task }: Props) => {

    const { currentKanban, updateKanban, setActiveTask, updateTask } = useKanban();
    const [labels, setLabels] = useState<KanbanLabelType[]>([]);

    useEffect(() => {
        const updateLabels = () => {
            const labelObjects = task.labels
                .map(labelId => currentKanban?.labels.find(lbl => lbl.id === labelId))
                .filter((label): label is KanbanLabelType => label !== undefined);

            setLabels(labelObjects);
        };

        updateLabels();
    }, [task, currentKanban]);

    const titleElementRef = useRef<HTMLHeadingElement>(null);

    const handleBlur = () => {
        if (!titleElementRef.current) return;
        const newName = titleElementRef.current.innerText.trim();
        if (newName && newName !== task.title) {
            handleRenameTaskTitle(newName);
        } else {
            titleElementRef.current.innerText = task.title;
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            titleElementRef.current?.blur();
        }
    };

    const handleRenameTaskTitle = async (title: string) => {
        const updatedTask = {
            ...task,
            title,
        } as KanbanItemType

        await updateTask(updatedTask)
    }

    const handleDeleteKanbanClick = async () => handleDeleteTask()

    const handleDeleteTask = async () => {
        const updatedKanban = {
            ...currentKanban,
            items: currentKanban?.items.filter(tk => tk.id !== task.id)
        } as KanbanType

        setActiveTask(null)
        await updateKanban(updatedKanban, true)
    }

    const [expanded, setExpanded] = useState<boolean>(false)

    const handleSwitchColumn = async (id: string) => {
        const updatedTask = {
            ...task,
            columnId: id,
        } as KanbanItemType

        await updateTask(updatedTask)
    }

    const handleDeleteLabel = async (id: KanbanLabelType['id']) => {
        const updatedTask: KanbanItemType = {
            ...task,
            labels: task.labels.filter(labelId => labelId !== id),
        };
        await updateTask(updatedTask);
    };

    return (
        <>
            <div className="flex flex-col h-full">
                <header className="flex justify-between items-center gap-4 p-4">
                    <div className="flex items-center gap-2">
                        <button onClick={() => setActiveTask(null)} className="hover:underline cursor-pointer" >{currentKanban?.name}</button>
                        <span>{">"}</span>
                        <h1 className="text-2xl font-bold" ref={titleElementRef} onBlur={handleBlur}
                            onKeyDown={handleKeyDown} contentEditable={true} suppressContentEditableWarning>{task.title}</h1>
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={handleDeleteKanbanClick} className="cursor-pointer opacity-40 hover:opacity-100 transition-opacity text-red-700">
                            <TbTrash size={20} />
                        </button>
                        <button onClick={() => setExpanded(!expanded)} className="cursor-pointer opacity-40 hover:opacity-100 transition-opacity text-zinc-400">
                            {expanded ? <RiExpandRightLine size={20} /> : <RiExpandLeftLine size={20} />}
                        </button>
                    </div>
                </header>
                <div className="flex flex-row xl:gap-5 px-3 h-full w-full overflow-hidden my-5">
                    <main className={cn("h-full flex flex-col overflow-y-auto p-2 xl:flex-1 transition-all rounded-md", expanded ? "w-0 px-0" : "w-full")}>
                        <h2 className="font-semibold">Contenu</h2>
                        <p></p>
                    </main>
                    <aside className={cn("h-auto xl:h-full flex flex-col overflow-y-auto py-2 px-5 transition-all border-1 border-zinc-700 rounded-md", expanded ? "w-full xl:w-[300px] opacity-100" : "w-0 px-0 opacity-0")}>
                        <section className="mt-2 mb-4">
                            <h2 className="font-semibold">Status</h2>
                            <select name="" id="" className="my-2 bg-zinc-700 rounded-md p-2 w-full" onChange={(evt) => handleSwitchColumn(evt.target.value)}>
                                {currentKanban?.columns.map((column) =>
                                    <option key={column.id} value={column.id} selected={column.id === task.columnId}>{column.name}</option>
                                )}
                            </select>
                        </section>
                        <section className="mb-4">
                            <h2 className="font-semibold">Etiquettes</h2>
                            <ul className="flex flex-wrap gap-2 text-xs items-center my-2">
                                {labels.map((label: KanbanLabelType) => <li key={label.id} onClick={() => handleDeleteLabel(label.id)} className="ps-2 pe-1 py-1 bg-red-500 rounded-md flex items-center gap-2 group cursor-pointer ">
                                    {label.title}
                                    <TiDelete size={18} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                                </li>)}
                                <li className="ps-2 pe-1 py-1 bg-zinc-600 rounded-md flex items-center gap-2 cursor-pointer group">
                                    Ajouter
                                    <FaCirclePlus size={12} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                                </li>
                            </ul>
                        </section>
                    </aside>
                </div>
            </div>
        </>
    );
};

export default KanbanTaskView;