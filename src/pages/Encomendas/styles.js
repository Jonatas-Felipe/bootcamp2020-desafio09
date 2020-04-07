import styled, { css } from 'styled-components';
import { lighten } from 'polished';

export const Entregador = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    margin-right: 5px;
  }
`;

export const Status = styled.p`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-weight: bold;
  border-radius: 50px;
  width: 130px;
  height: 25px;
  font-size: 14px;
  text-transform: uppercase;

  ::before {
    content: '';
    border-radius: 50%;
    width: 10px;
    height: 10px;
    margin: 0 5px 0 10px;
    display: block;
  }

  ${props => {
    let estilo;
    if (props.status) {
      switch (props.status) {
        case 'entregue':
          estilo = css`
            background: ${lighten(0.4, '#2ca42b')};
            color: #2ca42b;
            ::before {
              background: #2ca42b;
            }
          `;
          break;
        case 'pendente':
          estilo = css`
            background: ${lighten(0.4, '#c1bc35')};
            color: #c1bc35;
            ::before {
              background: #c1bc35;
            }
          `;
          break;
        case 'retirada':
          estilo = css`
            background: ${lighten(0.3, '#4d85ee')};
            color: #4d85ee;
            ::before {
              background: #4d85ee;
            }
          `;
          break;
        case 'cancelada':
          estilo = css`
            background: ${lighten(0.3, '#de3b3b')};
            color: #de3b3b;
            ::before {
              background: #de3b3b;
            }
          `;
          break;
        default:
          estilo = css`
            background: ${lighten(0.3, '#666')};
            color: #666;
            ::before {
              background: #666;
            }
          `;
      }
    }
    return estilo;
  }}
`;
