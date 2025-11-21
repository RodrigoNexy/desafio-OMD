import type { Acao, PlanoStatus } from "../types";

export const calcularStatusPlano = (acoes: Acao[]): PlanoStatus => {
  if (acoes.length === 0) {
    return "Não Iniciado";
  }

  const todasConcluidas = acoes.every((acao) => acao.status === "Feita");
  if (todasConcluidas) {
    return "Concluído";
  }

  const algumaIniciada = acoes.some((acao) => acao.status !== "A Fazer");
  if (algumaIniciada) {
    return "Em Andamento";
  }

  return "Não Iniciado";
};

