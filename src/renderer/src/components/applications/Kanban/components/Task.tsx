import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useKanban } from '@renderer/hooks/useKanban';
import { KanbanItemType } from '@shared/types'

type Props = {
  task: KanbanItemType
}

export default function Task({ task }: Props) {

  const { setActiveTask } = useKanban()

  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: task.id,
    data: {
      type: 'Task',
      task,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if (isDragging) {
    return (
      <div ref={setNodeRef} style={style} className="p-2 bg-zinc-800 rounded-md opacity-50 h-[75px] min-h-[75px]">
      </div>
    )
  }

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style} className="p-2 bg-zinc-800 rounded-md h-[75px] min-h-[75px]" onClick={() => setActiveTask(task)}>
      <div  className='w-full flex items-center gap-2'>
        <div className="flex justify-between w-full">
          <span>{task.title}</span>
        </div>
      </div>
    </div>
  )
}