import { memo } from "react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import type { Acao, AcaoStatus } from "../../../types";
import { AcaoCardSortable } from "../AcaoCardSortable";
import {
  ColumnContainer,
  ColumnHeader,
  ColumnTitle,
  ColumnCount,
  ColumnContent,
  EmptyState,
} from "./KanbanColumn.styled";

interface KanbanColumnProps {
  status: AcaoStatus;
  title: string;
  acoes: Acao[];
  onUpdateStatus: (acaoId: string, status: AcaoStatus) => Promise<void>;
  onUpdatePrazo: (acao: Acao) => void;
  onDelete: (acaoId: string) => Promise<void>;
  isLoading?: boolean;
}

export const KanbanColumn = memo<KanbanColumnProps>(({
  status,
  title,
  acoes,
  onUpdateStatus,
  onUpdatePrazo,
  onDelete,
  isLoading = false,
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
  });

  return (
    <ColumnContainer>
      <ColumnHeader>
        <ColumnTitle>{title}</ColumnTitle>
        <ColumnCount>({acoes.length})</ColumnCount>
      </ColumnHeader>
      <ColumnContent
        ref={setNodeRef}
        $isOver={isOver}
      >
        <SortableContext items={acoes.map((a) => a.id)} strategy={verticalListSortingStrategy}>
          {acoes.length === 0 ? (
            <EmptyState>
              Nenhuma ação nesta coluna
            </EmptyState>
          ) : (
            acoes.map((acao) => (
              <AcaoCardSortable
                key={acao.id}
                acao={acao}
                onUpdateStatus={(newStatus) => onUpdateStatus(acao.id, newStatus)}
                onUpdatePrazo={() => onUpdatePrazo(acao)}
                onDelete={() => onDelete(acao.id)}
                isLoading={isLoading}
              />
            ))
          )}
        </SortableContext>
      </ColumnContent>
    </ColumnContainer>
  );
});

KanbanColumn.displayName = "KanbanColumn";

