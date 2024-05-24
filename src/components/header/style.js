import styled from 'styled-components';

export const Header_Container = styled.div`
	width: 100vw;
  height: 50px;
	display: flex;
	flex-direction: row;
  border-bottom: 1px black solid;
  justify-content: space-between;
  padding: 0px 200px;
  align-items: center;

  p {
    font-size: 38px;
    font-family: 'Pretendard-Black';
  }

  button {
    width: 70px;
    height: 30px;
    background: black;
    border: none;
    border-radius: 5px;
    color: white;
    font-size: 14px;
    cursor: pointer;
  }

`;

export const Header_WriteState = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`