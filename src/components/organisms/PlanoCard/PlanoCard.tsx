import { memo, useMemo } from "react";
import { Badge } from "../../atoms";
import type { PlanoAcao } from "../../../types";
import { formatDate } from "../../../utils/formatDate";
import { getPlanoStatusBadge } from "../../../utils/statusBadge";
import {
  PlanoCardContainer,
  PlanoCardHeader,
  PlanoCardTitle,
  PlanoCardStatus,
  PlanoCardContent,
  PlanoCardDescription,
  PlanoCardInfo,
  PlanoCardInfoRow,
  PlanoCardProgress,
  PlanoCardProgressBar,
  PlanoCardProgressFill,
  PlanoCardPercentage,
} from "./PlanoCard.styled";

interface PlanoCardProps {
  plano: PlanoAcao;
  onClick: (plano: PlanoAcao) => void;
}

export const PlanoCard = memo<PlanoCardProps>(({
  plano,
  onClick,
}) => {
  const totalAcoes = useMemo(() => plano.acoes.length, [plano.acoes]);
  const acoesConcluidas = useMemo(
    () => plano.acoes.filter((a) => a.status === "Feita").length,
    [plano.acoes]
  );

  const progressPercentage = useMemo(() => {
    if (totalAcoes === 0) return 0;
    return Math.round((acoesConcluidas / totalAcoes) * 100);
  }, [totalAcoes, acoesConcluidas]);

  return (
    <PlanoCardContainer onClick={() => onClick(plano)}>
      <PlanoCardHeader>
        <PlanoCardTitle>{plano.titulo}</PlanoCardTitle>
        <PlanoCardStatus>
          <Badge variant={getPlanoStatusBadge(plano.status)}>
            {plano.status}
          </Badge>
        </PlanoCardStatus>
      </PlanoCardHeader>

      <PlanoCardContent>
        <PlanoCardDescription>{plano.objetivo}</PlanoCardDescription>

        <PlanoCardInfo>
          <PlanoCardInfoRow>
            <span>📅</span>
            <span>Criado em: <strong>{formatDate(plano.data)}</strong></span>
          </PlanoCardInfoRow>

          <PlanoCardProgress>
            <PlanoCardInfoRow>
              <span>✓</span>
              <span>Ações: <strong>{acoesConcluidas}/{totalAcoes}</strong> concluídas</span>
            </PlanoCardInfoRow>
            {totalAcoes > 0 && (
              <PlanoCardPercentage>{progressPercentage}%</PlanoCardPercentage>
            )}
          </PlanoCardProgress>

          {totalAcoes > 0 && (
            <PlanoCardProgressBar>
              <PlanoCardProgressFill percentage={progressPercentage} />
            </PlanoCardProgressBar>
          )}
        </PlanoCardInfo>
      </PlanoCardContent>
    </PlanoCardContainer>
  );
});

PlanoCard.displayName = "PlanoCard";
