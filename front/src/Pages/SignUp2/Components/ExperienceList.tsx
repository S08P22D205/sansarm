import React from 'react';
import styled from 'styled-components';

function ExperienceList() {
  return(
      // 여기에 등산경험 입력 결과
    <ExpListDiv>
      <br />
      <DelBtnDiv>
        <DelBtn>X</DelBtn>
      </DelBtnDiv>
      <MtName>산이름</MtName>
      <ClickedDiffBtn>쉬움</ClickedDiffBtn>
      <DiffBtn>보통</DiffBtn>
      <DiffBtn>어려움</DiffBtn>
    </ExpListDiv>
  )
}
export default ExperienceList

const ExpListDiv = styled.div`
  width : 100vw;
  height : 12vw;
  display: flex;
  justify-content: space-evenly
  `

const DelBtnDiv = styled.div`
  display : flex;
  align-items : center;
`

const DelBtn = styled.button`
  width: 7vw;
  height: 7vw;
  font-size: 4vw;
  background-color : white;
`

const MtName = styled.a`
  font-size: 10vw;
  padding-top : 1vw;
  font-weight: bold;
`

const DiffBtn = styled.button`
  width: 18vw;
  height: 12vw;
  font-size: 4.5vw;
  background-color : white;
  border-radius : 20px
`

const ClickedDiffBtn = styled.button`
  width: 18vw;
  height: 12vw;
  font-size: 4.5vw;
  background-color : white;
  border-radius : 20px;
  font-weight: bold;
  color : #238C47;
  border-color: #238C47;
  border-style : solid;
`