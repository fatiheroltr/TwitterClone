import { useContext } from "react";
import styled, { keyframes } from "styled-components";
import { CgSpinner } from "react-icons/cg";
import { ThemeContext } from "./ThemeContext";
import { light, dark } from "../constants";

const LoadingCircle = ({ circleSize, circleColor }) => {
  const { selectTheme, setSelectTheme } = useContext(ThemeContext);

  return (
    <Wrapper color={circleColor} selecttheme={selectTheme}>
      <StyledLoadingCircle size={circleSize} />
    </Wrapper>
  );
};

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Wrapper = styled.div`
  padding: 10%;
  text-align: center;
  color: ${(props) =>
    props.color === "light"
      ? `#fff`
      : `${(props) => props.selecttheme.primary}`};
`;

const StyledLoadingCircle = styled(CgSpinner)`
  margin: 0 auto;
  animation: ${spin} 2s infinite linear;
`;

export default LoadingCircle;
