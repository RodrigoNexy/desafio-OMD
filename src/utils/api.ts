import type { PlanoAcao, Acao, PlanoAcaoFormData, AcaoFormData, PlanoStatus } from "../types";

type PlanoAcaoUpdate = PlanoAcaoFormData & { status?: PlanoStatus };

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const API_DELAY = 500; // 500ms para simular latência de rede

const STORAGE_KEY = "planosAcao";

const getPlanosFromStorage = (): PlanoAcao[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Erro ao ler planos do localStorage:", error);
  }
  return [
    {
      id: "1",
      titulo: "Implementar Sistema de Gestão",
      objetivo: "Desenvolver um sistema completo de gestão de tarefas",
      data: new Date().toISOString(),
      status: "Não Iniciado",
      acoes: [
        {
          id: "1-1",
          acao: "Definir requisitos do sistema",
          status: "A Fazer",
          prazo: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        },
      ],
    },
  ];
};

const savePlanosToStorage = (planos: PlanoAcao[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(planos));
  } catch (error) {
    console.error("Erro ao salvar planos no localStorage:", error);
  }
};

let planosMock: PlanoAcao[] = getPlanosFromStorage();

export const planoAcaoApi = {
  async listar(): Promise<PlanoAcao[]> {
    await delay(API_DELAY);
    planosMock = getPlanosFromStorage();
    return [...planosMock];
  },

  async buscarPorId(id: string): Promise<PlanoAcao | null> {
    await delay(API_DELAY);
    planosMock = getPlanosFromStorage();
    return planosMock.find((p) => p.id === id) || null;
  },

  async criar(dados: PlanoAcaoFormData): Promise<PlanoAcao> {
    await delay(API_DELAY);
    planosMock = getPlanosFromStorage();

    const novoPlano: PlanoAcao = {
      id: Date.now().toString(),
      ...dados,
      data: new Date().toISOString(),
      status: "Não Iniciado",
      acoes: [],
    };
    planosMock.push(novoPlano);
    savePlanosToStorage(planosMock);
    return novoPlano;
  },

  async atualizar(id: string, dados: Partial<PlanoAcaoUpdate>): Promise<PlanoAcao> {
    await delay(API_DELAY);
    planosMock = getPlanosFromStorage();

    const index = planosMock.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error("Plano de ação não encontrado");
    }
    planosMock[index] = { ...planosMock[index], ...dados };
    savePlanosToStorage(planosMock);
    return planosMock[index];
  },

  async deletar(id: string): Promise<void> {
    await delay(API_DELAY);
    planosMock = getPlanosFromStorage();

    planosMock = planosMock.filter((p) => p.id !== id);
    savePlanosToStorage(planosMock);
  },

  async adicionarAcao(planoId: string, dados: AcaoFormData): Promise<Acao> {
    await delay(API_DELAY);
    planosMock = getPlanosFromStorage();

    const plano = planosMock.find((p) => p.id === planoId);
    if (!plano) {
      throw new Error("Plano de ação não encontrado");
    }
    const novaAcao: Acao = {
      id: `${planoId}-${Date.now()}`,
      ...dados,
      status: "A Fazer",
    };
    plano.acoes.push(novaAcao);
    savePlanosToStorage(planosMock);
    return novaAcao;
  },

  async atualizarAcao(
    planoId: string,
    acaoId: string,
    dados: Partial<Pick<Acao, "status" | "prazo">>
  ): Promise<Acao> {
    await delay(API_DELAY);
    planosMock = getPlanosFromStorage();

    const plano = planosMock.find((p) => p.id === planoId);
    if (!plano) {
      throw new Error("Plano de ação não encontrado");
    }
    const acao = plano.acoes.find((a) => a.id === acaoId);
    if (!acao) {
      throw new Error("Ação não encontrada");
    }
    Object.assign(acao, dados);
    savePlanosToStorage(planosMock);
    return acao;
  },

  async deletarAcao(planoId: string, acaoId: string): Promise<void> {
    await delay(API_DELAY);
    planosMock = getPlanosFromStorage();

    const plano = planosMock.find((p) => p.id === planoId);
    if (!plano) {
      throw new Error("Plano de ação não encontrado");
    }
    plano.acoes = plano.acoes.filter((a) => a.id !== acaoId);
    savePlanosToStorage(planosMock);
  },
};

