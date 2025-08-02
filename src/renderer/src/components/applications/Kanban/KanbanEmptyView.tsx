type Props = {
  
};

const KanbanEmptyView = ({  }: Props) => {
  return <div className="w-full h-full flex flex-col gap-2 justify-center items-center text-center">
    <h2 className="font-bold text-2xl">Bienvenue dans votre espace Kanban.</h2>
    <span className="font-semibold text-lg">Où vos idées prennent vie et votre organisation devient un jeu d'enfant !</span>
  </div>;
};

export default KanbanEmptyView;