import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import Header from "./Header";
import NavBar from "./NavBar";
import About from "./About";

const App = () => {
  return (
    <Router>
      <GlobalStyles />
      <Wrapper>
        <Header />
        <NavBar />
        <Container>
          <Routes>
            <Route path="/about" element={<About />} />
            {/* <Route path="/fitness" element={<Fitness />} />
              <Route path="/lifestyle" element={<Lifestyle />} />
              <Route path="/entertainment" element={<Entertainment />} />
              <Route path="/medical" element={<Medical />} /> */}
            {/* <Route path="/" element={<HomeFeed />} /> */}
          </Routes>
        </Container>
        {/* <Footer /> */}
      </Wrapper>
    </Router>
  );
};

export default App;

const Wrapper = styled.div``;

const Container = styled.div``;
