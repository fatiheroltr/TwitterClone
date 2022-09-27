import { useParams } from "react-router-dom";
import { ProfileContextProvider } from "./ProfileContext";
import Profile from "./Profile";

const ProfileComponent = () => {
  const { profileId } = useParams();

  return (
    <ProfileContextProvider profileId={profileId}>
      <Profile />
    </ProfileContextProvider>
  );
};

export default ProfileComponent;
