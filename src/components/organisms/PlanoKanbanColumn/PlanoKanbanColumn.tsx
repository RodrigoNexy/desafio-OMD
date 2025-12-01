import { memo } from "react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import type { PlanoAcao, PlanoStatus } from "../../../types";
import { PlanoCardSortable } from "../PlanoCardSortable";
import styled from "styled-components";

interface PlanoKanbanColumnProps {
  status: PlanoStatus;
  title: string;
  planos: PlanoAcao[];
  onClick: (plano: PlanoAcao) => void;
  isLoading?: boolean;
}

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
`;

const ColumnHeader = styled.div`
  margin-bottom: 1rem;
  padding: 0 0.5rem;
`;

const ColumnTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #f5f5f5;
  margin: 0 0 0.25rem 0;
`;

const ColumnCount = styled.span`
  font-size: 0.875rem;
  color: #8a8a8a;
`;

const ColumnContent = styled.div<{ $isOver: boolean }>`
  flex: 1;
  overflow-y: auto;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 2px dashed ${props => props.$isOver ? '#00d4ff' : 'rgba(255, 255, 255, 0.08)'};
  background: ${props => props.$isOver ? 'rgba(0, 212, 255, 0.05)' : 'transparent'};
  transition: all 0.2s ease;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem 1rem;
  color: #8a8a8a;
  font-size: 0.875rem;
`;

export const PlanoKanbanColumn = memo<PlanoKanbanColumnProps>(({
  status,
  title,
  planos,
  onClick,
  isLoading = false,
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
  });

  return (
    <ColumnContainer>
      <ColumnHeader>
        <ColumnTitle>{title}</ColumnTitle>
        <ColumnCount>({planos.length})</ColumnCount>
      </ColumnHeader>
      <ColumnContent
        ref={setNodeRef}
        $isOver={isOver}
      >
        <SortableContext items={planos.map((p) => p.id)} strategy={verticalListSortingStrategy}>
          {planos.length === 0 ? (
            <EmptyState>
              Nenhum plano nesta coluna
            </EmptyState>
          ) : (
            planos.map((plano, index) => (
              <PlanoCardSortable
                key={plano.id}
                plano={plano}
                onClick={onClick}
                index={index}
              />
            ))
          )}
        </SortableContext>
      </ColumnContent>
    </ColumnContainer>
  );
});

PlanoKanbanColumn.displayName = "PlanoKanbanColumn";

