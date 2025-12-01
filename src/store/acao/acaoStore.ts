import { create } from "zustand";
import type { PlanoAcao, Acao, AcaoFormData } from "../../types";
import { planoAcaoApi } from "../../utils/api";
import { calcularStatusPlano } from "../../utils/planoStatusCalculator";

interface AcaoState {
  loading: boolean;
  error: string | null;

  // Actions
  adicionarAcao: (planoId: string, dados: AcaoFormData, atualizarPlanos: (plano: PlanoAcao) => void) => Promise<void>;
  atualizarAcao: (
    planoId: string,
    acaoId: string,
    dados: Partial<Pick<Acao, "status" | "prazo">>,
    atualizarPlanos: (plano: PlanoAcao) => void
  ) => Promise<void>;
  deletarAcao: (planoId: string, acaoId: string, atualizarPlanos: (plano: PlanoAcao) => void) => Promise<void>;
  limparErro: () => void;
}

export const useAcaoStore = create<AcaoState>((set) => ({
  loading: false,
  error: null,

  adicionarAcao: async (planoId: string, dados: AcaoFormData, atualizarPlanos: (plano: PlanoAcao) => void) => {
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

      atualizarPlanos(planoAtualizado);
      set({ loading: false });
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
    dados: Partial<Pick<Acao, "status" | "prazo">>,
    atualizarPlanos: (plano: PlanoAcao) => void
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
        const planoRecarregado = await planoAcaoApi.buscarPorId(planoId);
        if (planoRecarregado) {
          planoAtualizado = planoRecarregado;
        } else {
          planoAtualizado.status = novoStatus;
        }
      }

      // Cria uma nova referência do plano atualizado para garantir que o React detecte a mudança
      const planoAtualizadoComNovaRef = { ...planoAtualizado, acoes: [...planoAtualizado.acoes] };
      atualizarPlanos(planoAtualizadoComNovaRef);
      set({ loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Erro ao atualizar ação",
        loading: false,
      });
      throw error;
    }
  },

  deletarAcao: async (planoId: string, acaoId: string, atualizarPlanos: (plano: PlanoAcao) => void) => {
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

      atualizarPlanos(planoAtualizado);
      set({ loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Erro ao deletar ação",
        loading: false,
      });
      throw error;
    }
  },

  limparErro: () => {
    set({ error: null });
  },
}));

