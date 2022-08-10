import { useContext, useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { ProductDataContext } from "./ProductDataContext";
import { UserDataContext } from "./UserDataContext";
import { useNavigate } from "react-router-dom";

const Calculator = () => {
  const { allProducts } = useContext(ProductDataContext);
  const { logged } = useContext(UserDataContext);
  const [arr, setArr] = useState(new Array(10).fill(1));

  const navigate = useNavigate();

  useEffect(() => {
    allProducts.unshift({
      name: "Select",
      kWh: 0,
      avgPerMonth: 0,
    });
  }, []);

  const HandleChange = (param) => {
    const filtered = allProducts.filter((element) => {
      return element.name === param;
    });
    return filtered;
  };

  // have a state as an array -> [...state , state[index] = ev.target.value]
  return (
    <>
      <Wrapper>
        <TitleContainer>
          <ApplianceTitle>Appliance</ApplianceTitle>
          <ConsumptionTitle>Watts</ConsumptionTitle>
          <TimeConsumedTitle>Hours Used/Day</TimeConsumedTitle>
          <TotalTitle>kW/h Per Day</TotalTitle>
        </TitleContainer>
        {arr.map((element, index) => {
          return (
            <>
              <rREact> </rREact>
              <TitleContainer>
                <ApplianceContainer>
                  <Select
                    id={index}
                    onChange={(ev) => {
                      index = ev.target.value;
                    }}
                  >
                    {allProducts.map((element, index) => {
                      return <Option value={index}>{element.name}</Option>;
                    })}
                  </Select>
                </ApplianceContainer>
                <ConsumptionContainer>
                  HadnleChange(storedItem)
                </ConsumptionContainer>
                <TimeConsumedContainer>
                  usage/day of selected
                </TimeConsumedContainer>
                <TotalContainer> Total kW/h/day</TotalContainer>
              </TitleContainer>
            </>
          );
        })}
        {/* <Container>
          <ApplianceContainer>
            {arr.map((element) => {
              return (
                <Select
                  onChange={(ev) => {
                    console.log(ev.target.value);
                  }}
                >
                  {allProducts.map((element, index) => {
                    return <Option>{element.name}</Option>;
                  })}
                </Select>
              );
            })}
          </ApplianceContainer>
          <ConsumptionContainer>
            {arr.map((element) => {
              return (
                <Select
                  onChange={(ev) => {
                    console.log(ev.target.value);
                  }}
                >
                  {allProducts.map((element, index) => {
                    return <Option>{element.kWh}</Option>;
                  })}
                </Select>
              );
            })}
          </ConsumptionContainer>
          <TimeConsumedContainer>
            {arr.map((element) => {
              return (
                <Select
                  onChange={(ev) => {
                    console.log(ev.target.value);
                  }}
                >
                  {allProducts.map((element, index) => {
                    return <Option>{element.avgPerMonth / 30}</Option>;
                  })}
                </Select>
              );
            })}
          </TimeConsumedContainer>
          <TotalContainer>
            {arr.map((element) => {
              return (
                <Select
                  onChange={(ev) => {
                    console.log(ev.target.value);
                  }}
                >
                  {allProducts.map((element, index) => {
                    return (
                      <Option>
                        Should take individual values and calculate.
                      </Option>
                    );
                  })}
                </Select>
              );
            })}
          </TotalContainer>
        </Container> */}
      </Wrapper>
    </>
  );
};
export default Calculator;

const Select = styled.select`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-family: Lucida Console;
  height: 30px;
  margin: 15px 0px;
`;
const Option = styled.option``;

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Wrapper = styled.div`
  margin: 0px 200px;
  display: flex;
  flex-direction: column;
`;
const TitleContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
`;

const ApplianceTitle = styled.div`
  text-align: center;
  width: 400px;
  border: 2px solid red;
`;

const ApplianceContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
`;
const ConsumptionTitle = styled.div`
  text-align: center;
  width: 140px;
  border: 2px solid yellow;
`;

const ConsumptionContainer = styled.div`
  display: flex;
  text-align: center;
  width: 140px;
  flex-direction: column;
`;

const TimeConsumedTitle = styled.div`
  text-align: center;
  width: 120px;
  border: 2px solid blue;
`;
const TimeConsumedContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 120px;
`;

const TotalTitle = styled.div`
  text-align: center;
  width: 120px;
  border: 2px solid white;
`;
const TotalContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 120px;
`;
