import styled from 'styled-components';

export const InputFileContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  label {
    width: 150px;
    height: 150px;
    border: 1px dashed #ddd;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #ddd;
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;

    :hover {
      opacity: 0.6;
    }

    img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
    }

    input {
      display: none;
    }
  }
`;
