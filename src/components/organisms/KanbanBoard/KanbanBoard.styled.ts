import styled from 'styled-components';

export const BoardContainer = styled.div`
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 1rem;
  min-height: 600px;
`;

export const DragOverlayCard = styled.div`
  opacity: 0.5;
  transform: rotate(3deg);
  width: 300px;
`;

