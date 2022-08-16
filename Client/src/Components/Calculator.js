import { useContext, useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { ProductDataContext } from "./ProductDataContext";
import { UserDataContext } from "./UserDataContext";
import { FiLoader, FiRefreshCcw } from "react-icons/fi";
import { AiOutlineSave } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Calculator = () => {
  const { user } = useAuth0();
  const { savedData, setSavedData } = useContext(UserDataContext);
  const { allProducts, monthlyKWH, setMonthlyKWH } =
    useContext(ProductDataContext);
  //make an array to map over to create rows for appliances
  const [arr, setArr] = useState(
    localStorage.getItem("items") === null ||
      localStorage.getItem("items") === "undefined"
      ? new Array(10).fill(1)
      : JSON.parse(localStorage.getItem("items"))
  );
  //flag for re-rendering after resetting appliances
  const [isReset, setIsReset] = useState(false);
  //to navigate to solar breakdown + incentive page
  const navigate = useNavigate();
  // for storing kWh total
  let total = 0;

  // to set monthly consumption everytime a change is made
  useEffect(() => {
    if (arr !== null) {
      for (let x = 0; x < arr?.length; x++) {
        if (typeof arr[x] === "object") {
          total += arr[x]?.avgPerMonth * arr[x]?.kWh;
        }
      }
    }
    setMonthlyKWH(total);
  }, [arr]);

  //returns object of element that was selected on select tag -> allows to give data to other fields in same row
  const HandleChange = (name, index) => {
    const filtered = allProducts.find((element) => {
      return element.name === name;
    });

    let copyArr = [...arr];
    copyArr[index] = filtered;
    setArr(copyArr);
    setSavedData(arr);
  };

  //saves appliance data in state + storage and sends state to BE to store in DB
  const HandleSave = () => {
    setSavedData(arr);
    localStorage.setItem("items", JSON.stringify(arr));
    fetch("/addSavedItems", {
      method: "PATCH",
      body: JSON.stringify({ email: user?.email, items: arr }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
      });
  };

  if (arr !== null && allProducts !== null) {
    return (
      <>
        <PageTitle> Solar Load Calculator </PageTitle>
        <Wrapper>
          <TitleContainer>
            <ApplianceTitle>Appliance</ApplianceTitle>
            <ConsumptionTitle>Watts</ConsumptionTitle>
            <TimeConsumedTitle>Hours Used/Day</TimeConsumedTitle>
            <TotalTitle>kW/h Per Day</TotalTitle>
          </TitleContainer>
          {arr?.map((element, index) => {
            return (
              <>
                <TitleContainer>
                  <ApplianceContainer>
                    <Select
                      onChange={(ev) => {
                        HandleChange(ev.target.value, index);
                        setIsReset(false);
                      }}
                    >
                      {" "}
                      {isReset ? (
                        <Option selected>Select</Option>
                      ) : (
                        <Option>Select</Option>
                      )}
                      {localStorage.getItem("items") !== null
                        ? allProducts.map((element, productIndex) => {
                            if (arr[index]._id === element._id) {
                              return (
                                <Option value={arr[index].name} selected>
                                  {arr[index].name}
                                </Option>
                              );
                            } else {
                              return (
                                <Option value={element.name}>
                                  {element.name}
                                </Option>
                              );
                            }
                          })
                        : allProducts.map((element, productIndex) => {
                            return (
                              <Option value={element.name}>
                                {element.name}
                              </Option>
                            );
                          })}
                    </Select>
                  </ApplianceContainer>
                  <ConsumptionContainer>
                    {" "}
                    {typeof arr[index] === "object" ? arr[index]?.kWh : 0}
                  </ConsumptionContainer>
                  <TimeConsumedContainer>
                    {typeof arr[index] === "object"
                      ? (arr[index]?.avgPerMonth / 30).toPrecision(5)
                      : 0}
                  </TimeConsumedContainer>
                  <TotalContainer>
                    {typeof arr[index] === "object"
                      ? (
                          (arr[index]?.kWh * arr[index]?.avgPerMonth) /
                          30
                        ).toPrecision(5)
                      : 0}
                  </TotalContainer>
                </TitleContainer>
              </>
            );
          })}
          <AddRow onClick={() => setArr([...arr, (arr[arr.length] = 1)])}>
            {" "}
            + Add More Appliances!
          </AddRow>
        </Wrapper>
        <Container>
          {monthlyKWH !== 0 && (
            <SaveContainer>
              <AiOutlineSave
                style={{ height: "30px", width: "30px" }}
              ></AiOutlineSave>
              <SaveAppliances onClick={() => HandleSave()}>
                {" "}
                Save Your Appliances
              </SaveAppliances>
            </SaveContainer>
          )}

          <ResultContainer>
            <ResultDescription>Total Kilowatt Hours Per Day</ResultDescription>
            <Result>{(monthlyKWH / 30).toPrecision(5)}</Result>
          </ResultContainer>
          <ResultContainer>
            <ResultDescription>
              Total Kilowatt Hours Per Month
            </ResultDescription>
            <Result>{monthlyKWH.toPrecision(6)}</Result>
          </ResultContainer>
          {monthlyKWH !== 0 && (
            <ResetContainer>
              <FiRefreshCcw
                style={{ height: "30px", width: "30px" }}
              ></FiRefreshCcw>
              <ResetAppliances
                onClick={() => {
                  setArr(new Array(10).fill(1));
                  localStorage.removeItem("items");
                  setIsReset(!isReset);
                }}
              >
                {" "}
                Reset Your Appliances
              </ResetAppliances>
            </ResetContainer>
          )}
        </Container>
        {monthlyKWH !== 0 && (
          <Prompt onClick={() => navigate("/conversion")}>
            {" "}
            Check out how many panels you will need to cover the solar load!{" "}
          </Prompt>
        )}
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
export default Calculator;

const inAndOut = keyframes`
        0% {
            transform: scale(0.8);
        }
        50% {
            transform: scale(1);
        }
        100% {
            transform: scale(0.8);
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

const SaveAppliances = styled.div`
  height: 60px;
  width: 100px;
  margin-top: 20px;
`;

const SaveContainer = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid red;
  width: 160px;
  height: 60px;
  font-size: 16px;
  color: yellow;
  background-color: transparent;
  border: 1px solid green;
  cursor: pointer;

  &:hover {
    background-color: hsl(180, 100%, 40%);
  }
`;

const ResetAppliances = styled(SaveAppliances)``;

const ResetContainer = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid red;
  width: 160px;
  height: 60px;
  font-size: 16px;
  color: yellow;
  background-color: transparent;
  border: 1px solid green;
  cursor: pointer;

  &:hover {
    background-color: hsl(180, 100%, 40%);
  }
`;

const Prompt = styled.div`
  width: 200px;
  height: 60px;
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
  animation: ${inAndOut} 1400ms infinite;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;
const ResultDescription = styled.div`
  font-size: 20px;
  font-family: Lucida Console;
  padding: 10px;
  color: rgb(255, 102, 0);
`;
const Result = styled.div`
  font-size: 18px;
  font-family: Lucida Console;
  width: 100px;
  text-align: center;
  border: 2px solid rgb(0, 153, 255);
  padding: 10px;
`;

const PageTitle = styled.div`
  font-size: 25px;
  font-family: Lucida Console;
  font-weight: 900;
  color: rgb(0, 153, 255);
  margin: 25px 0;
  margin-left: 42%;
  text-decoration: underline;
`;

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

const AddRow = styled.button`
  display: flex;
  align-items: center;
  width: fit-content;
  margin-left: 12%;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: rgb(255, 133, 51);
  margin-bottom: 10px;

  &:hover {
    color: rgb(0, 255, 255);
  }
`;

const Wrapper = styled.div`
  margin: 0px 200px;
  display: flex;
  flex-direction: column;
  border: 1px solid rgb(0, 153, 255);
`;
const TitleContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
`;

const ApplianceTitle = styled.div`
  text-align: center;
  width: 400px;
  height: 40px;
  font-size: 20px;
  font-weight: 800;
  color: rgb(255, 133, 51);
  padding-top: 10px;
`;

const ApplianceContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
`;
const ConsumptionTitle = styled.div`
  text-align: center;
  width: 140px;
  height: 40px;
  font-size: 20px;
  font-weight: 800;
  color: rgb(255, 133, 51);
  padding-top: 10px;
`;

const ConsumptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 140px;
  height: 40px;
  margin-top: 10px;
  background-color: rgb(31, 31, 46);
  border: 2px solid rgb(255, 102, 0);
`;

const TimeConsumedTitle = styled.div`
  text-align: center;
  width: 200px;
  height: 40px;
  font-size: 20px;
  font-weight: 800;
  color: rgb(255, 133, 51);
  padding-top: 10px;
`;
const TimeConsumedContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 200px;
  height: 40px;
  margin-top: 10px;
  background-color: rgb(31, 31, 46);
  border: 2px solid rgb(255, 102, 0);
`;

const TotalTitle = styled.div`
  text-align: center;
  width: 160px;
  height: 40px;
  font-size: 20px;
  font-weight: 800;
  color: rgb(255, 133, 51);
  padding-top: 10px;
`;
const TotalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 160px;
  height: 40px;
  margin-top: 10px;
  background-color: rgb(31, 31, 46);
  border: 2px solid rgb(255, 102, 0);
`;
