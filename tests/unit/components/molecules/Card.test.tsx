import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { Card } from '../../../../src/components/molecules';
import { CardHeaderComponent, CardContentComponent, CardFooterComponent } from '../../../../src/components/molecules/Card/Card';

describe('Card Component', () => {
  describe('Rendering', () => {
    it('should render card with children', () => {
      render(
        <Card>
          <div>Card Content</div>
        </Card>
      );
      expect(screen.getByText('Card Content')).toBeInTheDocument();
    });

    it('should apply custom className', () => {
      const { container } = render(
        <Card className="custom-card">
          Content
        </Card>
      );
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('custom-card');
    });
  });
});

describe('CardHeader Component', () => {
  it('should render header with title', () => {
    render(<CardHeaderComponent title="Card Title" />);
    expect(screen.getByText('Card Title')).toBeInTheDocument();
  });

  it('should render header with actions', () => {
    render(
      <CardHeaderComponent
        title="Card Title"
        actions={<button>Action</button>}
      />
    );
    expect(screen.getByText('Card Title')).toBeInTheDocument();
    expect(screen.getByText('Action')).toBeInTheDocument();
  });
});

describe('CardContent Component', () => {
  it('should render content with children', () => {
    render(<CardContentComponent>Content Text</CardContentComponent>);
    expect(screen.getByText('Content Text')).toBeInTheDocument();
  });
});

describe('CardFooter Component', () => {
  it('should render footer with children', () => {
    render(<CardFooterComponent><button>Footer Button</button></CardFooterComponent>);
    expect(screen.getByText('Footer Button')).toBeInTheDocument();
  });
});

