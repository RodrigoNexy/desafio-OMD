import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { Badge } from '../../../../src/components/atoms/Badge/Badge';

describe('Badge Component', () => {
  describe('Rendering', () => {
    it('should render badge with text', () => {
      render(<Badge variant="success">Status</Badge>);
      expect(screen.getByText('Status')).toBeInTheDocument();
    });

    it('should render with different variants', () => {
      const { rerender } = render(<Badge variant="success">Success</Badge>);
      expect(screen.getByText('Success')).toBeInTheDocument();

      rerender(<Badge variant="warning">Warning</Badge>);
      expect(screen.getByText('Warning')).toBeInTheDocument();

      rerender(<Badge variant="info">Info</Badge>);
      expect(screen.getByText('Info')).toBeInTheDocument();
    });

    it('should apply custom className', () => {
      render(<Badge variant="success" className="custom-badge">Badge</Badge>);
      const badge = screen.getByText('Badge');
      expect(badge).toHaveClass('custom-badge');
    });
  });
});

