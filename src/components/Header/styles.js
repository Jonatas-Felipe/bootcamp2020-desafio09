import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  width: 100%;
  background: #fff;
  box-shadow: 1px 1px 2px #ddd;
  position: fixed;
  top: 0;
  z-index: 1;
`;

export const Content = styled.div`
  max-width: 1440px;
  display: ${props => (props.widthProp < 798 ? 'block' : 'flex')};
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;

  nav {
    display: flex;
    align-items: center;
    justify-content: space-around;

    img {
      max-width: 136px;
      margin: 19px 30px;
      padding-right: 30px;
      box-sizing: content-box;
      border-right: 1px solid #ddd;
    }

    > div {
      button {
        border: none;
        background: none;

        > div {
          width: 20px;
          height: 3px;
          border-radius: 2.5px;
          background: #7159c1;
          margin: 2px 0;
          transition: all 0.3s;
        }

        ${props =>
          props.menuOpened &&
          css`
            > div:first-child {
              transform: rotate(45deg);
              position: relative;
              top: 5px;
            }

            > div:last-child {
              transform: rotate(-45deg);
            }

            > div:nth-child(2) {
              display: none;
            }
          `}
      }

      > div:last-child {
        transition: left 0.3s;
        position: absolute;
        top: 50px;
        background: #fff;
        padding: 10px;
        width: 100%;
        height: 100vh;
        left: ${props => (props.menuOpened ? 0 : '-1000px')};
        z-index: 1;

        ul {
          li {
            margin-bottom: 10px;
          }
        }

        div {
          margin-top: 10px;
          margin-right: 0;
          padding-top: 20px;
          border-top: 1px solid #ddd;
          button {
            text-align: left;
          }
        }
      }
    }

    > ul {
      display: flex;

      li {
        + li {
          margin-left: 20px;
        }
      }
    }
  }

  div {
    display: flex;
    flex-direction: column;
    margin: 6px 30px 15px 0;

    strong {
      color: #666;
      margin-bottom: 5px;
    }

    button {
      background: none;
      border: 0;
      color: #de3b3b;
    }
  }
`;

export const LinkComponent = styled(Link)`
  font-weight: bold;
  color: ${props => (props.ativo ? '#444' : '#999')};

  &:hover {
    color: #444;
    }
  }
`;
