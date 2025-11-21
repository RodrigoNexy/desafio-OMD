import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import { FormField } from '../../../../src/components/molecules/FormField/FormField';

describe('FormField Component', () => {
  describe('Rendering', () => {
    it('should render label', () => {
      render(<FormField label="Test Label" name="test" />);
      expect(screen.getByText('Test Label')).toBeInTheDocument();
    });

    it('should render required indicator when required', () => {
      render(<FormField label="Test Label" name="test" required />);
      expect(screen.getByText(/Test Label \*/)).toBeInTheDocument();
    });

    it('should render input by default', () => {
      render(<FormField label="Test Label" name="test" />);
      const input = screen.getByLabelText(/Test Label/);
      expect(input.tagName).toBe('INPUT');
    });

    it('should render textarea when type is textarea', () => {
      render(<FormField label="Test Label" name="test" type="textarea" />);
      const textarea = screen.getByLabelText(/Test Label/);
      expect(textarea.tagName).toBe('TEXTAREA');
    });
  });

  describe('Error Display', () => {
    it('should display error message when error is provided', () => {
      render(<FormField label="Test Label" name="test" error="Error message" />);
      expect(screen.getByText('Error message')).toBeInTheDocument();
    });

    it('should apply error styles to input when error exists', () => {
      render(<FormField label="Test Label" name="test" error="Error" />);
      const input = screen.getByLabelText(/Test Label/);
      expect(input).toHaveClass('border-danger');
    });
  });

  describe('Interactions', () => {
    it('should call onChange when typing', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(<FormField label="Test Label" name="test" onChange={handleChange} />);
      const input = screen.getByLabelText(/Test Label/);

      await user.type(input, 'test');
      expect(handleChange).toHaveBeenCalled();
    });
  });
});

