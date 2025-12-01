import { memo } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { PlanoCard } from "../PlanoCard";
import type { PlanoAcao } from "../../../types";
import { CardWrapper } from "./PlanoCardSortable.styled";

interface PlanoCardSortableProps {
  plano: PlanoAcao;
  onClick: (plano: PlanoAcao) => void;
  index?: number;
}

export const PlanoCardSortable = memo<PlanoCardSortableProps>(({
  plano,
  onClick,
  index = 0,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: plano.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
    cursor: isDragging ? "grabbing" : "grab",
  };

  return (
    <CardWrapper $index={index}>
      <div ref={setNodeRef} style={style}>
        <div {...attributes} {...listeners} style={{ cursor: 'grab' }}>
          <PlanoCard plano={plano} onClick={onClick} />
        </div>
      </div>
    </CardWrapper>
  );
});

PlanoCardSortable.displayName = "PlanoCardSortable";

