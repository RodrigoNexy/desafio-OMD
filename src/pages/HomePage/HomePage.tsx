import { memo, useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "../../components/templates";
import { PlanoCard } from "../../components/organisms";
import { Modal } from "../../components/molecules";
import { Button, Loading, ErrorMessage } from "../../components/atoms";
import { usePlanoAcaoStore } from "../../store/planoAcaoStore";
import { PlanoForm } from "../../components/organisms";
import type { PlanoAcaoFormData, PlanoAcao } from "../../types";

export const HomePage = memo(() => {
  const navigate = useNavigate();
  const { planos, loading, error, carregarPlanos, criarPlano, atualizarPlano, deletarPlano } = usePlanoAcaoStore();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingPlano, setEditingPlano] = useState<PlanoAcao | null>(null);

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

  const handleEditPlano = useCallback(async (data: PlanoAcaoFormData) => {
    if (!editingPlano) return;

    try {
      await atualizarPlano(editingPlano.id, data);
      setEditingPlano(null);
    } catch (error) {
      console.error("Erro ao atualizar plano:", error);
    }
  }, [editingPlano, atualizarPlano]);

  const handleDeletePlano = useCallback(async (id: string) => {
    await deletarPlano(id);
  }, [deletarPlano]);

  const handleViewPlano = useCallback((plano: PlanoAcao) => {
    navigate(`/plano/${plano.id}`);
  }, [navigate]);

  const handleEditClick = useCallback((plano: PlanoAcao) => {
    setEditingPlano(plano);
  }, []);

  const sortedPlanos = useMemo(() => {
    return [...planos].sort((a, b) => {
      const statusOrder = { "Concluído": 2, "Em Andamento": 1, "Não Iniciado": 0 };
      return statusOrder[b.status] - statusOrder[a.status];
    });
  }, [planos]);

  if (loading && planos.length === 0) {
    return <Loading fullScreen />;
  }

  return (
    <Layout>
      <div className="flex justify-between items-center mb-8">
        <h2 className="m-0 text-2xl font-bold text-text-primary">Planos de Ação</h2>
        <Button variant="primary" onClick={() => setIsCreateModalOpen(true)}>
          + Novo Plano de Ação
        </Button>
      </div>

      {error && (
        <ErrorMessage message={error} />
      )}

      {planos.length === 0 && !loading ? (
        <div className="text-center p-12 text-text-muted">
          <p className="mb-4">Nenhum plano de ação cadastrado ainda.</p>
          <Button variant="primary" onClick={() => setIsCreateModalOpen(true)}>
            Criar Primeiro Plano
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-6">
          {sortedPlanos.map((plano) => (
            <PlanoCard
              key={plano.id}
              plano={plano}
              onView={handleViewPlano}
              onEdit={handleEditClick}
              onDelete={handleDeletePlano}
              isLoading={loading}
            />
          ))}
        </div>
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

      <Modal
        isOpen={!!editingPlano}
        onClose={() => setEditingPlano(null)}
        title="Editar Plano de Ação"
        footer={null}
      >
        {editingPlano && (
          <PlanoForm
            onSubmit={handleEditPlano}
            onCancel={() => setEditingPlano(null)}
            initialData={{ titulo: editingPlano.titulo, objetivo: editingPlano.objetivo }}
            isLoading={loading}
          />
        )}
      </Modal>
    </Layout>
  );
});

HomePage.displayName = "HomePage";

