import type { PlanoAcao, Acao } from '../../src/types';

// Mock data para testes
export const mockPlanoAcao: PlanoAcao = {
  id: '1',
  titulo: 'Plano de Teste',
  objetivo: 'Objetivo do plano de teste',
  data: new Date().toISOString(),
  status: 'Não Iniciado',
  acoes: [],
};

export const mockAcao: Acao = {
  id: '1-1',
  acao: 'Ação de teste',
  status: 'A Fazer',
  prazo: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
};

export const mockPlanoAcaoComAcoes: PlanoAcao = {
  ...mockPlanoAcao,
  acoes: [mockAcao],
};

// Mock do store
export const createMockStore = () => ({
  planos: [mockPlanoAcao],
  planoSelecionado: null,
  loading: false,
  error: null,
  carregarPlanos: vi.fn(),
  buscarPlano: vi.fn(),
  criarPlano: vi.fn(),
  atualizarPlano: vi.fn(),
  deletarPlano: vi.fn(),
  adicionarAcao: vi.fn(),
  atualizarAcao: vi.fn(),
  deletarAcao: vi.fn(),
  setPlanoSelecionado: vi.fn(),
  limparErro: vi.fn(),
});

// Mock do localStorage
export const mockLocalStorage = () => {
  const store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      Object.keys(store).forEach((key) => delete store[key]);
    },
  };
};

import { vi } from 'vitest';

