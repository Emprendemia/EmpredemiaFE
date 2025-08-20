import styled from 'styled-components';
import theme from '../../theme';

export const Th = styled.th`
  padding: 12px;
  min-height: 52px;
  background-color: ${theme.palette.primary.main};
  color: ${theme.palette.primary.contrastText};
  text-align: left;
  vertical-align: middle;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 0.92rem;
    padding: 10px;
  }
`;

export const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid rgba(0,0,0,0.12);
  text-align: left;
  color: ${theme.palette.text.primary};
  vertical-align: middle;
  height: 52px;        /* altura exacta por fila */
  line-height: 1.2;    /* estable */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 768px) {
    font-size: 0.92rem;
    padding: 10px;
  }
`;

export const Tr = styled.tr`
  &:nth-child(even) {
    background-color: ${theme.palette.background.default};
  }
`;

export const Container = styled.div`
  width: 100%;
  margin: 24px auto;
  padding: 32px 20px;
  background-color: ${theme.palette.background.paper};
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  text-align: center;

  @media (max-width: 768px) {
    padding: 24px 12px;
  }
`;

export const Title = styled.h2`
  color: ${theme.palette.text.primary};
  margin-bottom: 16px;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  margin-top: 12px;
  overflow: hidden;
  border-radius: 10px;

  thead ${Th} {
    position: sticky;
    top: 0;
    z-index: 1;
  }

  @media (max-width: 768px) {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
    border-radius: 10px;
  }
`;

export const HeaderCellContent = styled.div<{ $justify?: 'flex-start' | 'flex-end' | 'space-between' }>`
  display: flex;
  align-items: center;
  justify-content: ${({ $justify }) => $justify || 'space-between'};
  gap: 10px;

  > span {
    font-weight: 700;
  }
`;

export const FilterSelect = styled.select`
  padding: 6px 12px;
  border-radius: 8px;
  border: 1px solid rgba(255,255,255,0.28);
  background: ${theme.palette.background.paper};
  color: ${theme.palette.text.primary};
  font-size: 0.95rem;
  max-width: 100%;
  min-width: 140px;
  outline: none;

  &:focus {
    border-color: ${theme.palette.secondary.main};
  }

  @media (max-width: 768px) {
    min-width: 120px;
    font-size: 0.9rem;
  }
`;

export const Button = styled.button`
  background-color: ${theme.palette.secondary.main};
  color: ${theme.palette.primary.main};
  padding: 8px 16px;
  border: none;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${theme.palette.secondary.dark};
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 8px 12px;
  }
`;

export const ExpandButton = styled(Button)`
  font-size: 0.875rem;
  padding: 6px 12px;
  white-space: nowrap;
`;

export const Pill = styled.span<{ $state: 'draft' | 'in_review' | 'published' | 'inactive' }>`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 10px;
  font-weight: 700;
  font-size: 0.85rem;
  color: ${theme.palette.primary.contrastText};
  background-color: ${({ $state }) =>
    $state === 'published' ? '#4CAF50' :
    $state === 'in_review' ? '#FFC107' :
    $state === 'inactive'  ? '#F44336' :
                             '#9E9E9E'};

  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 3px 10px;
  }
`;

/* Panel desplegable: sin padding extra; borde guía a la izquierda */
export const InnerTableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  background: ${theme.palette.background.default};
  border-top: 1px solid rgba(0,0,0,0.06);
  border-left: 4px solid ${theme.palette.primary.main}; /* guía */
  padding: 0; /* evita sumar píxeles “fantasma” */
  box-shadow: 0 6px 18px rgba(0,0,0,0.08) inset;
  animation: slideDown 180ms ease-out;

  @keyframes slideDown {
    from { transform: translateY(-4px); opacity: 0.75; }
    to   { transform: translateY(0);    opacity: 1;    }
  }
`;

export const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${theme.palette.background.paper};
  border-bottom: 1px solid rgba(0,0,0,0.06);
  padding: 10px 12px;
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  strong {
    color: ${theme.palette.text.primary};
    font-weight: 700;
  }
`;

export const Badge = styled.span`
  background: ${theme.palette.primary.main};
  color: ${theme.palette.primary.contrastText};
  border-radius: 999px;
  padding: 2px 10px;
  font-size: 0.8rem;
  font-weight: 700;
`;

export const ClosePanelBtn = styled.button`
  background: transparent;
  border: 1px solid rgba(0,0,0,0.2);
  padding: 6px 10px;
  border-radius: 8px;
  cursor: pointer;
  color: ${theme.palette.text.primary};
  font-weight: 600;

  &:hover {
    background: ${theme.palette.background.default};
  }
`;

export const CoursesInnerTable = styled.table`
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;

  thead ${Th} {
    background-color: ${theme.palette.primary.dark};
  }

  ${Th}, ${Td} {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;
