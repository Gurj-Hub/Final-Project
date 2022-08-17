import styled, { keyframes } from "styled-components";
import { useContext } from "react";
import { ProductDataContext } from "./ProductDataContext";
import logo from "../N4S logo.png";
import LogButton from "./LoggingButton";

const Header = () => {
  const { header } = useContext(ProductDataContext);

  //conditionally renders header based on header state
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
    return <PopUp4> The Future is... Bright</PopUp4>;
  } else {
    return (
      <Container>
        <Wrap>
          <Img src={logo}></Img>
          <Title>
            <Span>N4S </Span>: Need For Solar
          </Title>
        </Wrap>
        <Login>{<LogButton />}</Login>
      </Container>
    );
  }
};

export default Header;

const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 300px;
  margin: 10px;
`;
const Img = styled.img`
  width: 70px;
  border-radius: 50%;
`;

const Login = styled.span`
  /* font-size: 20px; */
  padding-right: 15px;
`;

const Span = styled.span`
  font-weight: 700;
  font-size: 22px;
  color: rgb(255, 133, 51);
`;

const Title = styled.span`
  font-size: 20px;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
const fade = keyframes`
        0% {
            opacity: 0;
            transform: translateX(0%)
        }

        100% {
          opacity: 1;
          transform: translateX(34%)
        }
    `;

const Wrapper = styled.div`
  height: 40px;
  width: 100%;
  display: flex;
  align-items: center;
  color: white;
  font-size: 34px;
  font-family: Lucida Console;
  font-weight: 700;
  animation: ${fade} 3000ms forwards;
  margin-bottom: 15px;
  margin-top: 15px;
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
  height: 40px;
  margin: auto;
  font-family: Lucida Console;
  animation: ${pop} 600ms forwards;
  margin-bottom: 15px;
  margin-top: 15px;
`;

const PopUp2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  height: 40px;
  margin: auto;
  font-family: Lucida Console;
  animation: ${pop} 600ms forwards;
  margin-bottom: 15px;
  margin-top: 15px;
`;
const PopUp3 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  height: 40px;
  margin: auto;
  font-family: Lucida Console;
  animation: ${pop} 600ms forwards;
  margin-bottom: 15px;
  margin-top: 15px;
`;
const PopUp4 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  height: 40px;
  margin: auto;
  font-family: Lucida Console;
  margin-bottom: 15px;
  margin-top: 15px;
  animation: ${pop} 600ms forwards;
`;
