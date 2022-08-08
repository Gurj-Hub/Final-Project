import styled, { keyframes } from "styled-components";
import { NavLink } from "react-router-dom";
import { FiLoader } from "react-icons/fi";
import { useContext, useState, useEffect } from "react";
import { ProductDataContext } from "./ProductDataContext";

const Footer = () => {
  const { header, setHeader } = useContext(ProductDataContext);

  if (header === "Abundance" || "Efficiency" || "Cost" || "Applications") {
    return (
      <Div
        onClick={() => {
          sessionStorage.setItem("header", "Homepage");
          setHeader("Homepage");
          console.log(header);
        }}
        to="/Homepage"
      >
        Continue to the Homepage
      </Div>
    );
  } else {
    return null;
  }
};

export default Footer;

const Div = styled(NavLink)`
  display: flex;
  justify-content: right;
  text-align: right;
  color: white;
  text-decoration: none;
  width: fit-content;

  &:hover {
    color: rgb(102, 255, 153);
    opacity: 1;
  }
`;
