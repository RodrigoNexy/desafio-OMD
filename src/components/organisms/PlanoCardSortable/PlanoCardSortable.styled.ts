import styled from 'styled-components';

export const CardWrapper = styled.div<{ $index?: number }>`
  > div > div {
    animation-delay: ${props => (props.$index || 0) * 0.05}s;
  }
`;

