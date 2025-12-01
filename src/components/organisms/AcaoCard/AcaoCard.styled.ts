import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const AcaoCardContainer = styled.div`
  background: #151515;
  border-radius: 1rem;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.3s ease;
  width: 100%;
  user-select: none;
  opacity: 0;
  animation: ${fadeIn} 0.35s ease-out forwards;
`;

export const AcaoCardContent = styled.div`
  margin-bottom: 1rem;
`;

export const AcaoCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  gap: 0.75rem;
`;

export const AcaoCardTitle = styled.h4`
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: #f5f5f5;
  flex: 1;
  line-height: 1.4;
`;

export const AcaoCardStatus = styled.div`
  flex-shrink: 0;
`;

export const AcaoCardPrazo = styled.div`
  font-size: 0.875rem;
  color: #8a8a8a;
  margin: 0;
`;

export const AcaoCardFooter = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: flex-end;
`;

