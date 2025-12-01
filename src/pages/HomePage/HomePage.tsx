import { memo, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "../../components/templates";
import { PlanoKanbanBoard } from "../../components/organisms/PlanoKanbanBoard";
import { Modal } from "../../components/molecules";
import { Button, Loading, ErrorMessage } from "../../components/atoms";
import { usePlanoAcaoStore } from "../../store/planoAcaoStore";
import { PlanoForm } from "../../components/organisms";
import type { PlanoAcaoFormData, PlanoAcao, PlanoStatus } from "../../types";
import {
  HomePageContainer,
  HomePageHeader,
  HomePageTitle,
  EmptyState,
  EmptyStateText,
} from "./HomePage.styled";

export const HomePage = memo(() => {
  const navigate = useNavigate();
  const { planos, loading, error, carregarPlanos, criarPlano, atualizarStatusPlano } = usePlanoAcaoStore();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    carregarPlanos();
  }, [carregarPlanos]);

  const handleCreatePlano = useCallback(async (data: PlanoAcaoFormData) => {
    try {
      await criarPlano(data);
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error("Erro ao criar plano:", error);
    }
  }, [criarPlano]);

  const handleCardClick = useCallback((plano: PlanoAcao) => {
    navigate(`/plano/${plano.id}`);
  }, [navigate]);

  const handleUpdateStatus = useCallback(async (planoId: string, status: PlanoStatus) => {
    await atualizarStatusPlano(planoId, status);
  }, [atualizarStatusPlano]);

  if (loading && planos.length === 0) {
    return <Loading fullScreen />;
  }

  return (
    <Layout>
      <HomePageContainer>
        <HomePageHeader>
          <HomePageTitle>Planos de Ação</HomePageTitle>
          <Button variant="primary" onClick={() => setIsCreateModalOpen(true)}>
            + Novo Plano
          </Button>
        </HomePageHeader>

        {error && (
          <ErrorMessage message={error} />
        )}

        {planos.length === 0 && !loading ? (
          <EmptyState>
            <EmptyStateText>Nenhum plano de ação cadastrado ainda.</EmptyStateText>
            <Button variant="primary" onClick={() => setIsCreateModalOpen(true)}>
              Criar Primeiro Plano
            </Button>
          </EmptyState>
        ) : (
          <PlanoKanbanBoard
            planos={planos}
            onUpdateStatus={handleUpdateStatus}
            onClick={handleCardClick}
            isLoading={loading}
          />
        )}

        <Modal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          title="Novo Plano de Ação"
          footer={null}
        >
          <PlanoForm
            onSubmit={handleCreatePlano}
            onCancel={() => setIsCreateModalOpen(false)}
            isLoading={loading}
          />
        </Modal>
      </HomePageContainer>
    </Layout>
  );
});

HomePage.displayName = "HomePage";

