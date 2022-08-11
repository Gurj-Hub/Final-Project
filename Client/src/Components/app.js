import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import Header from "./Header";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Intro from "./Intro";
import Abundance from "./InitialNavBar/Abundance";
import Efficiency from "./InitialNavBar/Efficiency";
import Cost from "./InitialNavBar/Cost";
import Other from "./InitialNavBar/Other";
import HomepageOut from "./Homepage-OUT";
import HomepageIn from "./Homepage-OUT";
import Calculator from "./Calculator";
import Breakdown from "./Breakdown";
import { useContext } from "react";
import { ProductDataContext } from "./ProductDataContext";
import { UserDataContext } from "./UserDataContext";

const App = () => {
  const { header } = useContext(ProductDataContext);
  const { loggedIn } = useContext(UserDataContext);

  return (
    <Router>
      <GlobalStyles />
      <Wrapper>
        <Header />
        {header !== "Homepage" ? <NavBar /> : null}
        <Container>
          <Routes>
            <Route path="/" element={<Intro />} />
            <Route path="/abundance" element={<Abundance />} />
            <Route path="/efficiency" element={<Efficiency />} />
            <Route path="/cost" element={<Cost />} />
            <Route path="/other" element={<Other />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/breakdown" element={<Breakdown />} />
            <Route
              path="/Homepage"
              element={loggedIn ? <HomepageIn /> : <HomepageOut />}
            />
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
