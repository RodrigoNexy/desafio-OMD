import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeaderComponent, CardContentComponent, CardFooterComponent } from './Card';
import { Button } from '../../atoms/Button/Button';

const meta = {
  title: 'Molecules/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Simple: Story = {
  render: () => (
    <Card>
      <CardContentComponent>
        Este é um card simples com apenas conteúdo.
      </CardContentComponent>
    </Card>
  ),
};

export const WithHeader: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <Card>
        <CardHeaderComponent title="Título do Card" />
        <CardContentComponent>
          Este card possui um cabeçalho com título.
        </CardContentComponent>
      </Card>
    </div>
  ),
};

export const WithHeaderAndActions: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <Card>
        <CardHeaderComponent
          title="Card com Ações"
          actions={<Button variant="secondary" onClick={() => alert('Ação clicada!')}>Ação</Button>}
        />
        <CardContentComponent>
          Este card possui um cabeçalho com título e botões de ação.
        </CardContentComponent>
      </Card>
    </div>
  ),
};

export const Complete: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <Card>
        <CardHeaderComponent
          title="Card Completo"
          actions={<Button variant="secondary">Editar</Button>}
        />
        <CardContentComponent>
          Este é um card completo com cabeçalho, conteúdo e rodapé.
          Ele demonstra todas as partes disponíveis do componente Card.
        </CardContentComponent>
        <CardFooterComponent>
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
            <Button variant="secondary">Cancelar</Button>
            <Button variant="primary">Salvar</Button>
          </div>
        </CardFooterComponent>
      </Card>
    </div>
  ),
};

export const MultipleCards: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', width: '800px' }}>
      <Card>
        <CardHeaderComponent title="Card 1" />
        <CardContentComponent>
          Conteúdo do primeiro card.
        </CardContentComponent>
      </Card>
      <Card>
        <CardHeaderComponent title="Card 2" />
        <CardContentComponent>
          Conteúdo do segundo card.
        </CardContentComponent>
      </Card>
      <Card>
        <CardHeaderComponent title="Card 3" />
        <CardContentComponent>
          Conteúdo do terceiro card.
        </CardContentComponent>
      </Card>
    </div>
  ),
};

