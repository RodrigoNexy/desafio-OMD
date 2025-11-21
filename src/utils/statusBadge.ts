import type { PlanoStatus, AcaoStatus } from "../types";

export const getPlanoStatusBadge = (status: PlanoStatus): "success" | "warning" | "info" | "secondary" => {
  switch (status) {
    case "Concluído":
      return "success";
    case "Em Andamento":
      return "warning";
    case "Não Iniciado":
      return "secondary";
    default:
      return "secondary";
  }
};

export const getAcaoStatusBadge = (status: AcaoStatus): "success" | "warning" | "info" => {
  switch (status) {
    case "Feita":
      return "success";
    case "Fazendo":
      return "warning";
    case "A Fazer":
      return "info";
    default:
      return "info";
  }
};

export const getNextAcaoStatus = (currentStatus: AcaoStatus): AcaoStatus | null => {
  switch (currentStatus) {
    case "A Fazer":
      return "Fazendo";
    case "Fazendo":
      return "Feita";
    case "Feita":
      return null; // Não pode avançar além de "Feita"
    default:
      return null;
  }
};

