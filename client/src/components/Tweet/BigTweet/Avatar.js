import styled from "styled-components";

const Avatar = ({ avatarSrc }) => {
  return <AvatarImg src={avatarSrc} />;
};

const AvatarImg = styled.img`
  width: 50px;
  border-radius: 50%;
  margin-right: 15px;
`;

export default Avatar;
