import { memo, useMemo, useState } from "react";
import {
  DndContext,
  DragOverlay,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import {
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import type { PlanoAcao, PlanoStatus } from "../../../types";
import { PlanoKanbanColumn } from "../PlanoKanbanColumn";
import { PlanoCard } from "../PlanoCard";
import styled from "styled-components";

interface PlanoKanbanBoardProps {
  planos: PlanoAcao[];
  onUpdateStatus: (planoId: string, status: PlanoStatus) => Promise<void>;
  onClick: (plano: PlanoAcao) => void;
  isLoading?: boolean;
}

const STATUS_COLUMNS: Array<{ status: PlanoStatus; title: string }> = [
  { status: "Não Iniciado", title: "Não Iniciado" },
  { status: "Em Andamento", title: "Em Andamento" },
  { status: "Concluído", title: "Concluído" },
];

const BoardContainer = styled.div`
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 1rem;
  min-height: 600px;
`;

const DragOverlayCard = styled.div`
  opacity: 0.5;
  transform: rotate(3deg);
  width: 320px;
`;

export const PlanoKanbanBoard = memo<PlanoKanbanBoardProps>(({
  planos,
  onUpdateStatus,
  onClick,
  isLoading = false,
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const planosPorStatus = useMemo(() => {
    const agrupados: Record<PlanoStatus, PlanoAcao[]> = {
      "Não Iniciado": [],
      "Em Andamento": [],
      "Concluído": [],
    };

    planos.forEach((plano) => {
      agrupados[plano.status].push(plano);
    });

    return agrupados;
  }, [planos]);

  const [activePlano, setActivePlano] = useState<PlanoAcao | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const plano = planos.find((p) => p.id === active.id);
    setActivePlano(plano || null);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActivePlano(null);

    if (!over) return;

    const planoId = active.id as string;
    const plano = planos.find((p) => p.id === planoId);
    if (!plano) return;

    // Verifica se o destino é uma coluna (status) válida
    const possiveisStatus: PlanoStatus[] = ["Não Iniciado", "Em Andamento", "Concluído"];
    const novoStatus = possiveisStatus.includes(over.id as PlanoStatus)
      ? (over.id as PlanoStatus)
      : null;

    if (!novoStatus || plano.status === novoStatus) return;

    await onUpdateStatus(planoId, novoStatus);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <BoardContainer>
        {STATUS_COLUMNS.map(({ status, title }) => (
          <PlanoKanbanColumn
            key={status}
            status={status}
            title={title}
            planos={planosPorStatus[status]}
            onClick={onClick}
            isLoading={isLoading}
          />
        ))}
      </BoardContainer>
      <DragOverlay>
        {activePlano ? (
          <DragOverlayCard>
            <PlanoCard plano={activePlano} onClick={() => {}} />
          </DragOverlayCard>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
});

PlanoKanbanBoard.displayName = "PlanoKanbanBoard";

