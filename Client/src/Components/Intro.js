import styled, { keyframes } from "styled-components";
import { NavLink } from "react-router-dom";
import { useState, useContext } from "react";
import { ProductDataContext } from "./ProductDataContext";
import { useNavigate } from "react-router-dom";
import Bg from "../solarINTRO.jpg";
import roof1 from "../roof1.jpg";
import roof2 from "../roof2.jpg";
import { AiFillCaretUp } from "react-icons/ai";

const Intro = () => {
  const navigate = useNavigate();

  return (
    <>
      <Div>
        {" "}
        <AiFillCaretUp
          style={{ height: "20px", width: "20px" }}
        ></AiFillCaretUp>{" "}
        Click on one of the options above{" "}
        <AiFillCaretUp
          style={{ height: "20px", width: "20px" }}
        ></AiFillCaretUp>
      </Div>
      <Container>
        <Img1></Img1>
        <Img2></Img2>
        <Img3></Img3>
      </Container>
    </>
  );
};

export default Intro;

const upAndDown = keyframes`
    0% {
        opacity: 1;
        transform: translateY(0px)
    }
    50% {
        opacity: 1;
        transform: translateY(12px)
    }
    100% {
        opacity: 1;
        transform: translateY(0px)
    }
`;
const Div = styled.div`
  display: flex;
  justify-content: center;
  color: white;
  opacity: 0;
  width: 100vw;
  animation: ${upAndDown} 1000ms infinite 4000ms forwards;
  margin-bottom: 15px;
`;

const Container = styled.div`
  display: flex;
`;
const Img1 = styled.div`
  width: 800px;
  height: 400px;
  background-image: url(${Bg});
  background-size: 50vw 50vh;
  background-repeat: no-repeat;
`;

const Img2 = styled.div`
  width: 800px;
  height: 400px;
  background-image: url(${roof1});
  background-size: 50vw 50vh;
  background-repeat: no-repeat;
`;
const Img3 = styled.div`
  width: 800px;
  height: 400px;
  background-image: url(${roof2});
  background-size: 50vw 50vh;
  background-repeat: no-repeat;
`;
const Img4 = styled.div`
  width: 800px;
  height: 400px;
  background-image: url(${Bg});
  background-size: 50vw 50vh;
  background-repeat: no-repeat;
`;
