import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const ButtonPage = styled.button`
  width: 70px;
  height: 36px;
  background: #7159c1;
  border: none;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
  font-size: 14px;
  margin: 0 3px;
  transition: background 0.2s;
  opacity: ${props => (props.disabled ? 0.6 : 1)};
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};

  :hover {
    background: ${darken(0.03, '#7159c1')};
  }
`;

export const NumberPage = styled.button`
  width: 36px;
  height: 36px;
  background: #7159c1;
  border: none;
  border-radius: 4px;
  display: ${props => (props.hide ? 'none' : 'flex')};
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
  font-size: 14px;
  margin: 0 3px;
  transition: background 0.2s;
  opacity: ${props => (props.disabled ? 0.6 : 1)};
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};

  :hover {
    background: ${darken(0.03, '#7159c1')};
  }
`;
