import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import Header from "./Header";
import InitialNavBar from "./InitialNavBar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Intro from "./Intro";
import Abundance from "./InitialNavBar/Abundance";
import Efficiency from "./InitialNavBar/Efficiency";
import Cost from "./InitialNavBar/Cost";
import Other from "./InitialNavBar/Other";
import HomepageOut from "./Homepage-OUT";
import HomepageIn from "./Homepage-OUT";
import Calculator from "./Calculator";
import Conversion from "./Conversion";
import { useContext } from "react";
import { ProductDataContext } from "./ProductDataContext";

const App = () => {
  const { header } = useContext(ProductDataContext);

  return (
    <Router>
      <GlobalStyles />
      <Wrapper>
        <Header />
        {header !== "Homepage" ? <InitialNavBar /> : <Navbar />}
        <Container>
          <Routes>
            <Route path="/" element={<Intro />} />
            <Route path="/abundance" element={<Abundance />} />
            <Route path="/efficiency" element={<Efficiency />} />
            <Route path="/cost" element={<Cost />} />
            <Route path="/other" element={<Other />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/conversion" element={<Conversion />} />
            <Route path="/homepage" element={<HomepageOut />} />
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
