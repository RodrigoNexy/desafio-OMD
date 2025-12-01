import styled from 'styled-components';

export const HomePageContainer = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
`;

export const HomePageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
`;

export const HomePageTitle = styled.h1`
  margin: 0;
  font-size: 2rem;
  font-weight: 700;
  color: #f5f5f5;
`;

export const HomePageSection = styled.section`
  margin-bottom: 4rem;
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

export const SectionTitle = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: #f5f5f5;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const SectionCount = styled.span`
  font-size: 0.875rem;
  color: #8a8a8a;
  margin-left: 0.5rem;
`;

export const CardsScrollContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  overflow-x: auto;
  padding: 1rem 0;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #111111;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #00d4ff;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #4de3ff;
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #8a8a8a;
`;

export const EmptyStateText = styled.p`
  margin: 0 0 1.5rem 0;
  font-size: 1rem;
`;

