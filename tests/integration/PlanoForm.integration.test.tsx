import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PlanoForm } from '../../src/components/organisms/PlanoForm/PlanoForm';
import '@testing-library/jest-dom/vitest';

describe('PlanoForm Integration Tests', () => {
  const mockOnSubmit = vi.fn();
  const mockOnCancel = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render form with all fields', () => {
    render(
      <PlanoForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />
    );

    expect(screen.getByLabelText(/Título/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Objetivo/)).toBeInTheDocument();
    expect(screen.getByText('Cancelar')).toBeInTheDocument();
    expect(screen.getByText('Salvar')).toBeInTheDocument();
  });

  it('should validate required fields', async () => {
    const user = userEvent.setup();

    render(
      <PlanoForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />
    );

    const submitButton = screen.getByText('Salvar');
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/O título deve ter pelo menos 3 caracteres/i)).toBeInTheDocument();
      expect(screen.getByText(/O objetivo deve ter pelo menos 10 caracteres/i)).toBeInTheDocument();
    });

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('should submit form with valid data', async () => {
    const user = userEvent.setup();

    render(
      <PlanoForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />
    );

    const tituloInput = screen.getByLabelText(/Título/);
    const objetivoInput = screen.getByLabelText(/Objetivo/);

    await user.type(tituloInput, 'Plano Teste');
    await user.type(objetivoInput, 'Objetivo do plano teste');

    const submitButton = screen.getByText('Salvar');
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        titulo: 'Plano Teste',
        objetivo: 'Objetivo do plano teste',
      });
    });
  });

  it('should call onCancel when cancel button is clicked', async () => {
    const user = userEvent.setup();

    render(
      <PlanoForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />
    );

    const cancelButton = screen.getByText('Cancelar');
    await user.click(cancelButton);

    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });
});

