import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import Header from "./Header";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Homepage from "./Homepage";
import Abundance from "./InitialNavBar/Abundance";
import Efficiency from "./InitialNavBar/Efficiency";
import Cost from "./InitialNavBar/Cost";
import Other from "./InitialNavBar/Other";
import { useState, useContext } from "react";
import { ProductDataContext } from "./ProductDataContext";

const App = () => {
  const { header } = useContext(ProductDataContext);

  return (
    <Router>
      <GlobalStyles />
      <Wrapper>
        <Header />
        {header !== "Homepage" ? <NavBar /> : null}
        <Container>
          <Routes>
            <Route path="/" />
            <Route path="/abundance" element={<Abundance />} />
            <Route path="/efficiency" element={<Efficiency />} />
            <Route path="/cost" element={<Cost />} />
            <Route path="/other" element={<Other />} />
            <Route path="/Homepage" element={<Homepage />} />
          </Routes>
        </Container>
        {header !== "Homepage" ? <Footer /> : null}
      </Wrapper>
    </Router>
  );
};

export default App;

const Wrapper = styled.div`
  color: white;
  background-color: black;
`;

const Container = styled.div``;
