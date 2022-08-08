import { useContext, useState, useEffect } from "react";
import { ProductDataContext } from "./ProductDataContext";
import styled, { keyframes } from "styled-components";
import { FiLoader } from "react-icons/fi";

const Homepage = () => {
  const { costPerkWh, monthlyConsumption } = useContext(ProductDataContext);

  return <Wrapper> Homepage </Wrapper>;
};

export default Homepage;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 100%;
  padding-top: 10px;
  padding-left: 80px;
  padding-right: 80px;
  justify-content: center;
  align-items: center;
`;
