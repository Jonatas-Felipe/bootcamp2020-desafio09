import styled, { css } from 'styled-components';
import { darken } from 'polished';
import { Link } from 'react-router-dom';

export const H1 = styled.h1`
  text-align: ${props => (props.widthProps < 798 ? 'center' : 'left')};
  font-size: ${props => (props.widthProps < 798 ? '24px' : '2em')};
  margin-top: 3.5em !important;
  width: 100%;
`;

export const Content = styled.div`
  display: flex;
  justify-content: ${props =>
    props.widthProps < 798 ? 'space-around' : 'space-between'};
  align-items: center;
  margin: 34px 0 0 ${props => (props.widthProps < 798 ? '0px' : '22px')};

  label {
    width: 237px;
    height: 36px;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 4px;
    display: flex;

    svg {
      margin: 10px 8px 10px 16px;
    }

    input {
      border: none;
      background: none;
      font-size: 14px;
      color: #999;

      ::placeholder {
        color: #999;
      }
    }
  }
`;

export const CadastrarButton = styled(Link)`
  width: ${props => (props.widthProps < 798 ? '40px' : '142px')};
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

  :hover {
    background: ${darken(0.03, '#7159c1')};
  }

  svg {
    margin: 10px 0 10px 0;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: ${props =>
    props.widthProps < 798 ? 'space-between' : 'flex-start'};

  button {
    border: none;
    background: none;
    margin: 20px 10px 0;
    font-weight: bold;

    :hover {
      color: #7159c1 !important;
      text-decoration: underline;
    }
  }

  ${props =>
    props.buttonActive === 'problema'
      ? css`
          button:first-child {
            color: #666;
          }

          button:last-child {
            color: #7159c1;
            text-decoration: underline;
          }
        `
      : css`
          button:first-child {
            color: #7159c1;
            text-decoration: underline;
          }

          button:last-child {
            color: #666;
          }
        `};
`;

export const Table = styled.div`
  width: 100%;
  margin: 35px 0 10px;
  ${props =>
    props.widthProps < 798 &&
    css`
      overflow-x: auto;
    `};
`;

export const Thead = styled.div`
  display: flex;
  width: 100%;
  min-width: 1200px;
  justify-content: space-between;
  padding: 0 25px;
`;

export const Tr = styled.div`
  display: flex;
  width: 100%;
  min-width: 1200px;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  margin: 14px 0 7px;
  padding: 0 25px;
  border-radius: 4px;
  z-index: 0;
`;

export const Th = styled.span`
  font-weight: bold;
  width: 100%;
  color: #444;
  font-size: 16px;

  :first-child {
    width: 40%;
  }

  :last-child {
    width: 20%;
    text-align: center;
  }
`;

export const Td = styled.span`
  margin: 20px 0;
  width: 100%;
  color: #666;
  font-size: 16px;
  position: relative;

  :first-child {
    width: 40%;
  }

  :last-child {
    width: 20%;
    text-align: center;
  }
`;

export const VisualizarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  transition: opacity 0.2s, visibility 0.2s;
  display: flex;
  visibility: ${props => (props.visibility ? 'visibility' : 'hidden')};
  opacity: ${props => (props.visibility ? 1 : 0)};
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

export const Visualizar = styled.div`
  background: #fff;
  border-radius: 4px;
  width: 450px;

  > div {
    margin: 25px 25px 45px 25px;

    div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      + div {
        margin-top: 12px;
        padding-top: 12px;
        border-top: 1px solid #eee;
      }

      strong {
        color: #444;
        font-size: 14px;
        margin-bottom: 5px;
      }

      p {
        color: #666;
        font-size: 16px;
        margin-bottom: 5px;
      }

      img {
        align-self: center;
        margin-top: 20px;
        width: 235px;
        height: 40px;
      }

      span {
        position: relative;
        z-index: -1;
      }
    }
  }
`;

export const ContentNull = styled.div`
  width: 100%;
  height: 300px;
  margin-top: 34px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #fff;
  border-radius: 4px;

  svg {
    margin-bottom: 10px;
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;

  span {
    font-size: 1.5em;
    margin: 0 20px;
    font-weight: bold;
  }
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
  transition: background 0.2s;
  opacity: ${props => (props.disabled ? 0.6 : 1)};
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};

  :hover {
    background: ${darken(0.03, '#7159c1')};
  }
`;
