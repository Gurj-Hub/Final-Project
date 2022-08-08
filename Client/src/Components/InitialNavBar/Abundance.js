import { useContext, useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import { AiFillRightCircle } from "react-icons/ai";
import tooMuch from "../../abundance.png";

const Abundance = () => {
  const navigate = useNavigate();
  return (
    <>
      <Div>
        {" "}
        At any give moment, the sun hits the Earth with 173 000 terawatts.
        Roughly, 10 000 times the worlds total energy use.{" "}
      </Div>
      <Img src={tooMuch}></Img>
      <Div>
        {/* <Button onClick={() => navigate("/efficiency")}>
          {" "}
          <AiFillRightCircle style={{ height: "30px", width: "30px" }}>
            {" "}
          </AiFillRightCircle>
        </Button> */}
      </Div>
    </>
  );
};

export default Abundance;

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
  width: 50%;
  padding-bottom: 50px;
`;
