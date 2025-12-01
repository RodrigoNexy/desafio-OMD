import type { Meta, StoryObj } from '@storybook/react';
import { Loading } from './Loading';

const meta = {
  title: 'Atoms/Loading',
  component: Loading,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    fullScreen: {
      control: 'boolean',
      description: 'Se o loading deve ocupar toda a tela',
    },
  },
} satisfies Meta<typeof Loading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    fullScreen: false,
  },
};

export const FullScreen: Story = {
  args: {
    fullScreen: true,
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const Inline: Story = {
  render: () => (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <p style={{ marginBottom: '1rem' }}>Carregando conteúdo...</p>
      <Loading />
    </div>
  ),
};

export const WithText: Story = {
  render: () => (
    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
      <Loading />
      <p style={{ color: '#b0b0b0', margin: 0 }}>Aguarde enquanto carregamos...</p>
    </div>
  ),
};

