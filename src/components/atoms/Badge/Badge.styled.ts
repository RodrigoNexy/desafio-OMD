import styled from 'styled-components';

interface BadgeProps {
  $variant: "success" | "warning" | "info" | "danger" | "secondary";
}

export const StyledBadge = styled.span<BadgeProps>`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: 999px;
  line-height: 1.5;

  ${props => {
    switch (props.$variant) {
      case 'success':
        return `
          background: rgba(34, 197, 94, 0.1);
          color: #22c55e;
          border: 1px solid rgba(34, 197, 94, 0.2);
        `;
      case 'warning':
        return `
          background: rgba(251, 191, 36, 0.1);
          color: #fbbf24;
          border: 1px solid rgba(251, 191, 36, 0.2);
        `;
      case 'info':
        return `
          background: rgba(59, 130, 246, 0.1);
          color: #3b82f6;
          border: 1px solid rgba(59, 130, 246, 0.2);
        `;
      case 'danger':
        return `
          background: rgba(220, 53, 69, 0.1);
          color: #dc3545;
          border: 1px solid rgba(220, 53, 69, 0.2);
        `;
      case 'secondary':
      default:
        return `
          background: rgba(255, 255, 255, 0.06);
          color: #8a8a8a;
          border: 1px solid rgba(255, 255, 255, 0.08);
        `;
    }
  }}
`;

