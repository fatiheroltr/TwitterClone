import { useContext } from "react";
import { ThemeContext } from "../../ThemeContext";

import styled from "styled-components";
import { light, dark } from "../../../constants";

const FeedNavButton = ({ children, order, setState, isSelected }) => {
  const { selectTheme, setSelectTheme } = useContext(ThemeContext);

  return (
    <FeedButton
      isSelected={isSelected}
      onClick={() => setState(order)}
      selecttheme={selectTheme}
    >
      {children}
    </FeedButton>
  );
};

const FeedButton = styled.button`
  flex: 1;
  padding: 15px;
  margin-top: 10px;
  font-weight: bold;
  font-size: 15px;
  background-color: transparent;
  transition: 0.3s ease-in-out;
  border: none;
  cursor: pointer;
  color: ${(props) =>
    props.isSelected ? props.selecttheme.primary : props.selecttheme.grey};
  border-bottom: ${(props) =>
    props.isSelected
      ? `2px solid ${props.selecttheme.primary}`
      : `1px ${props.selecttheme.greyLine} solid`};
`;

export default FeedNavButton;
