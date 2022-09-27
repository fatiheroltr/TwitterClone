import { useContext } from "react";
import styled from "styled-components";
import { light, dark } from "../../constants";
import { ThemeContext } from "../ThemeContext";
import moment from "moment";
import { FiMapPin } from "react-icons/fi";
import { FiCalendar } from "react-icons/fi";

const Header = ({
  bannerSrc,
  avatarSrc,
  isBeingFollowedByYou,
  displayName,
  handle,
  bio,
  isFollowingYou,
  location,
  joined,
  numFollowers,
  numFollowing,
  currentHandle,
}) => {
  const { selectTheme, setSelectTheme } = useContext(ThemeContext);

  return (
    <>
      <BannerContainer selecttheme={selectTheme}>
        <Banner src={bannerSrc} />
        <Row>
          <Avatar src={avatarSrc} />
          {currentHandle !== handle && (
            <FollowButton selecttheme={selectTheme}>
              {isBeingFollowedByYou ? "Following" : "Follow"}
            </FollowButton>
          )}
        </Row>
      </BannerContainer>
      <ProfileInfoContainer selecttheme={selectTheme}>
        <Name>{displayName}</Name>
        <Handle selecttheme={selectTheme}>@{handle}</Handle>
        {isFollowingYou && (
          <FollowingInfo selecttheme={selectTheme}>Follows you</FollowingInfo>
        )}
        <Bio>{bio}</Bio>
        {location && (
          <Location selecttheme={selectTheme}>
            <FiMapPin style={{ paddingRight: "5px" }} />
            {location}
          </Location>
        )}
        {joined && (
          <Joined selecttheme={selectTheme}>
            <FiCalendar style={{ paddingRight: "5px" }} />
            Joined {moment(joined).format("MMMM YYYY")}
          </Joined>
        )}
        <FollowersInfoContainer>
          <Following>
            <span>{numFollowing}</span> Following
          </Following>
          <Followers>
            <span>{numFollowers}</span> Followers
          </Followers>
        </FollowersInfoContainer>
      </ProfileInfoContainer>
    </>
  );
};

const BannerContainer = styled.div`
  border-left: 1px ${(props) => props.selecttheme.greyLine} solid;
  border-right: 1px ${(props) => props.selecttheme.greyLine} solid;
  transition: 0.3s ease-in-out;
`;

const Banner = styled.img`
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: -75px;
  padding: 0 20px;
`;

const Avatar = styled.img`
  border-radius: 50%;
  width: 145px;
  /* top: 130px;
  left: 20px; */
  border: 4px solid white;
`;

const FollowButton = styled.button`
  background-color: ${(props) => props.selecttheme.primary};
  color: ${(props) => props.selecttheme.buttonLabel};
  font-weight: 700;
  font-size: 16px;
  border: none;
  padding: 12px 20px;
  border-radius: 50px;
  height: 40px;
  align-self: flex-end;
`;

const ProfileInfoContainer = styled.div`
  border-left: 1px ${(props) => props.selecttheme.greyLine} solid;
  border-right: 1px ${(props) => props.selecttheme.greyLine} solid;
  padding: 20px;
  transition: 0.3s ease-in-out;
`;

const Name = styled.span`
  display: block;
  font-weight: 700;
  font-size: 20px;
`;

const Handle = styled.span`
  display: inline-block;
  color: ${(props) => props.selecttheme.grey};
  padding: 5px 0;
`;

const Bio = styled.p`
  padding: 15px 0;
  line-height: 22px;
`;

const FollowingInfo = styled.span`
  color: ${(props) => props.selecttheme.primaryHover};
  font-size: 12px;
  background-color: ${(props) => props.selecttheme.greyLine};
  padding: 2px 5px;
  margin-left: 5px;
  border-radius: 5px;
  transition: 0.3s ease-in-out;
`;

const Location = styled.span`
  vertical-align: middle;
  margin-right: 20px;
  color: ${(props) => props.selecttheme.grey};
`;
const Joined = styled.span`
  vertical-align: middle;
  color: ${(props) => props.selecttheme.grey};
`;

const FollowersInfoContainer = styled.div`
  display: flex;
  padding-top: 15px;
`;
const Followers = styled.div`
  & span {
    font-weight: 700;
  }
`;
const Following = styled.div`
  padding-right: 20px;

  & span {
    font-weight: 700;
  }
`;

export default Header;
