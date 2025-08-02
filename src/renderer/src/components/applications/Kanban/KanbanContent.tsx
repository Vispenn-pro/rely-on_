import { useKanban } from "@renderer/hooks/useKanban";
import KanbanMainView from "./KanbanMainView";
import KanbanTaskView from "./KanbanTaskView";
import KanbanEmptyView from "./KanbanEmptyView";

type Props = {
  
};

const KanbanContent = ({  }: Props) => {

  const { currentTask, currentKanban } = useKanban()
  
  if(currentTask) return <KanbanTaskView task={currentTask} />
  if(!currentKanban) return <KanbanEmptyView />
  return <KanbanMainView kanban={currentKanban} />
};

export default KanbanContent;