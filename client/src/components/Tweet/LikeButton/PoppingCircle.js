import styled, { keyframes } from "styled-components";

const PoppingCircle = ({ size, color }) => {
  return (
    <Wrapper
      style={{ width: size, height: size, backgroundColor: color }}
    ></Wrapper>
  );
};

const turnBlue = keyframes`
  from {
    color: inherit;
    opacity: 1;
    transform: scale(0);
  }
  to {
    color: blue;
    opacity: 0;
    transform: scale(1);
  }
`;

const Wrapper = styled.div`
  border-radius: 50%;
  animation: ${turnBlue} 500ms forwards;
`;

export default PoppingCircle;
