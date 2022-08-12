import styled, { keyframes } from "styled-components";

const Conversion = () => {
  return (
    <>
      <Div>
        {" "}
        In early 2019, the U.S. surpassed 2 million solar system installations.
        This milestone comes just three years after the industry completed its 1
        millionth installation, a feat that took 40 years to accomplish..{" "}
      </Div>
      <Container></Container>
    </>
  );
};
export default Conversion;

const Container = styled.div`
  display: flex;
`;
const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-family: Lucida Console;
  height: 80px;
  width: 100%;
  margin-left: 15px;
`;
const Img = styled.img`
  display: flex;
  margin: 0 auto;
  width: 50%;
  padding-bottom: 50px;
`;
