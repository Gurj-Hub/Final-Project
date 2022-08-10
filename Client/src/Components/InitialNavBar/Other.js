import { useContext, useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";

const Other = () => {
  const navigate = useNavigate();
  return (
    <>
      <Div> Unsure of what I should put here... </Div>
      <Container></Container>
    </>
  );
};
export default Other;

const Container = styled.div`
  display: flex;
`;
const Button = styled.div`
  display: flex;
  justify-content: center;
  width: fit-content;

  &:hover {
    color: rgb(102, 255, 153);
  }
`;
const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Lucida Console;
  font-size: 18px;
  height: 80px;
`;
const Img = styled.img`
  display: flex;
  margin: 0 auto;
  width: 40%;
  padding-bottom: 50px;
`;
