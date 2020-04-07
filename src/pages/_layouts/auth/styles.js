import styled from 'styled-components';

export const Container = styled.div`
  background: #7159c1;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 360px;
  text-align: center;
  background: #fff;
  border-radius: 4px;

  > img {
    max-width: 260px;
    margin: 60px 0 35px;
  }

  form {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 30px;

    label {
      width: 100%;
      text-align: left;
      font-size: 14px;
      font-weight: bold;
      margin: 5px 0 10px;
    }

    input {
      width: 100%;
      height: 45px;
      font-size: 16px;
      border: 1px solid #ddd;
      border-radius: 4px;
      background-color: transparent;
      text-indent: 15px;
      margin-bottom: 10px;
    }

    span {
      color: rgba(255, 0, 0);
    }

    button {
      width: 100%;
      height: 45px;
      background: #7159c1;
      color: #fff;
      font-weight: bold;
      border: none;
      border-radius: 4px;
      margin: 5px 0 60px;
    }
  }

  > div {
    margin: 60px 0;
    padding: 0 30px;

    img {
      margin-bottom: 10px;
    }

    p {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 10px;
    }

    a {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 45px;
      background: #7159c1;
      color: #fff;
      font-weight: bold;
      border: none;
      border-radius: 4px;
      margin-top: 20px;
    }
  }
`;
