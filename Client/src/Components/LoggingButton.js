import React from "react";
import styled, { keyframes } from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const LogButton = () => {
  const { loginWithRedirect, logout, user, isAuthenticated, isLoading } =
    useAuth0();

  if (isAuthenticated) {
    return (
      <Button onClick={() => logout({ returnTo: window.location.origin })}>
        Log Out
      </Button>
    );
  } else {
    return <Button onClick={() => loginWithRedirect()}>Log In</Button>;
  }
};

export default LogButton;

const Button = styled.button`
  font-size: 20px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin-right: 30px;

  &:hover {
    color: yellowgreen;
  }
`;
