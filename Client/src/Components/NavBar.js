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
        <Options onClick={() => setHeader("Efficiency")} to="/efficiency">
          Efficiency
        </Options>
        <Options onClick={() => setHeader("Cost")} to="/cost">
          Cost
        </Options>
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
  /* background: var(--color-navbar-beige); */
  box-shadow: 1px 6px 6px -6px gray;
  width: 100%;
`;

const Nav = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: black;
  border-bottom: 1px solid white;
  border-top: 1px solid white;
`;

const Options = styled(NavLink)`
  background-color: transparent;
  font-size: 15px;
  border: none;
  display: flex;
  text-align: center;
  padding: 10px 20px;
  cursor: pointer;
  color: white;
  opacity: 1;
  text-decoration: none;

  &:hover {
    color: yellowgreen;
    opacity: 1;
    border-bottom: 1px solid black;
  }

  &.active {
    color: rgb(102, 255, 153);
    opacity: 1;
  }
`;
