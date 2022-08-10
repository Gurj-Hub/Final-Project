import { useContext, useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import decrease from "../../costDecrease.jpg";
import prediction from "../../prediction-decrease.jpg";

const Efficiency = () => {
  const navigate = useNavigate();
  return (
    <>
      <Div>
        {" "}
        The cost of solar panels has dropped by 80% since 2008. In December
        2016, the cost of building and installing new solar electricity
        generation dropped to $1.65 per watt, narrowly beating out its renewable
        counterpart wind ($1.66/Watt) and its fossil fuel competitors.{" "}
      </Div>
      <Container>
        <Img src={decrease}></Img>
        <Img src={prediction}></Img>
      </Container>
    </>
  );
};
export default Efficiency;

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
  margin-left: 15px;
`;
const Img = styled.img`
  display: flex;
  margin: 0 auto;
  width: 40%;
  padding-bottom: 50px;
`;
