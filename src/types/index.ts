export type PlanoStatus = "Não Iniciado" | "Em Andamento" | "Concluído";

export type AcaoStatus = "A Fazer" | "Fazendo" | "Feita";

export interface Acao {
  id: string;
  acao: string;
  status: AcaoStatus;
  prazo: string;
}

export interface PlanoAcao {
  id: string;
  titulo: string;
  objetivo: string;
  data: string;
  status: PlanoStatus;
  acoes: Acao[];
}

export interface PlanoAcaoFormData {
  titulo: string;
  objetivo: string;
}

export interface AcaoFormData {
  acao: string;
  prazo: string;
}

