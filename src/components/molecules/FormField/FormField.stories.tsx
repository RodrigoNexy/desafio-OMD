import type { Meta, StoryObj } from '@storybook/react';
import { FormField } from './FormField';

const meta = {
  title: 'Molecules/FormField',
  component: FormField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'date', 'textarea'],
      description: 'Tipo do campo',
    },
    required: {
      control: 'boolean',
      description: 'Se o campo é obrigatório',
    },
    disabled: {
      control: 'boolean',
      description: 'Se o campo está desabilitado',
    },
  },
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Nome',
    name: 'nome',
    placeholder: 'Digite seu nome',
  },
  render: (args) => (
    <div style={{ width: '400px' }}>
      <FormField {...args} />
    </div>
  ),
};

export const WithError: Story = {
  args: {
    label: 'Email',
    name: 'email',
    type: 'email',
    placeholder: 'email@exemplo.com',
    error: 'Email inválido',
  },
  render: (args) => (
    <div style={{ width: '400px' }}>
      <FormField {...args} />
    </div>
  ),
};

export const Required: Story = {
  args: {
    label: 'Título',
    name: 'titulo',
    placeholder: 'Digite o título',
    required: true,
  },
  render: (args) => (
    <div style={{ width: '400px' }}>
      <FormField {...args} />
    </div>
  ),
};

export const Textarea: Story = {
  args: {
    label: 'Descrição',
    name: 'descricao',
    type: 'textarea',
    placeholder: 'Digite uma descrição...',
  },
  render: (args) => (
    <div style={{ width: '400px' }}>
      <FormField {...args} />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    label: 'Campo Desabilitado',
    name: 'disabled',
    placeholder: 'Não é possível editar',
    disabled: true,
    value: 'Valor fixo',
  },
  render: (args) => (
    <div style={{ width: '400px' }}>
      <FormField {...args} />
    </div>
  ),
};

export const AllTypes: Story = {
  render: () => (
    <div style={{ width: '500px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <FormField
        label="Texto"
        name="texto"
        type="text"
        placeholder="Campo de texto"
      />
      <FormField
        label="Email"
        name="email"
        type="email"
        placeholder="email@exemplo.com"
      />
      <FormField
        label="Data"
        name="data"
        type="date"
      />
      <FormField
        label="Descrição"
        name="descricao"
        type="textarea"
        placeholder="Digite uma descrição..."
      />
    </div>
  ),
};

