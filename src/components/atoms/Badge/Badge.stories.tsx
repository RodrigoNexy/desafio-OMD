import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta = {
  title: 'Atoms/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['success', 'warning', 'info', 'danger', 'secondary'],
      description: 'Variante visual do badge',
    },
    children: {
      control: 'text',
      description: 'Conteúdo do badge',
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Concluído',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Em Andamento',
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    children: 'Informação',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Atrasado',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Não Iniciado',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Badge variant="success">Concluído</Badge>
      <Badge variant="warning">Em Andamento</Badge>
      <Badge variant="info">Informação</Badge>
      <Badge variant="danger">Atrasado</Badge>
      <Badge variant="secondary">Não Iniciado</Badge>
    </div>
  ),
};

