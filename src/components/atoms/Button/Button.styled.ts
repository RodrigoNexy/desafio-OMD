import styled from 'styled-components';

export const StyledButton = styled.button<{
  $variant?: 'primary' | 'secondary' | 'danger';
  $fullWidth?: boolean;
}>`
  padding: 0.625rem 1.25rem;
  border-radius: 0.75rem;
  transition: all 0.2s;
  font-weight: ${props => props.$variant === 'primary' ? '600' : '400'};
  width: ${props => props.$fullWidth ? '100%' : 'auto'};
  cursor: pointer;
  border: none;

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
          background-color: #00d4ff;
          color: #0d0d0d;
          box-shadow: 0 18px 40px rgba(0, 212, 255, 0.2);

          &:hover:not(:disabled) {
            background-color: #4de3ff;
            box-shadow: 0 26px 60px rgba(0, 212, 255, 0.28);
            transform: translateY(-2px);
          }
        `;
      case 'secondary':
        return `
          background-color: #151515;
          color: #f5f5f5;
          border: 1px solid rgba(255, 255, 255, 0.08);

          &:hover:not(:disabled) {
            background-color: #1c1c1c;
            transform: translateY(-2px);
          }
        `;
      case 'danger':
        return `
          background-color: #dc3545;
          color: white;

          &:hover:not(:disabled) {
            background-color: #c82333;
            transform: translateY(-2px);
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

