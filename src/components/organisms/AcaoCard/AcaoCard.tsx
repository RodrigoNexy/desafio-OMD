import { memo, useMemo, useCallback } from "react";
import { Card, CardContent, CardFooter } from "../../molecules";
import { Badge, Button } from "../../atoms";
import type { Acao } from "../../../types";
import { formatDate, getPrazoStatus } from "../../../utils/formatDate";
import { getAcaoStatusBadge, getNextAcaoStatus } from "../../../utils/statusBadge";

interface AcaoCardProps {
  acao: Acao;
  onUpdateStatus: (status: Acao["status"]) => Promise<void>;
  onUpdatePrazo: () => void;
  onDelete: () => Promise<void>;
  isLoading?: boolean;
}

export const AcaoCard = memo<AcaoCardProps>(({
  acao,
  onUpdateStatus,
  onUpdatePrazo,
  onDelete,
  isLoading = false,
}) => {
  const nextStatus = useMemo(() => getNextAcaoStatus(acao.status), [acao.status]);
  const prazoStatus = useMemo(() => getPrazoStatus(acao.prazo), [acao.prazo]);

  const handleNextStatus = useCallback(async () => {
    if (nextStatus) {
      await onUpdateStatus(nextStatus);
    }
  }, [nextStatus, onUpdateStatus]);

  const handleDelete = useCallback(async () => {
    if (window.confirm(`Tem certeza que deseja deletar esta ação?`)) {
      await onDelete();
    }
  }, [onDelete]);

  return (
    <Card>
      <CardContent>
        <div className="flex justify-between items-start mb-4">
          <h4 className="m-0 flex-1 font-semibold text-lg text-text-primary">{acao.acao}</h4>
          <div className="ml-2">
            <Badge variant={getAcaoStatusBadge(acao.status)}>
              {acao.status}
            </Badge>
          </div>
        </div>
        <p className="text-sm text-text-muted m-0">
          Prazo: <span className="ml-1">
            <Badge variant={prazoStatus}>
              {formatDate(acao.prazo)}
            </Badge>
          </span>
        </p>
      </CardContent>
      <CardFooter>
        <div className="flex gap-2">
          {nextStatus && (
            <Button variant="primary" onClick={handleNextStatus} disabled={isLoading}>
              Marcar como {nextStatus}
            </Button>
          )}
          <Button variant="secondary" onClick={onUpdatePrazo} disabled={isLoading}>
            Alterar Prazo
          </Button>
          <Button variant="danger" onClick={handleDelete} disabled={isLoading}>
            Deletar
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
});

AcaoCard.displayName = "AcaoCard";

