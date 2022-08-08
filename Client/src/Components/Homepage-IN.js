import { useContext, useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { ProductDataContext } from "./ProductDataContext";
import { UserDataContext } from "./UserDataContext";

const HomepageOut = () => {
  const { costPerkWh, monthlyConsumption } = useContext(ProductDataContext);
  const { logged } = useContext(UserDataContext);

  return <Wrapper> Homepage </Wrapper>;
};

export default HomepageOut;

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
