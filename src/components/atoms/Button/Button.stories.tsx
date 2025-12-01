import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger'],
      description: 'Variante visual do botão',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Se o botão deve ocupar toda a largura disponível',
    },
    disabled: {
      control: 'boolean',
      description: 'Se o botão está desabilitado',
    },
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Botão Primário',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Botão Secundário',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Deletar',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    children: 'Botão Desabilitado',
    disabled: true,
  },
};

export const FullWidth: Story = {
  args: {
    variant: 'primary',
    children: 'Botão Largura Completa',
    fullWidth: true,
  },
  parameters: {
    layout: 'padded',
  },
};

