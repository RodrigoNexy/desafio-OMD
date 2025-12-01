import styled from 'styled-components';

export const StyledButton = styled.button<{
  $variant?: 'primary' | 'secondary' | 'danger';
  $fullWidth?: boolean;
}>`
  padding: 0.625rem 1.25rem;
  border-radius: 0.5rem;
  transition: all 0.2s;
  font-weight: 500;
  width: ${props => props.$fullWidth ? '100%' : 'auto'};
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;

    &:hover {
      transform: none;
    }
  }

  ${props => {
    switch (props.$variant) {
      case 'primary':
        return `
          background-color: rgba(255, 255, 255, 0.08);
          color: #f5f5f5;
          border: 1px solid rgba(255, 255, 255, 0.12);

          &:hover:not(:disabled) {
            background-color: rgba(255, 255, 255, 0.12);
            border-color: rgba(255, 255, 255, 0.2);
          }
        `;
      case 'secondary':
        return `
          background-color: rgba(255, 255, 255, 0.06);
          color: #b0b0b0;
          border: 1px solid rgba(255, 255, 255, 0.08);

          &:hover:not(:disabled) {
            background-color: rgba(255, 255, 255, 0.08);
            border-color: rgba(255, 255, 255, 0.12);
          }
        `;
      case 'danger':
        return `
          background-color: rgba(220, 53, 69, 0.1);
          color: #dc3545;
          border: 1px solid rgba(220, 53, 69, 0.2);

          &:hover:not(:disabled) {
            background-color: rgba(220, 53, 69, 0.15);
            border-color: rgba(220, 53, 69, 0.3);
          }
        `;
      default:
        return '';
    }
  }}

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

