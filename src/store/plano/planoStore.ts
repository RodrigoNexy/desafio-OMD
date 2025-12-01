import { create } from "zustand";
import type { PlanoAcao, PlanoAcaoFormData, PlanoStatus } from "../../types";
import { planoAcaoApi } from "../../utils/api";

interface PlanoState {
  planos: PlanoAcao[];
  planoSelecionado: PlanoAcao | null;
  loading: boolean;
  error: string | null;

  // Actions
  carregarPlanos: () => Promise<void>;
  buscarPlano: (id: string) => Promise<void>;
  criarPlano: (dados: PlanoAcaoFormData) => Promise<void>;
  atualizarPlano: (id: string, dados: Partial<PlanoAcaoFormData>) => Promise<void>;
  atualizarStatusPlano: (id: string, status: PlanoStatus) => Promise<void>;
  deletarPlano: (id: string) => Promise<void>;
  setPlanoSelecionado: (plano: PlanoAcao | null) => void;
  limparErro: () => void;
}

export const usePlanoStore = create<PlanoState>((set) => ({
  planos: [],
  planoSelecionado: null,
  loading: false,
  error: null,

  carregarPlanos: async () => {
    set({ loading: true, error: null });
    try {
      const planos = await planoAcaoApi.listar();
      set({ planos, loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Erro ao carregar planos",
        loading: false,
      });
    }
  },

  buscarPlano: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const plano = await planoAcaoApi.buscarPorId(id);
      if (plano) {
        set({ planoSelecionado: plano, loading: false });
      } else {
        set({ error: "Plano não encontrado", loading: false });
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Erro ao buscar plano",
        loading: false,
      });
    }
  },

  criarPlano: async (dados: PlanoAcaoFormData) => {
    set({ loading: true, error: null });
    try {
      const novoPlano = await planoAcaoApi.criar(dados);
      set((state) => ({
        planos: [...state.planos, novoPlano],
        loading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Erro ao criar plano",
        loading: false,
      });
      throw error;
    }
  },

  atualizarPlano: async (id: string, dados: Partial<PlanoAcaoFormData>) => {
    set({ loading: true, error: null });
    try {
      const planoAtualizado = await planoAcaoApi.atualizar(id, dados);
      set((state) => ({
        planos: state.planos.map((p) => (p.id === id ? planoAtualizado : p)),
        planoSelecionado:
          state.planoSelecionado?.id === id
            ? planoAtualizado
            : state.planoSelecionado,
        loading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Erro ao atualizar plano",
        loading: false,
      });
      throw error;
    }
  },

  atualizarStatusPlano: async (id: string, status: PlanoStatus) => {
    set({ loading: true, error: null });
    try {
      const planoAtualizado = await planoAcaoApi.atualizar(id, { status });
      set((state) => ({
        planos: state.planos.map((p) => (p.id === id ? planoAtualizado : p)),
        planoSelecionado:
          state.planoSelecionado?.id === id
            ? planoAtualizado
            : state.planoSelecionado,
        loading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Erro ao atualizar status do plano",
        loading: false,
      });
      throw error;
    }
  },

  deletarPlano: async (id: string) => {
    set({ loading: true, error: null });
    try {
      await planoAcaoApi.deletar(id);
      set((state) => ({
        planos: state.planos.filter((p) => p.id !== id),
        planoSelecionado:
          state.planoSelecionado?.id === id ? null : state.planoSelecionado,
        loading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Erro ao deletar plano",
        loading: false,
      });
      throw error;
    }
  },

  setPlanoSelecionado: (plano: PlanoAcao | null) => {
    set({ planoSelecionado: plano });
  },

  limparErro: () => {
    set({ error: null });
  },
}));

