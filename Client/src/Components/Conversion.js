import styled, { keyframes } from "styled-components";
import { useContext, useState, useEffect } from "react";
import { ProductDataContext } from "./ProductDataContext";
import { UserDataContext } from "./UserDataContext";
import { FiLoader } from "react-icons/fi";

const Conversion = () => {
  const { loggedIn, savedData, location, setLocation } =
    useContext(UserDataContext);
  const { incentives, panelData, monthlyKWH } = useContext(ProductDataContext);

  if (incentives !== null && panelData !== null) {
    const ObjEntriesIncentives = Object.keys(incentives);
    for (let x = 0; x <= 2; x++) {
      ObjEntriesIncentives.shift();
    }

    return (
      <>
        <Div>
          ***Calculations are based on averages for{" "}
          <Span>&nbsp;200W Monochrystalline&nbsp;</Span>solar panels. The
          calculated costs do not take into account the cost of
          installation/labour.***
        </Div>
        <LearnMoreContainer>
          <Instruc>Select your province/territory :</Instruc>
          <Select
            onChange={(ev) => {
              setLocation(ev.target.value);
            }}
          >
            {ObjEntriesIncentives.map((element, index) => {
              return <Option value={element}>{element}</Option>;
            })}
          </Select>
        </LearnMoreContainer>
        <LearnMoreContainer>
          <HoldingPanelData>
            <Instruc>
              Cost per panel: <Span>{panelData.AVGcostPerPanel} $</Span>
            </Instruc>
            <Instruc>
              Wattage produced/day:{" "}
              <Span>{panelData.AVGproductionPerDay} kW/h</Span>
            </Instruc>
          </HoldingPanelData>
          <SubContainer>
            <TotalKWH>Consumed kW/h Per Month</TotalKWH>
            <Container>{monthlyKWH}</Container>
          </SubContainer>
        </LearnMoreContainer>
        <Calculation>
          <BreakdownContainer>
            To meet your monthly consumption of{" "}
            <Span>&nbsp;{monthlyKWH}&nbsp;</Span> kW/h, you will need{" "}
            <Span>
              &nbsp;
              {(monthlyKWH / (panelData.AVGproductionPerDay * 30)).toPrecision(
                4
              )}
              &nbsp;
            </Span>{" "}
            panels.
          </BreakdownContainer>
          <BreakdownContainer></BreakdownContainer>
          <IncentiveContainer>
            <Incentive>
              <IncentiveTilte>Federal Incentive</IncentiveTilte>
              The deferal incentive is blablablablabl ablablablablablabla
              blablablablabla blablablab lablabla blablab lablablablablablabla
              blabla blabla blabla
            </Incentive>
            <Incentive>
              <IncentiveTilte>Regional Incentive</IncentiveTilte>
            </Incentive>
          </IncentiveContainer>
        </Calculation>
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
export default Conversion;

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

const Incentive = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  width: 400px;
`;

const IncentiveTilte = styled.span`
  font-family: MingLiU_HKSCS;
  font-size: 22px;
  font-weight: 800;
  padding: 5px;
  color: rgb(179, 0, 179);
`;

const IncentiveContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 180px;
  padding: 15px;
`;

const BreakdownContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const TotalKWH = styled.div``;

const Calculation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80%;
  height: 200px;
  margin: auto;
  padding: 25px;
  font-size: 20px;
  font-family: Lucida Console;
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
`;

const Instruc = styled.div`
  font-family: Lucida Console;
  font-size: 17px;
  padding: 10px;
`;

const Select = styled.select`
  width: 80px;
  font-size: 16px;
  color: rgb(255, 133, 51);
  margin-left: 10px;
`;

const Option = styled.option``;

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 30px;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 80px;
  font-size: 24px;
  color: rgb(0, 102, 255);
  border: 3px solid white;
`;

const HoldingPanelData = styled.div`
  display: flex;
  flex-direction: column;
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
const Span = styled.span`
  font-size: 20px;
  font-weight: 900;
  color: rgb(255, 133, 51);
`;
