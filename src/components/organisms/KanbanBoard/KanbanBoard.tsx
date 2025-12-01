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
import type { Acao, AcaoStatus } from "../../../types";
import { KanbanColumn } from "../KanbanColumn";
import { AcaoCard } from "../AcaoCard";
import { BoardContainer, DragOverlayCard } from "./KanbanBoard.styled";

interface KanbanBoardProps {
  acoes: Acao[];
  onUpdateStatus: (acaoId: string, status: AcaoStatus) => Promise<void>;
  onUpdatePrazo: (acao: Acao) => void;
  onDelete: (acaoId: string) => Promise<void>;
  isLoading?: boolean;
}

const STATUS_COLUMNS: Array<{ status: AcaoStatus; title: string }> = [
  { status: "A Fazer", title: "A Fazer" },
  { status: "Fazendo", title: "Fazendo" },
  { status: "Feita", title: "Feita" },
];

export const KanbanBoard = memo<KanbanBoardProps>(({
  acoes,
  onUpdateStatus,
  onUpdatePrazo,
  onDelete,
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

  const acoesPorStatus = useMemo(() => {
    const agrupadas: Record<AcaoStatus, Acao[]> = {
      "A Fazer": [],
      "Fazendo": [],
      "Feita": [],
    };

    acoes.forEach((acao) => {
      agrupadas[acao.status].push(acao);
    });

    return agrupadas;
  }, [acoes]);

  const [activeAcao, setActiveAcao] = useState<Acao | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const acao = acoes.find((a) => a.id === active.id);
    setActiveAcao(acao || null);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveAcao(null);

    if (!over) return;

    const acaoId = active.id as string;
    const acao = acoes.find((a) => a.id === acaoId);
    if (!acao) return;

    // Verifica se o destino é uma coluna (status) válida
    const possiveisStatus: AcaoStatus[] = ["A Fazer", "Fazendo", "Feita"];
    const novoStatus = possiveisStatus.includes(over.id as AcaoStatus)
      ? (over.id as AcaoStatus)
      : null;

    if (!novoStatus || acao.status === novoStatus) return;

    await onUpdateStatus(acaoId, novoStatus);
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
          <KanbanColumn
            key={status}
            status={status}
            title={title}
            acoes={acoesPorStatus[status]}
            onUpdateStatus={onUpdateStatus}
            onUpdatePrazo={onUpdatePrazo}
            onDelete={onDelete}
            isLoading={isLoading}
          />
        ))}
      </BoardContainer>
      <DragOverlay>
        {activeAcao ? (
          <DragOverlayCard>
            <AcaoCard
              acao={activeAcao}
              onUpdateStatus={() => Promise.resolve()}
              onUpdatePrazo={() => {}}
              onDelete={() => Promise.resolve()}
              isLoading={false}
            />
          </DragOverlayCard>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
});

KanbanBoard.displayName = "KanbanBoard";

