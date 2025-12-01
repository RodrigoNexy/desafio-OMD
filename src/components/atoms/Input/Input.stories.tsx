import type { Meta, StoryObj } from '@storybook/react';
import { Input, Textarea } from './Input';
import { Label } from '../Label/Label';

const meta = {
  title: 'Atoms/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    hasError: {
      control: 'boolean',
      description: 'Se o input possui erro de validação',
    },
    disabled: {
      control: 'boolean',
      description: 'Se o input está desabilitado',
    },
    placeholder: {
      control: 'text',
      description: 'Texto placeholder',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Digite algo...',
  },
  render: (args) => (
    <div style={{ width: '300px' }}>
      <Label htmlFor="input-default">Nome</Label>
      <Input id="input-default" {...args} />
    </div>
  ),
};

export const WithError: Story = {
  args: {
    placeholder: 'Campo com erro',
    hasError: true,
  },
  render: (args) => (
    <div style={{ width: '300px' }}>
      <Label htmlFor="input-error">Email</Label>
      <Input id="input-error" {...args} />
      <span style={{ color: '#dc3545', fontSize: '0.875rem', marginTop: '0.25rem', display: 'block' }}>
        Este campo é obrigatório
      </span>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    placeholder: 'Campo desabilitado',
    disabled: true,
  },
  render: (args) => (
    <div style={{ width: '300px' }}>
      <Label htmlFor="input-disabled">Campo Desabilitado</Label>
      <Input id="input-disabled" {...args} />
    </div>
  ),
};

export const TextareaDefault: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <Label htmlFor="textarea-default">Descrição</Label>
      <Textarea id="textarea-default" placeholder="Digite uma descrição..." rows={5} />
    </div>
  ),
};

export const TextareaWithError: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <Label htmlFor="textarea-error">Descrição</Label>
      <Textarea id="textarea-error" placeholder="Campo com erro" hasError rows={5} />
      <span style={{ color: '#dc3545', fontSize: '0.875rem', marginTop: '0.25rem', display: 'block' }}>
        Este campo é obrigatório
      </span>
    </div>
  ),
};

export const AllTypes: Story = {
  render: () => (
    <div style={{ width: '400px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <Label htmlFor="text-input">Texto</Label>
        <Input id="text-input" type="text" placeholder="Digite texto..." />
      </div>
      <div>
        <Label htmlFor="email-input">Email</Label>
        <Input id="email-input" type="email" placeholder="email@exemplo.com" />
      </div>
      <div>
        <Label htmlFor="date-input">Data</Label>
        <Input id="date-input" type="date" />
      </div>
      <div>
        <Label htmlFor="textarea-input">Textarea</Label>
        <Textarea id="textarea-input" placeholder="Digite uma descrição..." rows={4} />
      </div>
    </div>
  ),
};

