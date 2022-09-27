import { useContext } from "react";
import { ProfileContext } from "./ProfileContext";
import { ProfileFeedContextProvider } from "./Feed/ProfileFeedContext";
import { CurrentUserContext } from "../CurrentUserContext";
import Header from "./Header";
import Feed from "./Feed";
import LoadingCircle from "../LoadingCircle";
import GoBack from "../GoBack";
import Error from "../Error";

const Profile = () => {
  const {
    state: { profile, hasLoaded, error },
  } = useContext(ProfileContext);

  const {
    state: { currentUser },
  } = useContext(CurrentUserContext);

  return (
    <>
      {error ? (
        <Error message={error} />
      ) : !hasLoaded ? (
        <LoadingCircle circleSize={40} />
      ) : (
        <>
          <GoBack displayName={profile.displayName} isHome={false} />
          <Header
            bannerSrc={profile.bannerSrc}
            avatarSrc={profile.avatarSrc}
            isBeingFollowedByYou={profile.isBeingFollowedByYou}
            displayName={profile.displayName}
            handle={profile.handle}
            bio={profile.bio}
            isFollowingYou={profile.isFollowingYou}
            location={profile.location}
            joined={profile.joined}
            numFollowers={profile.numFollowers}
            numFollowing={profile.numFollowing}
            currentHandle={currentUser.handle}
          />
          <ProfileFeedContextProvider handle={profile.handle}>
            <Feed />
          </ProfileFeedContextProvider>
        </>
      )}
    </>
  );
};

export default Profile;
