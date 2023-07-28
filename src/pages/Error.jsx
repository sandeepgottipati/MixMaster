import styled from "styled-components";
import { Link, useRouteError } from "react-router-dom";
import img from "../assets/not-found.svg";
const Error = () => {
  const error = useRouteError();
  console.log(error);
  if (error.status === 404) {
    return (
      <Wrapper>
        <div>
          <img src={img} alt="not found" />
          <h3>Ohh!</h3>
          <p>We can't seem to find page you are looking for!!!</p>
          <Link to="/">back Home</Link>
        </div>
      </Wrapper>
    );
  }
  return <Wrapper>Something Went Wrong</Wrapper>;
};
export default Error;

const Wrapper = styled.div`
  min-height: 100vh;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90vw;
  img {
    max-width: 600px;
    margin-bottom: 2rem;
    display: block;
    margin-top: -3rem;
  }
  p {
    line-height: 2;
    color: var(--grey-500);
  }
  a {
    color: var(--primary-500);
    text-transform: capitalize;
  }
`;
