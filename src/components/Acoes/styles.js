import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

export const OptionsButton = styled.button`
  width: 100%;
  border: none;
  background: none;
`;

export const OptionsList = styled.ul`
  display: ${props => (props.visible ? 'block' : 'none')};
  width: 204px;
  background: #fff;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  position: absolute;
  left: calc(50% - 102px);
  top: calc(100%);
  z-index: 1;
  padding: 10px;

  &::before {
    content: '';
    position: absolute;
    left: calc(50% - 5px);
    top: -5px;
    width: 10px;
    height: 10px;
    transform: rotate(45deg);
    background: #fff;
    box-shadow: -1px -1px 2px -1px rgba(0, 0, 0, 0.2);
  }
`;

export const Option = styled.li`
  padding: 6px 0;
  + li {
    border-top: 1px solid #eee;
  }
`;

export const OptionButton = styled.button`
  display: flex;
  width: 100%;
  align-items: center;
  border: none;
  background: none;
  font-size: 16px;
  color: #999;

  ${props => {
    let color;
    switch (props.hover) {
      case 'editar':
        color = '#4d85ee';
        break;
      case 'exluir':
        color = '#de3b3b';
        break;
      default:
        color = '#7159c1';
    }
    return css`
      :hover {
        color: ${color};
      }
    `;
  }}

  svg {
    margin-right: 15px;
  }
`;

export const OptionLink = styled(Link)`
  display: flex;
  width: 100%;
  align-items: center;
  font-size: 16px;
  color: #999;

  :hover {
    color: #4d85ee;
  }

  svg {
    margin-right: 15px;
  }
`;
