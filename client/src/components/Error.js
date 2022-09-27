import styled from "styled-components";
import { MdOutlineReportProblem } from "react-icons/md";

const Error = ({ message }) => {
  return (
    <Wrapper>
      <MdOutlineReportProblem size="80px" />
      <Header>{message}</Header>
      <ErrorText>
        <ErrorBody>
          Please try refreshing the page, or <a href="/">contact support</a> if
          the problem persists.
        </ErrorBody>
      </ErrorText>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 140px;
`;

const ErrorText = styled.div`
  max-width: 65%;
  text-align: left;
  margin: 0 auto;
`;
const Header = styled.h2`
  font-size: 22px;
  font-weight: 700;
  margin-top: 22px;
  margin-bottom: 30px;
`;

const ErrorBody = styled.p`
  margin-bottom: 30px;
  line-height: 20px;
`;

export default Error;
