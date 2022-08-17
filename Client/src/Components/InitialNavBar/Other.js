import { useContext, useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import IFR from "../../IFR-Other-FinalProj.webp";
import Perovskite from "../../Perovskite.png";
import Fossil from "../../fossilEfficiency.png";

const Other = () => {
  const navigate = useNavigate();
  return (
    <>
      <Container>
        <SubContainer>
          <Subtitle> Efficiencies Competing with Fossil Fuels </Subtitle>
          <Div>
            {" "}
            A team at the US National Renewable Energy Laboratory (NREL)
            recently highlighted a record solar cell efficiency of 39.5% under
            natural light conditions. &nbsp;
            <A
              href="https://www.azocleantech.com/article.aspx?ArticleID=1593"
              target="_blank"
            >
              Learn more
            </A>{" "}
          </Div>
          <Img src={Fossil}></Img>
        </SubContainer>
        <SubContainer>
          <Subtitle> Capturing Energy at Night </Subtitle>
          <Div>
            {" "}
            The world is one step closer to nighttime solar power after a
            breakthrough discovery by Australian scientists. University of New
            South Wales (UNSW) scientists have found a way to ‘catch’ energy
            that flows out of the earth at night. &nbsp;
            <A
              href="https://www.euronews.com/green/2022/05/19/new-technology-can-generate-solar-power-at-night-time-by-catching-earth-s-heat"
              target="_blank"
            >
              Learn more
            </A>{" "}
          </Div>
          <Img src={IFR}></Img>
        </SubContainer>
        <SubContainer>
          <Subtitle> Same Efficiency, A Lot More Versatile </Subtitle>
          <Div>
            {" "}
            Perovskite crystals can be manufactured at room temperatures and
            with significantly less energy than silicon. This makes them cheaper
            to produce and more sustainable. Due to their flexibility – as
            opposed to silicon’s stiffness and opacity – perovskite crystals can
            also be used for curved, arced, or domed solar panels. &nbsp;
            <A
              href="https://www.azocleantech.com/article.aspx?ArticleID=1593"
              target="_blank"
            >
              Learn more
            </A>{" "}
          </Div>
          <ImgPerov src={Perovskite}></ImgPerov>
        </SubContainer>
      </Container>
    </>
  );
};
export default Other;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100%;
`;
const Subtitle = styled.div`
  display: flex;
  justify-content: center;
  width: fit-content;
  font-size: 18px;
  font-family: Lucida Console;
  font-style: italic;
  margin-left: 100px;
  margin-top: 25px;
  color: rgb(255, 133, 51);
`;
const Div = styled.div`
  font-family: Lucida Console;
  font-size: 16px;
  height: 50px;
  margin: 0 50px;
  margin-top: 15px;
`;

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const A = styled.a`
  font-size: 18px;
  color: rgb(255, 133, 51);

  &:hover {
    color: red;
  }
`;

const Img = styled.img`
  margin: 0 auto;
  width: 500px;
`;

const ImgPerov = styled.img`
  margin: 0 auto;
  width: 700px;
`;
