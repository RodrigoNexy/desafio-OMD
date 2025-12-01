import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const PlanoCardContainer = styled.div`
  background: #151515;
  border-radius: 1rem;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.3s ease;
  min-width: 320px;
  max-width: 380px;
  height: 100%;
  user-select: none;
  opacity: 0;
  animation: ${fadeIn} 0.4s ease-out forwards;

  &:hover {
    border-color: rgba(255, 255, 255, 0.16);
    transform: translateY(-2px);
  }
`;

export const PlanoCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  gap: 0.75rem;
`;

export const PlanoCardTitle = styled.h3`
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: #f5f5f5;
  line-height: 1.4;
  flex: 1;
`;

export const PlanoCardStatus = styled.div`
  flex-shrink: 0;
`;

export const PlanoCardContent = styled.div`
  margin-bottom: 1rem;
`;

export const PlanoCardDescription = styled.p`
  margin: 0 0 1rem 0;
  color: #b0b0b0;
  font-size: 0.875rem;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const PlanoCardInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 0.8125rem;
  color: #8a8a8a;
`;

export const PlanoCardInfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const PlanoCardProgress = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.5rem;
`;

export const PlanoCardProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background: #111111;
  border-radius: 999px;
  overflow: hidden;
  margin-top: 0.5rem;
`;

export const PlanoCardProgressFill = styled.div<{ percentage: number }>`
  height: 100%;
  background: linear-gradient(90deg, #00d4ff 0%, #4de3ff 100%);
  border-radius: 999px;
  transition: width 0.3s ease;
  width: ${props => props.percentage}%;
`;

export const PlanoCardPercentage = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  color: #00d4ff;
  margin-left: 0.5rem;
`;

