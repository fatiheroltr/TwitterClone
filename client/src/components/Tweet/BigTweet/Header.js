import { useContext } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { dark, light } from "../../../constants";
import { ThemeContext } from "../../ThemeContext";

const Header = ({ displayName, userName, timestamp }) => {
  const history = useHistory();
  const { selectTheme, setSelectTheme } = useContext(ThemeContext);

  const handleClickToProfile = (ev) => {
    ev.stopPropagation();
    history.push(`/${userName}`);
  };

  return (
    <Wrapper>
      <DisplayName onClick={handleClickToProfile}>{displayName}</DisplayName>
      <UserName selecttheme={selectTheme}>@{userName}</UserName>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 5px;
  width: 100%;
`;

const DisplayName = styled.span`
  font-size: 16px;
  font-weight: 700;
  padding-right: 3px;
  padding-bottom: 3px;
  padding-top: 7px;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const UserName = styled.span`
  font-size: 15px;
  color: ${(props) => props.selecttheme.grey};
`;

export default Header;
