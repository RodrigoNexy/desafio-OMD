import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Modal } from './Modal';
import { Button } from '../../atoms/Button/Button';
import { FormField } from '../FormField/FormField';

const meta = {
  title: 'Molecules/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Se o modal está aberto',
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

const ModalWrapper = ({ children, ...props }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Abrir Modal</Button>
      <Modal {...props} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {children}
      </Modal>
    </>
  );
};

export const Simple: Story = {
  render: () => (
    <ModalWrapper title="Modal Simples">
      <p>Este é um modal simples com apenas conteúdo.</p>
    </ModalWrapper>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <ModalWrapper
      title="Modal com Rodapé"
      footer={
        <>
          <Button variant="secondary" onClick={() => alert('Cancelado!')}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={() => alert('Salvo!')}>
            Salvar
          </Button>
        </>
      }
    >
      <p>Este modal possui um rodapé com botões de ação.</p>
    </ModalWrapper>
  ),
};

export const WithForm: Story = {
  render: () => (
    <ModalWrapper
      title="Criar Novo Plano"
      footer={
        <>
          <Button variant="secondary" onClick={() => alert('Cancelado!')}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={() => alert('Salvo!')}>
            Criar
          </Button>
        </>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <FormField
          label="Título"
          name="titulo"
          placeholder="Digite o título do plano"
          required
        />
        <FormField
          label="Objetivo"
          name="objetivo"
          type="textarea"
          placeholder="Digite o objetivo do plano"
          required
        />
      </div>
    </ModalWrapper>
  ),
};

export const LongContent: Story = {
  render: () => (
    <ModalWrapper title="Modal com Conteúdo Longo">
      <div>
        <p style={{ marginBottom: '1rem' }}>
          Este modal possui conteúdo longo para demonstrar o comportamento do scroll.
        </p>
        {Array.from({ length: 10 }).map((_, i) => (
          <p key={i} style={{ marginBottom: '1rem' }}>
            Parágrafo {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        ))}
      </div>
    </ModalWrapper>
  ),
};

