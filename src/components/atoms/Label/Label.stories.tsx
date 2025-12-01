import type { Meta, StoryObj } from '@storybook/react';
import { Label } from './Label';

const meta = {
  title: 'Atoms/Label',
  component: Label,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'Texto do label',
    },
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Nome',
  },
};

export const Required: Story = {
  render: () => (
    <Label>
      Email <span style={{ color: '#dc3545' }}>*</span>
    </Label>
  ),
};

export const WithInput: Story = {
  render: () => (
    <div style={{ width: '300px' }}>
      <Label htmlFor="example-input">Nome completo</Label>
      <input
        id="example-input"
        type="text"
        placeholder="Digite seu nome"
        style={{
          width: '100%',
          padding: '0.75rem',
          borderRadius: '0.75rem',
          backgroundColor: '#151515',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          color: '#f5f5f5',
        }}
      />
    </div>
  ),
};

export const AllTypes: Story = {
  render: () => (
    <div style={{ width: '400px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <Label htmlFor="text-field">Campo de Texto</Label>
        <input
          id="text-field"
          type="text"
          placeholder="Texto..."
          style={{
            width: '100%',
            padding: '0.75rem',
            borderRadius: '0.75rem',
            backgroundColor: '#151515',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            color: '#f5f5f5',
          }}
        />
      </div>
      <div>
        <Label htmlFor="email-field">Email</Label>
        <input
          id="email-field"
          type="email"
          placeholder="email@exemplo.com"
          style={{
            width: '100%',
            padding: '0.75rem',
            borderRadius: '0.75rem',
            backgroundColor: '#151515',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            color: '#f5f5f5',
          }}
        />
      </div>
      <div>
        <Label htmlFor="textarea-field">Descrição</Label>
        <textarea
          id="textarea-field"
          placeholder="Digite uma descrição..."
          rows={4}
          style={{
            width: '100%',
            padding: '0.75rem',
            borderRadius: '0.75rem',
            backgroundColor: '#151515',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            color: '#f5f5f5',
            fontFamily: 'inherit',
            resize: 'vertical',
          }}
        />
      </div>
    </div>
  ),
};

