import styled, { keyframes } from "styled-components";
import { useContext } from "react";
import { ProductDataContext } from "./ProductDataContext";
import { UserDataContext } from "./UserDataContext";
import { FiLoader } from "react-icons/fi";
import { useAuth0 } from "@auth0/auth0-react";

const Conversion = () => {
  const { location, setLocation } = useContext(UserDataContext);
  const { user, isAuthenticated } = useAuth0();
  const { incentives, panelData, monthlyKWH, costPerKWH } =
    useContext(ProductDataContext);

  const HandleLocation = (ev) => {
    setLocation(ev.target.value);
    if (isAuthenticated) {
      fetch("/addLocation", {
        method: "PATCH",
        body: JSON.stringify({ email: user?.email, location: ev.target.value }),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => {
          setLocation(data.data);
        });
    }
  };

  if (incentives !== null && panelData !== null) {
    const ObjEntriesIncentives = Object.keys(incentives);
    for (let x = 0; x <= 2; x++) {
      ObjEntriesIncentives.shift();
    }
    ObjEntriesIncentives.unshift("Select");

    return (
      <>
        <Div>
          ***Calculations are based on averages for{" "}
          <Span>&nbsp;200W Monochrystalline&nbsp;</Span>solar panels. The
          calculated costs do not take into account the cost of
          installation/labour.***
        </Div>
        <SectionBlock>
          <Instruc>Select your province/territory :</Instruc>
          <Select
            defaultValue={location ? location : null}
            onChange={(ev) => {
              HandleLocation(ev);
            }}
          >
            {ObjEntriesIncentives.map((element, index) => {
              return <Option value={element}>{element}</Option>;
            })}
          </Select>
        </SectionBlock>
        <SectionBlock>
          <HoldingPanelData>
            <Instruc>
              <Span>Solar Panel Data</Span>
            </Instruc>
            <Instruc>
              Cost per panel: ~<Span>{panelData.AVGcostPerPanel} $</Span>
            </Instruc>
            <Instruc>
              Wattage produced/day:{" "}
              <Span>{panelData.AVGproductionPerDay} kW/h</Span>
            </Instruc>
          </HoldingPanelData>
          <SubContainer>
            <TotalKWH>Consumed kW/h Per Month</TotalKWH>
            <Container>{monthlyKWH.toPrecision(4)}</Container>
          </SubContainer>
        </SectionBlock>
        <Calculation>
          <BreakdownContainer>
            To meet your monthly consumption of{" "}
            <Span>&nbsp;{monthlyKWH.toPrecision(4)}&nbsp;</Span> kW/h, you will
            need{" "}
            <Span>
              &nbsp;
              {Math.ceil(
                (monthlyKWH / (panelData.AVGproductionPerDay * 30)).toPrecision(
                  4
                )
              )}
              &nbsp;
            </Span>
            panels.
          </BreakdownContainer>
          <BreakdownContainer>
            For&nbsp;
            <Span>
              {Math.ceil(
                (monthlyKWH / (panelData.AVGproductionPerDay * 30)).toPrecision(
                  4
                )
              )}
            </Span>
            &nbsp;panels, you will need a minimum upfront cost of{" "}
            <Span>
              &nbsp;
              {Math.ceil(
                (monthlyKWH / (panelData.AVGproductionPerDay * 30)).toPrecision(
                  4
                )
              ) * panelData.AVGcostPerPanel}
              &nbsp;
            </Span>
            $.
          </BreakdownContainer>
          <IncentiveContainer>
            <Incentive>
              <IncentiveTilte>Federal Incentive (Canada wide)</IncentiveTilte>
              {incentives.Federal}
            </Incentive>
            <Incentive>
              <IncentiveTilte>Regional Incentive</IncentiveTilte>
              {incentives[location]}
            </Incentive>
          </IncentiveContainer>
        </Calculation>
        {location === "Select" ||
        location === null ||
        monthlyKWH === 0 ? null : (
          <BreakdownBlock>
            For the same energy consumption of
            <Span>&nbsp;{monthlyKWH.toPrecision(4)}&nbsp;</Span> kW/h over a
            month in <Span>&nbsp;{location}&nbsp;</Span>, you could expect to
            pay{" "}
            <Span>
              &nbsp;{(costPerKWH[location] * monthlyKWH).toPrecision(4)}&nbsp;
            </Span>{" "}
            $ for your standard energy bill.{" "}
          </BreakdownBlock>
        )}
        {location === "Select" ||
        location === null ||
        monthlyKWH === 0 ? null : (
          <BreakdownBlock>
            {" "}
            Therefore, one would need to wait{" "}
            <Span>
              {(
                (Math.ceil(
                  (
                    monthlyKWH /
                    (panelData.AVGproductionPerDay * 30)
                  ).toPrecision(4)
                ) *
                  panelData.AVGcostPerPanel) /
                (costPerKWH[location] * monthlyKWH) /
                12
              ).toPrecision(3)}
            </Span>{" "}
            years to reach a breakeven point between your standard energy bill
            payments and your upfront cost of solar.{" "}
          </BreakdownBlock>
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
  flex-direction: column;
  text-align: center;
  width: 600px;
  height: 300px;
`;

const IncentiveTilte = styled.span`
  font-family: MingLiU_HKSCS;
  font-size: 22px;
  font-weight: 800;
  padding: 5px;
  color: rgb(179, 0, 179);
  text-decoration: underline;
  margin-bottom: 10px;
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
  padding: 10px;
`;

const TotalKWH = styled.div``;

const Calculation = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  height: 400px;
  margin: auto;
  margin-top: 15px;
  font-size: 20px;
  font-family: Lucida Console;
`;

const SectionBlock = styled.div`
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

const BreakdownBlock = styled(SectionBlock)`
  display: inline-block;
  margin-left: 28%;
  margin-top: 0px;
  margin-bottom: 50px;
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
