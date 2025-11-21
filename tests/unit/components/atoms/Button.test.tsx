import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import { Button } from '../../../../src/components/atoms/Button/Button';

describe('Button Component', () => {
  describe('Rendering', () => {
    it('should render button with children', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByText('Click me')).toBeInTheDocument();
    });

    it('should render with different variants', () => {
      const { rerender } = render(<Button variant="primary">Primary</Button>);
      expect(screen.getByText('Primary')).toBeInTheDocument();

      rerender(<Button variant="secondary">Secondary</Button>);
      expect(screen.getByText('Secondary')).toBeInTheDocument();

      rerender(<Button variant="danger">Danger</Button>);
      expect(screen.getByText('Danger')).toBeInTheDocument();
    });

    it('should render with fullWidth when specified', () => {
      render(<Button fullWidth>Full Width Button</Button>);
      const button = screen.getByText('Full Width Button');
      expect(button).toHaveClass('w-full');
    });
  });

  describe('Interactions', () => {
    it('should call onClick when clicked', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(<Button onClick={handleClick}>Click me</Button>);

      await user.click(screen.getByText('Click me'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should not call onClick when disabled', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(<Button onClick={handleClick} disabled>Disabled Button</Button>);

      await user.click(screen.getByText('Disabled Button'));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('States', () => {
    it('should be disabled when disabled prop is true', () => {
      render(<Button disabled>Disabled Button</Button>);
      expect(screen.getByText('Disabled Button')).toBeDisabled();
    });

    it('should apply custom className', () => {
      render(<Button className="custom-class">Button</Button>);
      const button = screen.getByText('Button');
      expect(button).toHaveClass('custom-class');
    });
  });
});

