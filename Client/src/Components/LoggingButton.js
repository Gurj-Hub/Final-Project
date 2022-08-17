import React from "react";
import styled, { keyframes } from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const LogButton = () => {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    return (
      <>
        <span>Welcome </span>
        <Button
          onClick={() => {
            logout({ returnTo: window.location.origin });
            localStorage.removeItem("items");
            sessionStorage.removeItem("header");
          }}
        >
          <Span>{user.nickname.toUpperCase()}</Span>
        </Button>
      </>
    );
  } else {
    return <Button onClick={() => loginWithRedirect()}>Log In</Button>;
  }
};

export default LogButton;

const Button = styled.button`
  font-size: 20px;
  color: white;
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin-right: 30px;

  &:hover {
    color: yellowgreen;
  }
`;
const Span = styled.span`
  font-size: 22px;
  color: yellow;
  cursor: pointer;

  &:hover {
    color: red;
  }
`;
