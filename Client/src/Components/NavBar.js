import styled from "styled-components";
import { useState, useContext } from "react";
import { UserDataContext } from "./UserDataContext";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const { loggedIn } = useContext(UserDataContext);

  return (
    <Wrapper>
      <Nav>
        <Options to="/homepage">Homepage</Options>
      </Nav>
      <Nav>
        <Options to="/calculator">Solar Load Calculator</Options>
      </Nav>
      {loggedIn ? (
        <Nav>
          <Options to="/conversion">Load Conversion</Options>
        </Nav>
      ) : null}
    </Wrapper>
  );
};

export default Navbar;

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
  background-color: rgb(0, 102, 255);
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
    color: rgb(255, 133, 51);
  }
`;
