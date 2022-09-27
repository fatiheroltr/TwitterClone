import { useContext } from "react";
import { ProfileContext } from "./Profile/ProfileContext";
import { ProfileContextProvider } from "./Profile/ProfileContext";
import Avatar from "./Tweet/Avatar";
import styled from "styled-components";

const TippyProfile = () => {
  const {
    state: { profile, hasLoaded },
  } = useContext(ProfileContext);

  return (
    <ProfileFeedContextProvider profileId={profileId}>
      <TippyContainer>
        <div>{profile.displayName}</div>
        <div>{profile.bio}</div>
        <div>{profile.bio}</div>
        <div>
          {profile.numFollowers}
          {profile.numFollowing}
        </div>
      </TippyContainer>
    </ProfileFeedContextProvider>
  );
};

const Wrapper = styled.div``;

export default TippyProfile;
