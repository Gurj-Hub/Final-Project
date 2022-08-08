import styled from "styled-components";
import { useState, useContext } from "react";
import { ProductDataContext } from "./ProductDataContext";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

//Path links to specific categories in Navbar
const NavBar = () => {
  const { header, setHeader } = useContext(ProductDataContext);

  return (
    <Wrapper>
      <Nav>
        <Options onClick={() => setHeader("Abundance")} to="/abundance">
          Abundance
        </Options>
      </Nav>
      <Nav>
        <Options onClick={() => setHeader("Efficiency")} to="/efficiency">
          Efficiency
        </Options>
      </Nav>
      <Nav>
        <Options onClick={() => setHeader("Cost")} to="/cost">
          Cost
        </Options>
      </Nav>
      <Nav>
        <Options onClick={() => setHeader("Other")} to="/other">
          Other
        </Options>
      </Nav>
    </Wrapper>
  );
};

export default NavBar;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  color: white;
  font-weight: bold;
  width: 100%;
`;

const Nav = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 40px;
  background-color: black;
  border-bottom: 1px solid white;
  border-top: 1px solid white;
`;

const Options = styled(NavLink)`
  background-color: transparent;
  height: 20px;
  font-size: 15px;
  text-align: center;
  padding: 10px 20px;
  cursor: pointer;
  color: white;
  text-decoration: none;

  &:hover {
    color: yellowgreen;
  }
  &.active {
    color: rgb(102, 255, 153);
  }
`;
