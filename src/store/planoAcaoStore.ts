import { create } from "zustand";
import { usePlanoStore } from "./plano/planoStore";
import { useAcaoStore } from "./acao/acaoStore";
import type { PlanoAcao, Acao, PlanoAcaoFormData, AcaoFormData, PlanoStatus } from "../types";

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
    const planoStore = usePlanoStore.getState();
    await planoStore.carregarPlanos();
    const { planos, loading, error } = usePlanoStore.getState();
    set({ planos, loading, error });
  },

  buscarPlano: async (id: string) => {
    const planoStore = usePlanoStore.getState();
    await planoStore.buscarPlano(id);
    const { planoSelecionado, loading, error } = usePlanoStore.getState();
    set({ planoSelecionado, loading, error });
  },

  criarPlano: async (dados: PlanoAcaoFormData) => {
    const planoStore = usePlanoStore.getState();
    await planoStore.criarPlano(dados);
    const { planos, loading, error } = usePlanoStore.getState();
    set({ planos, loading, error });
  },

  atualizarPlano: async (id: string, dados: Partial<PlanoAcaoFormData>) => {
    const planoStore = usePlanoStore.getState();
    await planoStore.atualizarPlano(id, dados);
    const { planos, planoSelecionado, loading, error } = usePlanoStore.getState();
    set({ planos, planoSelecionado, loading, error });
  },

  atualizarStatusPlano: async (id: string, status: PlanoStatus) => {
    const planoStore = usePlanoStore.getState();
    await planoStore.atualizarStatusPlano(id, status);
    const { planos, planoSelecionado, loading, error } = usePlanoStore.getState();
    set({ planos, planoSelecionado, loading, error });
  },

  deletarPlano: async (id: string) => {
    const planoStore = usePlanoStore.getState();
    await planoStore.deletarPlano(id);
    const { planos, planoSelecionado, loading, error } = usePlanoStore.getState();
    set({ planos, planoSelecionado, loading, error });
  },

  adicionarAcao: async (planoId: string, dados: AcaoFormData) => {
    const acaoStore = useAcaoStore.getState();
    const atualizarPlanos = (planoAtualizado: PlanoAcao) => {
      const { planos, planoSelecionado } = get();
      set({
        planos: planos.map((p) => (p.id === planoId ? planoAtualizado : p)),
        planoSelecionado: planoSelecionado?.id === planoId ? planoAtualizado : planoSelecionado,
      });
    };

    await acaoStore.adicionarAcao(planoId, dados, atualizarPlanos);
    const { loading, error } = useAcaoStore.getState();
    set({ loading, error });
  },

  atualizarAcao: async (
    planoId: string,
    acaoId: string,
    dados: Partial<Pick<Acao, "status" | "prazo">>
  ) => {
    const acaoStore = useAcaoStore.getState();
    const atualizarPlanos = (planoAtualizado: PlanoAcao) => {
      const { planos, planoSelecionado } = get();
      const planoAtualizadoComNovaRef = { ...planoAtualizado, acoes: [...planoAtualizado.acoes] };
      set({
        planos: planos.map((p) => (p.id === planoId ? planoAtualizadoComNovaRef : p)),
        planoSelecionado: planoSelecionado?.id === planoId ? planoAtualizadoComNovaRef : planoSelecionado,
      });
    };

    await acaoStore.atualizarAcao(planoId, acaoId, dados, atualizarPlanos);
    const { loading, error } = useAcaoStore.getState();
    set({ loading, error });
  },

  deletarAcao: async (planoId: string, acaoId: string) => {
    const acaoStore = useAcaoStore.getState();
    const atualizarPlanos = (planoAtualizado: PlanoAcao) => {
      const { planos, planoSelecionado } = get();
      set({
        planos: planos.map((p) => (p.id === planoId ? planoAtualizado : p)),
        planoSelecionado: planoSelecionado?.id === planoId ? planoAtualizado : planoSelecionado,
      });
    };

    await acaoStore.deletarAcao(planoId, acaoId, atualizarPlanos);
    const { loading, error } = useAcaoStore.getState();
    set({ loading, error });
  },

  setPlanoSelecionado: (plano: PlanoAcao | null) => {
    const planoStore = usePlanoStore.getState();
    planoStore.setPlanoSelecionado(plano);
    set({ planoSelecionado: plano });
  },

  limparErro: () => {
    usePlanoStore.getState().limparErro();
    useAcaoStore.getState().limparErro();
    set({ error: null });
  },
}));

usePlanoStore.subscribe((state) => {
  usePlanoAcaoStore.setState({
    planos: state.planos,
    planoSelecionado: state.planoSelecionado,
  });
});
