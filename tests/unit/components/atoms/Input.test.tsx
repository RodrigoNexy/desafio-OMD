import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import { Input, Textarea } from '../../../../src/components/atoms/Input/Input';

describe('Input Component', () => {
  describe('Rendering', () => {
    it('should render input with correct type', () => {
      render(<Input type="text" data-testid="input" />);
      const input = screen.getByTestId('input');
      expect(input).toHaveAttribute('type', 'text');
    });

    it('should render input with placeholder', () => {
      render(<Input placeholder="Enter text" data-testid="input" />);
      expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
    });

    it('should render input with value', () => {
      render(<Input value="test value" onChange={() => {}} data-testid="input" />);
      const input = screen.getByTestId('input') as HTMLInputElement;
      expect(input.value).toBe('test value');
    });
  });

  describe('Interactions', () => {
    it('should call onChange when typing', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(<Input onChange={handleChange} data-testid="input" />);
      const input = screen.getByTestId('input');

      await user.type(input, 'test');
      expect(handleChange).toHaveBeenCalled();
    });
  });

  describe('Error State', () => {
    it('should apply error styles when hasError is true', () => {
      render(<Input hasError data-testid="input" />);
      const input = screen.getByTestId('input');
      expect(input).toHaveClass('border-danger');
    });
  });

  describe('Disabled State', () => {
    it('should be disabled when disabled prop is true', () => {
      render(<Input disabled data-testid="input" />);
      expect(screen.getByTestId('input')).toBeDisabled();
    });
  });
});

describe('Textarea Component', () => {
  it('should render textarea element', () => {
    render(<Textarea data-testid="textarea" />);
    expect(screen.getByTestId('textarea')).toBeInTheDocument();
    expect(screen.getByTestId('textarea').tagName).toBe('TEXTAREA');
  });

  it('should call onChange when typing', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(<Textarea onChange={handleChange} data-testid="textarea" />);
    const textarea = screen.getByTestId('textarea');

    await user.type(textarea, 'test');
    expect(handleChange).toHaveBeenCalled();
  });
});

