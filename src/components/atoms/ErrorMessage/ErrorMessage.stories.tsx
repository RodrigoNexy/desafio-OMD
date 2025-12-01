import type { Meta, StoryObj } from '@storybook/react';
import { ErrorMessage } from './ErrorMessage';

const meta = {
  title: 'Atoms/ErrorMessage',
  component: ErrorMessage,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    message: {
      control: 'text',
      description: 'Mensagem de erro a ser exibida',
    },
  },
} satisfies Meta<typeof ErrorMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message: 'Este campo é obrigatório',
  },
};

export const Short: Story = {
  args: {
    message: 'Erro',
  },
};

export const Long: Story = {
  args: {
    message: 'Este campo contém um erro de validação que precisa ser corrigido antes de continuar',
  },
};

export const EmailError: Story = {
  args: {
    message: 'Por favor, insira um endereço de email válido',
  },
};

export const PasswordError: Story = {
  args: {
    message: 'A senha deve ter pelo menos 8 caracteres',
  },
};

export const MultipleErrors: Story = {
  render: () => (
    <div style={{ width: '300px' }}>
      <ErrorMessage message="Este campo é obrigatório" />
      <ErrorMessage message="O formato do email é inválido" />
      <ErrorMessage message="A senha deve ter pelo menos 8 caracteres" />
    </div>
  ),
};

