import { create } from "zustand";
import type { PlanoAcao, Acao, PlanoAcaoFormData, AcaoFormData, PlanoStatus } from "../types";
import { planoAcaoApi } from "../utils/api";
import { calcularStatusPlano } from "../utils/planoStatusCalculator";

interface PlanoAcaoState {
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
  adicionarAcao: (planoId: string, dados: AcaoFormData) => Promise<void>;
  atualizarAcao: (
    planoId: string,
    acaoId: string,
    dados: Partial<Pick<Acao, "status" | "prazo">>
  ) => Promise<void>;
  deletarAcao: (planoId: string, acaoId: string) => Promise<void>;
  setPlanoSelecionado: (plano: PlanoAcao | null) => void;
  limparErro: () => void;
}

export const usePlanoAcaoStore = create<PlanoAcaoState>((set, get) => ({
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

  adicionarAcao: async (planoId: string, dados: AcaoFormData) => {
    set({ loading: true, error: null });
    try {
      await planoAcaoApi.adicionarAcao(planoId, dados);
      const planoAtualizado = await planoAcaoApi.buscarPorId(planoId);

      if (!planoAtualizado) {
        throw new Error("Plano não encontrado após adicionar ação");
      }

      const novoStatus = calcularStatusPlano(planoAtualizado.acoes);

      if (novoStatus !== planoAtualizado.status) {
        await planoAcaoApi.atualizar(planoId, { status: novoStatus });
        planoAtualizado.status = novoStatus;
      }

      const { planos, planoSelecionado } = get();

      const novoPlanoSelecionado = planoSelecionado?.id === planoId ? planoAtualizado : planoSelecionado;

      set({
        planos: planos.map((p) => (p.id === planoId ? planoAtualizado : p)),
        planoSelecionado: novoPlanoSelecionado,
        loading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Erro ao adicionar ação",
        loading: false,
      });
      throw error;
    }
  },

  atualizarAcao: async (
    planoId: string,
    acaoId: string,
    dados: Partial<Pick<Acao, "status" | "prazo">>
  ) => {
    set({ loading: true, error: null });
    try {
      await planoAcaoApi.atualizarAcao(planoId, acaoId, dados);
      let planoAtualizado = await planoAcaoApi.buscarPorId(planoId);

      if (!planoAtualizado) {
        throw new Error("Plano não encontrado após atualizar ação");
      }

      const novoStatus = calcularStatusPlano(planoAtualizado.acoes);

      if (novoStatus !== planoAtualizado.status) {
        await planoAcaoApi.atualizar(planoId, { status: novoStatus });
        // Recarrega o plano completo após atualizar o status para garantir sincronização
        const planoRecarregado = await planoAcaoApi.buscarPorId(planoId);
        if (planoRecarregado) {
          planoAtualizado = planoRecarregado;
        } else {
          planoAtualizado.status = novoStatus;
        }
      }

      const { planos, planoSelecionado } = get();
      // Cria uma nova referência do plano atualizado para garantir que o React detecte a mudança
      const planoAtualizadoComNovaRef = { ...planoAtualizado, acoes: [...planoAtualizado.acoes] };
      set({
        planos: planos.map((p) => (p.id === planoId ? planoAtualizadoComNovaRef : p)),
        planoSelecionado:
          planoSelecionado?.id === planoId ? planoAtualizadoComNovaRef : planoSelecionado,
        loading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Erro ao atualizar ação",
        loading: false,
      });
      throw error;
    }
  },

  deletarAcao: async (planoId: string, acaoId: string) => {
    set({ loading: true, error: null });
    try {
      await planoAcaoApi.deletarAcao(planoId, acaoId);
      const planoAtualizado = await planoAcaoApi.buscarPorId(planoId);

      if (!planoAtualizado) {
        throw new Error("Plano não encontrado após deletar ação");
      }

      const novoStatus = calcularStatusPlano(planoAtualizado.acoes);

      if (novoStatus !== planoAtualizado.status) {
        await planoAcaoApi.atualizar(planoId, { status: novoStatus });
        planoAtualizado.status = novoStatus;
      }

      const { planos, planoSelecionado } = get();
      set({
        planos: planos.map((p) => (p.id === planoId ? planoAtualizado : p)),
        planoSelecionado:
          planoSelecionado?.id === planoId ? planoAtualizado : planoSelecionado,
        loading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Erro ao deletar ação",
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


