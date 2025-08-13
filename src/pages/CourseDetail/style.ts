import styled from 'styled-components';
import theme from '../../theme';

export const Container = styled.div`
  width: 100%;
  max-width: 1100px;
  margin: 24px auto;
  padding: 32px 20px;
  background-color: ${theme.palette.background.default};
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.06);

  @media (max-width: 768px) {
    padding: 24px 16px;
    margin: 16px 12px;
  }
`;

export const Header = styled.header`
  margin-bottom: 20px;
`;

export const Title = styled.h1`
  color: ${theme.palette.primary.main};
  font-size: 2rem;
  margin: 0 0 6px;

  @media (max-width: 768px) {
    font-size: 1.7rem;
    text-align: center;
  }
`;

export const Description = styled.p`
  color: ${theme.palette.text.primary};
  font-size: 1.05rem;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1rem;
    text-align: center;
  }
`;

export const VideoCard = styled.section`
  background: ${theme.palette.background.paper};
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 12px;
  padding: 16px;
  margin-top: 20px;
  box-shadow: 0 2px 14px rgba(0,0,0,0.04);
`;

export const VideoWrapper = styled.div`
  width: 100%;
  aspect-ratio: 16/9;
  border-radius: 10px;
  overflow: hidden;
`;

export const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: 0;
  display: block;
`;

export const ActionsRow = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 14px;
  flex-wrap: wrap;
`;

export const PrimaryButton = styled.button`
  background-color: ${theme.palette.secondary.main};
  color: ${theme.palette.primary.main};
  font-weight: bold;
  border: none;
  padding: 10px 16px;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color .25s ease;

  &:hover { background-color: ${theme.palette.secondary.dark}; }
`;

export const GhostButton = styled.button`
  background: transparent;
  color: ${theme.palette.primary.main};
  border: 1px solid ${theme.palette.primary.main};
  padding: 10px 16px;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color .2s ease, color .2s ease;

  &:hover {
    background-color: ${theme.palette.primary.main};
    color: ${theme.palette.primary.contrastText};
  }
`;

export const SectionTitle = styled.h3`
  margin: 28px 0 12px;
  font-size: 1.2rem;
  color: ${theme.palette.primary.main};
`;

export const ModuleList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ModuleItem = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 12px;
  background-color: ${theme.palette.background.paper};
  border: 1px solid rgba(0,0,0,0.06);
  padding: 12px 14px;
  border-radius: 10px;
  transition: box-shadow .2s ease, transform .1s ease;

  strong { color: ${theme.palette.text.primary}; }

  &:hover {
    box-shadow: 0 2px 10px rgba(0,0,0,0.06);
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

export const ModuleButton = styled(PrimaryButton)`
  padding: 8px 12px;
`;

export const RestartButton = styled(GhostButton)`
  border-color: ${theme.palette.error?.main || '#f44336'};
  color: ${theme.palette.error?.main || '#f44336'};

  &:hover {
    background-color: ${theme.palette.error?.main || '#f44336'};
    color: #fff;
  }
`;
