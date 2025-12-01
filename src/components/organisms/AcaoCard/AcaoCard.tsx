import { memo, useMemo, useCallback } from "react";
import { Badge, Button } from "../../atoms";
import type { Acao } from "../../../types";
import { formatDate, getPrazoStatus } from "../../../utils/formatDate";
import { getAcaoStatusBadge } from "../../../utils/statusBadge";
import {
  AcaoCardContainer,
  AcaoCardContent,
  AcaoCardHeader,
  AcaoCardTitle,
  AcaoCardStatus,
  AcaoCardPrazo,
  AcaoCardFooter,
} from "./AcaoCard.styled";

interface AcaoCardProps {
  acao: Acao;
  onUpdateStatus: (status: Acao["status"]) => Promise<void>;
  onUpdatePrazo: () => void;
  onDelete: () => Promise<void>;
  isLoading?: boolean;
}

export const AcaoCard = memo<AcaoCardProps>(({
  acao,
  onUpdatePrazo,
  onDelete,
  isLoading = false,
}) => {
  const prazoStatus = useMemo(() => getPrazoStatus(acao.prazo), [acao.prazo]);

  const handleDelete = useCallback(async () => {
    if (window.confirm(`Tem certeza que deseja deletar esta ação?`)) {
      await onDelete();
    }
  }, [onDelete]);

  return (
    <AcaoCardContainer>
      <AcaoCardContent>
        <AcaoCardHeader>
          <AcaoCardTitle>{acao.acao}</AcaoCardTitle>
          <AcaoCardStatus>
            <Badge variant={getAcaoStatusBadge(acao.status)}>
              {acao.status}
            </Badge>
          </AcaoCardStatus>
        </AcaoCardHeader>
        <AcaoCardPrazo>
          Prazo: <span style={{ marginLeft: '0.25rem' }}>
            <Badge variant={prazoStatus}>
              {formatDate(acao.prazo)}
            </Badge>
          </span>
        </AcaoCardPrazo>
      </AcaoCardContent>
      <AcaoCardFooter onPointerDown={(e) => e.stopPropagation()}>
        <Button variant="secondary" onClick={onUpdatePrazo} disabled={isLoading}>
          Alterar Prazo
        </Button>
        <Button variant="danger" onClick={handleDelete} disabled={isLoading}>
          Deletar
        </Button>
      </AcaoCardFooter>
    </AcaoCardContainer>
  );
});

AcaoCard.displayName = "AcaoCard";

