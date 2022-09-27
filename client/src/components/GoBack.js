import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import styled from "styled-components";
import { light } from "../constants";
import { dark } from "../constants";
import { ThemeContext } from "../components/ThemeContext";

const GoBack = ({ displayName, isHome }) => {
  const history = useHistory();

  const { selectTheme, setSelectTheme } = useContext(ThemeContext);

  const goBack = () => {
    history.goBack();
  };

  return (
    <Wrapper selecttheme={selectTheme}>
      <Container selecttheme={selectTheme}>
        {!isHome && (
          <Icon onClick={goBack} selecttheme={selectTheme}>
            <FiArrowLeft size={20} />
          </Icon>
        )}
        <Label>{isHome ? "Home" : displayName ? displayName : "Meow"}</Label>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 50px;
  width: 100%;
  border-bottom: 1px ${(props) => props.selecttheme.greyLine} solid;
  transition: 0.3s ease-in-out;
`;

const Container = styled.header`
  position: fixed;
  width: 648px;
  display: flex;
  align-items: center;
  height: 50px;
  border-left: 1px ${(props) => props.selecttheme.greyLine} solid;
  border-right: 1px ${(props) => props.selecttheme.greyLine} solid;
  background-color: ${(props) => props.selecttheme.goBackBackground};
  backdrop-filter: blur(12px);
  z-index: 999;
  transition: 0.3s ease-in-out;
`;

const Label = styled.span`
  padding-left: 15px;
  font-size: 20px;
  font-weight: 800;
  margin-left: 5px;
`;

const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  width: 34px;
  height: 34px;

  border-radius: 50%;

  &:hover {
    background-color: ${(props) => props.selecttheme.greyLine};
    cursor: pointer;
  }
`;

export default GoBack;
