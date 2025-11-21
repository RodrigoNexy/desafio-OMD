import { memo, useMemo, useCallback } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "../../molecules";
import { Badge, Button } from "../../atoms";
import type { PlanoAcao } from "../../../types";
import { formatDate } from "../../../utils/formatDate";
import { getPlanoStatusBadge } from "../../../utils/statusBadge";

interface PlanoCardProps {
  plano: PlanoAcao;
  onView: (plano: PlanoAcao) => void;
  onEdit: (plano: PlanoAcao) => void;
  onDelete: (id: string) => Promise<void>;
  isLoading?: boolean;
}

export const PlanoCard = memo<PlanoCardProps>(({
  plano,
  onView,
  onEdit,
  onDelete,
  isLoading = false,
}) => {
  const totalAcoes = useMemo(() => plano.acoes.length, [plano.acoes.length]);
  const acoesConcluidas = useMemo(
    () => plano.acoes.filter((a) => a.status === "Feita").length,
    [plano.acoes]
  );

  const progressPercentage = useMemo(() => {
    if (totalAcoes === 0) return 0;
    return Math.round((acoesConcluidas / totalAcoes) * 100);
  }, [totalAcoes, acoesConcluidas]);

  const handleDelete = useCallback(async () => {
    if (window.confirm(`Tem certeza que deseja deletar o plano "${plano.titulo}"?`)) {
      await onDelete(plano.id);
    }
  }, [plano.id, plano.titulo, onDelete]);

  return (
    <Card>
      <CardHeader
        title={
          <div className="flex-1">
            <h3 className="text-lg font-bold text-text-primary mb-1">{plano.titulo}</h3>
            <Badge variant={getPlanoStatusBadge(plano.status)} className="text-xs">
              {plano.status}
            </Badge>
          </div>
        }
      />
      <CardContent>
        <p className="mb-4 text-text-secondary leading-relaxed">{plano.objetivo}</p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-text-muted">
            <span className="text-text-secondary">📅</span>
            <span>Criado em: <span className="text-text-secondary font-medium">{formatDate(plano.data)}</span></span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-text-muted">
              <span className="text-text-secondary">✓</span>
              <span>Ações: <span className="text-text-secondary font-semibold">{acoesConcluidas}/{totalAcoes}</span> concluídas</span>
            </div>
            {totalAcoes > 0 && (
              <span className="text-xs font-semibold text-accent">{progressPercentage}%</span>
            )}
          </div>

          {totalAcoes > 0 && (
            <div className="w-full bg-surface-muted rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-accent transition-all duration-300 rounded-full"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter>
        <div className="flex gap-2 w-full">
          <Button
            variant="secondary"
            onClick={() => onView(plano)}
            disabled={isLoading}
            className="flex-1"
          >
            Ver Detalhes
          </Button>
          <Button
            variant="primary"
            onClick={() => onEdit(plano)}
            disabled={isLoading}
            className="flex-1"
          >
            Editar
          </Button>
          <Button
            variant="danger"
            onClick={handleDelete}
            disabled={isLoading}
            className="px-4"
          >
            Deletar
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
});

PlanoCard.displayName = "PlanoCard";
