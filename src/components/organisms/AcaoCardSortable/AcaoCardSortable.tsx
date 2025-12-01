import { memo } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { AcaoCard } from "../AcaoCard";
import type { Acao } from "../../../types";
import { CardWrapper } from "./AcaoCardSortable.styled";

interface AcaoCardSortableProps {
  acao: Acao;
  onUpdateStatus: (status: Acao["status"]) => Promise<void>;
  onUpdatePrazo: () => void;
  onDelete: () => Promise<void>;
  isLoading?: boolean;
  index?: number;
}

export const AcaoCardSortable = memo<AcaoCardSortableProps>(({
  acao,
  onUpdateStatus,
  onUpdatePrazo,
  onDelete,
  isLoading = false,
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
    id: acao.id,
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
          <AcaoCard
            acao={acao}
            onUpdateStatus={() => Promise.resolve()}
            onUpdatePrazo={onUpdatePrazo}
            onDelete={onDelete}
            isLoading={isLoading}
          />
        </div>
      </div>
    </CardWrapper>
  );
});

AcaoCardSortable.displayName = "AcaoCardSortable";

