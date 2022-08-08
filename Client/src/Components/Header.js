import styled, { keyframes } from "styled-components";
import { NavLink } from "react-router-dom";
import { useState, useContext } from "react";
import { ProductDataContext } from "./ProductDataContext";

const Header = () => {
  // const [screenWidth, setScreenWidth] = useState(window.screen.width);
  const { header } = useContext(ProductDataContext);
  console.log(header);
  if (header === "WHY") {
    return <Wrapper> Why Should You Consider Solar?</Wrapper>;
  }
  if (header === "Abundance") {
    return <PopUp> Solar is the Most Abundant Form of Energy</PopUp>;
  }
  if (header === "Efficiency") {
    return <PopUp2> As Demand Increases, so Does the Efficiency</PopUp2>;
  }
  if (header === "Cost") {
    return <PopUp3> As Demand Increases, the Cost Goes Down</PopUp3>;
  }
  if (header === "Other") {
    return <PopUp4> Many More Benefits</PopUp4>;
  } else {
    return null;
  }
};

export default Header;

const fade = keyframes`
        0% {
            opacity: 0;
            transform: translateX(0%)
        }

        100% {
          opacity: 1;
          transform: translateX(36%)
        }
    `;

const Wrapper = styled.div`
  height: 80px;
  width: 100%;
  display: flex;
  align-items: center;
  min-height: 48px;
  color: white;
  font-size: 30px;
  font-family: Lucida Console;
  animation: ${fade} 3000ms forwards;
`;

const pop = keyframes`
        0% {
          transform: scale(0);
        }

        100% {
          transform: scale(2);
        }
    `;

const PopUp = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  height: 80px;
  margin: auto;
  font-family: Lucida Console;
  animation: ${pop} 600ms forwards;
`;

const PopUp2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  height: 80px;
  margin: auto;
  font-family: Lucida Console;
  animation: ${pop} 600ms forwards;
`;
const PopUp3 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  height: 80px;
  margin: auto;
  font-family: Lucida Console;
  animation: ${pop} 600ms forwards;
`;
const PopUp4 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  height: 80px;
  margin: auto;
  font-family: Lucida Console;
  animation: ${pop} 600ms forwards;
`;
