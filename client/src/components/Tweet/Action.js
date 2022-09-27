import { useState, useContext } from "react";
import { ThemeContext } from "../ThemeContext";

import styled from "styled-components";
import { light, dark } from "../../constants";

const Action = ({ color, size, children, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { selectTheme, setSelectTheme } = useContext(ThemeContext);

  return (
    <Wrapper
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      circleColor={color}
      style={{ width: size, height: size, color: isHovered ? color : null }}
      selecttheme={selectTheme}
    >
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.button`
  margin: 0;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  color: ${(props) => props.selecttheme.black};

  &:active {
    color: inherit;
  }
  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 50%;
    opacity: 0;
    background-color: ${(props) => props.circleColor};
  }
  /* &:focus:after, */
  &:hover:after {
    opacity: 0.12;
  }
`;

export default Action;
