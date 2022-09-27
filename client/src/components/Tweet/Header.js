import { useContext } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import styled from "styled-components";
import { ThemeContext } from "../ThemeContext";
import { ProfileContext } from "../Profile/ProfileContext";
import { ProfileContextProvider } from "../Profile/ProfileContext";
import Avatar from "../Tweet/Avatar";
import { dark, light } from "../../constants";
import Tippy from "@tippyjs/react";

const Header = ({ displayName, userName, timestamp }) => {
  const history = useHistory();
  const { selectTheme } = useContext(ThemeContext);

  const {
    state: { profile, hasLoaded },
  } = useContext(ProfileContext);

  const handleClickToProfile = (ev) => {
    ev.stopPropagation();
    history.push(`/${userName}`);
    window.scrollTo(0, 0);
  };

  return (
    <Wrapper>
      <Tippy
        content={
          <>
            {hasLoaded && (
              <TippyContainer selecttheme={selectTheme}>
                <Avatar avatarSrc={profile.avatarSrc} />
                <DisplayName style={{ padding: "10px 0 2px 0" }}>
                  {displayName}
                </DisplayName>
                <UserName
                  selecttheme={selectTheme}
                  style={{ paddingBottom: "15px" }}
                >
                  @{profile.handle}
                </UserName>
                <Bio>{profile.bio}</Bio>
                <div>
                  <DisplayName>{profile.numFollowers}</DisplayName>
                  <UserName selecttheme={selectTheme}>Following</UserName>
                  <DisplayName style={{ marginLeft: "15px" }}>
                    {profile.numFollowing}
                  </DisplayName>
                  <UserName selecttheme={selectTheme}>Followers</UserName>
                </div>
              </TippyContainer>
            )}
          </>
        }
        placement="bottom"
        delay="1s"
      >
        <DisplayName onClick={handleClickToProfile}>{displayName}</DisplayName>
      </Tippy>
      <UserName selecttheme={selectTheme}>@{userName}</UserName>
      <Date selecttheme={selectTheme}>
        <span>•</span>
        {moment(timestamp).format("MMM Do")}
      </Date>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  margin-bottom: 5px;
`;

const DisplayName = styled.span`
  font-size: 15px;
  font-weight: 700;
  padding-right: 3px;

  &:hover {
    text-decoration: underline;
  }
`;

const UserName = styled.span`
  font-size: 15px;
  color: ${(props) => props.selecttheme.grey};
`;

const Date = styled.span`
  font-size: 15px;
  color: ${(props) => props.selecttheme.grey};
  & > span {
    padding: 0 7px;
  }
`;

const TippyContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 100px;
  margin-top: -5px;
  padding: 15px;
  width: 280px;
  height: auto;
  background-color: ${(props) => props.selecttheme.background};
  box-shadow: ${(props) =>
    props.selecttheme === light
      ? "0px 0px 21px 4px rgba(0, 0, 0, 0.41)"
      : "0px 0px 21px 4px rgba(255, 255, 255, 0.15)"};
  animation: 1s ease 0s normal forwards 1 fadein;
  color: ${(props) => props.selecttheme.black};

  @keyframes fadein {
    0% {
      opacity: 0;
    }
    66% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const Bio = styled.span`
  line-height: 20px;
  font-size: 15px;
  margin-bottom: 20px;
`;

export default Header;
