import { memo, useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "../../components/templates";
import { PlanoForm, KanbanBoard } from "../../components/organisms";
import { Modal, Card, CardHeader, CardContent } from "../../components/molecules";
import { Button, Loading, ErrorMessage, Badge } from "../../components/atoms";
import { usePlanoAcaoStore } from "../../store/planoAcaoStore";
import { AcaoForm } from "../../components/organisms";
import { UpdatePrazoForm } from "../../components/organisms/UpdatePrazoForm";
import type { AcaoFormData, Acao, PlanoAcaoFormData } from "../../types";
import { formatDate } from "../../utils/formatDate";
import { getPlanoStatusBadge } from "../../utils/statusBadge";

export const PlanoDetalhesPage = memo(() => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { planoSelecionado, loading, error, buscarPlano, atualizarPlano, adicionarAcao, atualizarAcao, deletarAcao } = usePlanoAcaoStore();

  const [isAddAcaoModalOpen, setIsAddAcaoModalOpen] = useState(false);
  const [editingPlano, setEditingPlano] = useState(false);
  const [updatingPrazoAcao, setUpdatingPrazoAcao] = useState<Acao | null>(null);

  useEffect(() => {
    if (id) {
      buscarPlano(id);
    }
  }, [id, buscarPlano]);

  const handleAddAcao = useCallback(async (data: AcaoFormData) => {
    if (!id) return;

    try {
      const prazoDate = new Date(data.prazo);
      prazoDate.setHours(23, 59, 59, 999);
      await adicionarAcao(id, { ...data, prazo: prazoDate.toISOString() });
      setIsAddAcaoModalOpen(false);
    } catch (error) {
      console.error("Erro ao adicionar ação:", error);
    }
  }, [id, adicionarAcao]);

  const handleUpdateAcaoStatus = useCallback(async (acaoId: string, status: Acao["status"]) => {
    if (!id) return;
    await atualizarAcao(id, acaoId, { status });
  }, [id, atualizarAcao]);

  const handleUpdateAcaoPrazo = useCallback(async (acaoId: string, prazo: string) => {
    if (!id) return;
    await atualizarAcao(id, acaoId, { prazo });
    setUpdatingPrazoAcao(null);
  }, [id, atualizarAcao]);

  const handleDeleteAcao = useCallback(async (acaoId: string) => {
    if (!id) return;
    await deletarAcao(id, acaoId);
  }, [id, deletarAcao]);

  const handleUpdatePlano = useCallback(async (data: PlanoAcaoFormData) => {
    if (!id) return;

    try {
      await atualizarPlano(id, data);
      setEditingPlano(false);
    } catch (error) {
      console.error("Erro ao atualizar plano:", error);
    }
  }, [id, atualizarPlano]);


  if (loading && !planoSelecionado) {
    return <Loading fullScreen />;
  }

  if (!planoSelecionado) {
    return (
      <Layout>
        <div className="text-center p-12">
          <p className="mb-4 text-text-secondary">Plano não encontrado</p>
          <Button variant="primary" onClick={() => navigate("/")}>
            Voltar para Home
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Card className="mb-8">
        <CardHeader
          title={planoSelecionado.titulo}
          actions={
            <div className="flex gap-2 items-center">
              <Badge variant={getPlanoStatusBadge(planoSelecionado.status)}>
                {planoSelecionado.status}
              </Badge>
              <Button variant="secondary" onClick={() => setEditingPlano(true)}>
                Editar
              </Button>
            </div>
          }
        />
        <CardContent>
          <p className="mb-2 text-text-secondary">{planoSelecionado.objetivo}</p>
          <p className="text-sm text-text-muted m-0">
            Criado em: {formatDate(planoSelecionado.data)}
          </p>
        </CardContent>
      </Card>

      {error && <ErrorMessage message={error} />}

      <div className="flex justify-between items-center mb-8">
        <h3 className="m-0 text-xl font-bold text-text-primary">Ações ({planoSelecionado.acoes.length})</h3>
        <Button variant="primary" onClick={() => setIsAddAcaoModalOpen(true)}>
          + Adicionar Ação
        </Button>
      </div>

      {planoSelecionado.acoes.length === 0 ? (
        <div className="text-center p-8 text-text-muted">
          <p className="mb-4">Nenhuma ação cadastrada para este plano.</p>
          <Button variant="primary" onClick={() => setIsAddAcaoModalOpen(true)}>
            Adicionar Primeira Ação
          </Button>
        </div>
      ) : (
        <KanbanBoard
          acoes={planoSelecionado.acoes}
          onUpdateStatus={handleUpdateAcaoStatus}
          onUpdatePrazo={(acao) => setUpdatingPrazoAcao(acao)}
          onDelete={handleDeleteAcao}
          isLoading={loading}
        />
      )}

      <Modal
        isOpen={isAddAcaoModalOpen}
        onClose={() => setIsAddAcaoModalOpen(false)}
        title="Adicionar Ação"
        footer={null}
      >
        <AcaoForm
          onSubmit={handleAddAcao}
          onCancel={() => setIsAddAcaoModalOpen(false)}
          isLoading={loading}
        />
      </Modal>

      <Modal
        isOpen={editingPlano}
        onClose={() => setEditingPlano(false)}
        title="Editar Plano de Ação"
        footer={null}
      >
        <PlanoForm
          onSubmit={handleUpdatePlano}
          onCancel={() => setEditingPlano(false)}
          initialData={{ titulo: planoSelecionado.titulo, objetivo: planoSelecionado.objetivo }}
          isLoading={loading}
        />
      </Modal>

      <Modal
        isOpen={!!updatingPrazoAcao}
        onClose={() => setUpdatingPrazoAcao(null)}
        title="Atualizar Prazo da Ação"
        footer={null}
      >
        {updatingPrazoAcao && (
          <UpdatePrazoForm
            onSubmit={(prazo) => handleUpdateAcaoPrazo(updatingPrazoAcao.id, prazo)}
            onCancel={() => setUpdatingPrazoAcao(null)}
            initialPrazo={updatingPrazoAcao.prazo}
            isLoading={loading}
          />
        )}
      </Modal>
    </Layout>
  );
});

PlanoDetalhesPage.displayName = "PlanoDetalhesPage";

