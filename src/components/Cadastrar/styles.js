import styled, { css } from 'styled-components';
import { darken } from 'polished';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  max-width: 900px;
  margin: 90px auto;
`;

export const Content = styled.div`
  display: ${props => (props.widthProp < 798 ? 'block' : 'flex')};
  justify-content: space-between;
  align-items: center;
  margin: 20px;

  ${props =>
    props.widthProp < 798 &&
    css`
      h1 {
        text-align: center;
        font-size: 22px;
        margin-bottom: 10px;
      }
    `}

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
      width: 112px;
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
      transition: background 0.2s;
      margin-left: 8px;

      :hover {
        background: ${darken(0.03, '#7159c1')};
      }

      svg {
        margin: 10px 0 10px 0;
      }
    }
  }
`;

export const VoltarButton = styled(Link)`
  width: 112px;
  height: 36px;
  background: #ccc;
  border: none;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
  font-size: 14px;
  transition: background 0.2s;
  margin-right: 8px;

  :hover {
    background: ${darken(0.1, '#ccc')};
  }

  svg {
    margin: 10px 0 10px 0;
  }
`;

export const InputContent = styled.div`
  background: #fff;
  padding: 26px 30px;
  border-radius: 4px;
`;

export const GroupInputs = styled.div`
  display: grid;
  grid-template-columns: ${props => (props.fr ? props.fr : '1fr')};
  align-items: center;
  width: 100%;
`;

export const InputGroup = styled.div`
  width: 100%;
  padding: 0 10px;
  margin-bottom: 16px;

  label {
    display: block;
    width: 100%;
    color: #444;
    font-weight: bold;
    margin-bottom: 9px;
  }

  select,
  input {
    width: 100%;
    height: 45px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
    color: #999;
    text-indent: 15px;
  }

  span {
    color: rgba(255, 0, 0);
  }
`;
