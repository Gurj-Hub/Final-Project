import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";

const Header = () => {
  // const [screenWidth, setScreenWidth] = useState(window.screen.width);
  // const {  } = useContext();
  return <Wrapper> This is the HEADER!</Wrapper>;
};

export default Header;
const Wrapper = styled.div`
  height: 80px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 48px;
`;
