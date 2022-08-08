import { useContext, useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { AiFillRightCircle } from "react-icons/ai";
import { AiFillLeftCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import efficiency from "../../efficiency.gif";

const Efficiency = () => {
  const navigate = useNavigate();
  return (
    <>
      <Div>
        {" "}
        In early 2019, the U.S. surpassed 2 million solar system installations.
        This milestone comes just three years after the industry completed its 1
        millionth installation, a feat that took 40 years to accomplish..{" "}
      </Div>
      <Container>
        <Img src={efficiency}></Img>
      </Container>
      {/* <Div>
        <Button onClick={() => navigate("/abundance")}>
          {" "}
          <AiFillLeftCircle style={{ height: "30px", width: "30px" }}>
            {" "}
          </AiFillLeftCircle>
        </Button>
        <Button onClick={() => navigate("/cost")}>
          <AiFillRightCircle style={{ height: "30px", width: "30px" }}>
            {" "}
          </AiFillRightCircle>
        </Button>
      </Div> */}
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
  font-size: 18px;
  font-family: Lucida Console;
  height: 80px;
  width: 100%;
  margin-left: 15px;
`;
const Img = styled.img`
  display: flex;
  margin: 0 auto;
  width: 50%;
  padding-bottom: 50px;
`;
