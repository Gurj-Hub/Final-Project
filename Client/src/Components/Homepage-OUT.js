import { useContext, useState, useEffect } from "react";
import { ProductDataContext } from "./ProductDataContext";
import styled, { keyframes } from "styled-components";
import { UserDataContext } from "./UserDataContext";
import { BsArrowRight } from "react-icons/bs";
import { FiLoader } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const HomepageOut = () => {
  const { costPerKWH, monthlyConsumption } = useContext(ProductDataContext);
  const { loggedIn } = useContext(UserDataContext);
  const [cost, setCost] = useState(null);
  const [consumption, setConsumption] = useState(null);
  const navigate = useNavigate();

  if (costPerKWH !== null && monthlyConsumption) {
    const ObjEntriesCost = Object.keys(costPerKWH);
    for (let x = 0; x <= 2; x++) {
      ObjEntriesCost.shift();
    }

    ObjEntriesCost.unshift("Select");
    return (
      <>
        <ProductContainer>
          <ProductTitle>Your Household Products</ProductTitle>
          <ProductList>
            {loggedIn
              ? "Map over the users saved items"
              : "You must be signed in to view your items."}
          </ProductList>
        </ProductContainer>
        <DidYK>Did You Know?</DidYK>
        <Wrapper>
          <CostAVG>
            The average residential consumption accross Canada is{" "}
            <Span>{`${monthlyConsumption.AVG}`}</Span> kW/h.
          </CostAVG>
          <ConsAVG>
            The average cost throughout Canada per kW/h is{" "}
            <Span>{`${costPerKWH.AVG}`}</Span> $.
          </ConsAVG>
        </Wrapper>
        <LearnMore>
          {" "}
          Learn more about the cost and consumption accross various regions in
          Canada!
        </LearnMore>
        <LearnMoreContainer>
          <Instruc>Select your province/territory :</Instruc>
          <Select
            onChange={(ev) => {
              setCost(ev.target.value);
              setConsumption(ev.target.value);
            }}
          >
            {ObjEntriesCost.map((element, index) => {
              return <Option value={element}>{element}</Option>;
            })}
          </Select>
          <LegendContainer>
            <Legend>QC : Quebec</Legend>
            <Legend>BC : British Columbia</Legend>
            <Legend>AB : Alberta</Legend>
            <Legend>MB : Manitoba</Legend>
            <Legend>SK : Saskatchewan</Legend>
            <Legend>NS : Nova Scotia</Legend>
          </LegendContainer>
          <LegendContainer>
            <Legend>NB : Saskatchewan</Legend>
            <Legend>NL : New Foundland & Labrador</Legend>
            <Legend>PE : Prince Edward Island</Legend>
            <Legend>NT : Northwest Territory</Legend>
            <Legend>YT : Yukon Territory</Legend>
            <Legend>NU : Nunavut</Legend>
          </LegendContainer>
        </LearnMoreContainer>
        <LearnMoreContainer>
          {cost ? (
            <CostOuput>
              The cost per kW/h for region <Span>{`${cost}`}</Span> is{" "}
              <Span>{`${costPerKWH[cost]}`}</Span> $.
            </CostOuput>
          ) : (
            <Span>SELECT A REGION!</Span>
          )}
          {consumption ? (
            <ConsumptionOutput>
              The average residential consumption for region{" "}
              <Span>{`${consumption}`}</Span> is{" "}
              <Span>{`${monthlyConsumption[cost]}`}</Span> kW/h.
            </ConsumptionOutput>
          ) : null}
        </LearnMoreContainer>
        <Prompt onClick={() => navigate("/calculator")}>
          Curious about what your consumption is? Find out!{" "}
          <BsArrowRight
            style={{ height: "20px", width: "20px" }}
          ></BsArrowRight>
        </Prompt>
      </>
    );
  } else {
    return (
      <Icon>
        <FiLoader style={{ height: "30px", width: "30px" }} />
      </Icon>
    );
  }
};

export default HomepageOut;

const fade = keyframes`
        0% {
            opacity: 0;
            transform: translateX(-45%)
        }

        100% {
          opacity: 1;
          transform: translateX(0%)
        }
    `;

const show = keyframes`
        0% {
          opacity: 0;
        }

        100% {
          opacity: 1;
        }
    `;

const turning = keyframes`
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    `;

const Icon = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  top: 49%;
  left: 49%;
  animation: ${turning} 1000ms infinite linear;
`;

const Prompt = styled.div`
  width: 200px;
  text-align: center;
  font-family: Lucida Console;
  font-size: 17px;
  font-weight: 800;
  padding: 10px;
  border: 3px solid rgb(204, 51, 0);
  border-radius: 24px;
  margin: auto;
  margin-top: 30px;
  margin-bottom: 30px;
  background-color: rgb(0, 153, 255);
  cursor: pointer;

  &:hover {
    background-color: hsl(180, 100%, 40%);
  }
  animation: ${show} 1400ms 4000ms backwards;
`;

const CostOuput = styled.div``;

const ConsumptionOutput = styled.div``;

const Legend = styled.div`
  text-align: left;
`;

const LegendContainer = styled.div`
  font-family: Lucida Console;
  font-size: 13px;
  padding: 10px;
  color: white;
  border: 1px solid white;
  margin-left: 10px;
`;
const Instruc = styled.div`
  font-family: Lucida Console;
  font-size: 17px;
`;
const LearnMore = styled.div`
  width: 550px;
  text-align: center;
  font-family: Lucida Console;
  font-size: 20px;
  color: rgb(0, 153, 255);
  margin: auto;
  animation: ${show} 1400ms 3000ms backwards;
`;
const LearnMoreContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 800px;
  text-align: center;
  font-family: Lucida Console;
  font-size: 17px;
  padding: 10px;
  border: 2px solid rgb(255, 133, 51);
  margin: auto;
  margin-top: 30px;
  animation: ${show} 1400ms 3000ms backwards;
`;
const DidYK = styled.div`
  font-weight: 800;
  font-size: 28px;
  font-family: Lucida Console;
  color: rgb(0, 153, 255);
  text-align: center;
  animation: ${show} 1400ms;
`;

const Span = styled.span`
  font-weight: 700;
  font-size: 22px;
  color: rgb(255, 133, 51);
`;

const CostAVG = styled.div`
  font-family: Lucida Console;
  font-size: 16px;
  width: 360px;
  padding: 10px;
  border: 2px solid rgb(255, 133, 51);
  margin-right: 25px;
  animation: ${fade} 2000ms 1200ms backwards;
`;
const ConsAVG = styled.div`
  font-family: Lucida Console;
  font-size: 16px;
  width: 360px;
  padding: 10px;
  border: 2px solid rgb(255, 133, 51);
  margin-left: 25px;
  animation: ${fade} 2000ms 1200ms backwards;
`;

const Select = styled.select`
  width: 60px;
  font-size: 16px;
  color: rgb(255, 133, 51);
  margin-left: 10px;
`;
const Option = styled.option``;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 100%;
  padding-top: 30px;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
`;
const ProductTitle = styled.div`
  font-family: Lucida Console;
  font-size: 20px;
  color: rgb(0, 153, 255);
  width: 280px;
  margin-bottom: 15px;
  border-bottom: 2px solid rgb(0, 153, 255);
`;
const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: Lucida Console;
  font-size: 20px;
  padding: 15px;
  width: 96%;
`;
const ProductList = styled.div`
  display: flex;
  font-family: Lucida Console;
  font-size: 16px;
  padding: 15px;
  width: 100%;
  border: 2px solid white;
`;
