import { useState, useContext, forwardRef } from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import { ThemeContext } from "./ThemeContext";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { FiHome } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import { FiBell } from "react-icons/fi";
import { FiBookmark } from "react-icons/fi";
import { RiMoonClearFill } from "react-icons/ri";
import { BsSunFill } from "react-icons/bs";
import { FaPenNib } from "react-icons/fa";
import NewTweetModal from "./NewTweetModal";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import { light, dark } from "../constants";
import Error from "./Error";
import LogoSrc from "../assets/logo.svg";
import LoadingCircle from "./LoadingCircle";
import Skeleton from "@material-ui/lab/Skeleton";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SideBar = () => {
  const {
    state: { currentUser, status },
    userError,
  } = useContext(CurrentUserContext);

  const { selectTheme, setSelectTheme } = useContext(ThemeContext);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const toggleTheme = () => {
    setSelectTheme((current) => (current === light ? dark : light));
  };

  return (
    <Wrapper>
      {userError ? (
        <Error message={userError} />
      ) : status === "loading" ? (
        <LoadingCircle circleSize={40} />
      ) : (
        <Navigation>
          <Logo src={LogoSrc} alt="Critter logo" />
          <NavigationLink exact to="/" selecttheme={selectTheme}>
            <FiHome size={"24px"} style={{ padding: "0 10px" }} />
            <NavLabel>Home</NavLabel>
          </NavigationLink>

          <NavigationLink
            to={`/${currentUser.handle}`}
            selecttheme={selectTheme}
          >
            <FiUser size={"24px"} style={{ padding: "0 10px" }} />
            <NavLabel>Profile</NavLabel>
          </NavigationLink>

          <NavigationLink to="/notifications" selecttheme={selectTheme}>
            <FiBell size={"24px"} style={{ padding: "0 10px" }} />
            <NavLabel>Notifications</NavLabel>
          </NavigationLink>

          <NavigationLink to="/bookmarks" selecttheme={selectTheme}>
            <FiBookmark size={"24px"} style={{ padding: "0 10px" }} />
            <NavLabel>Bookmarks</NavLabel>
          </NavigationLink>
          <MeowButton onClick={handleClickOpen} selecttheme={selectTheme}>
            <FaPenNib />
            <span>New Meow</span>
          </MeowButton>
          <ThemeButton onClick={toggleTheme} selecttheme={selectTheme}>
            {selectTheme === dark ? (
              <>
                <SunIcon size={25} />
                <span>Light Mode</span>
              </>
            ) : (
              <>
                <MoonIcon size={25} />
                <span>Dark Mode</span>
              </>
            )}
          </ThemeButton>

          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
          >
            <NewTweetModal
              avatarSrc={currentUser.avatarSrc}
              setOpen={setOpen}
            />
          </Dialog>
        </Navigation>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  width: 275px;
  height: 100%;
`;

const Navigation = styled.div`
  display: flex;
  flex-direction: column;
`;

const NavigationLink = styled(NavLink)`
  display: flex;
  align-items: center;
  width: fit-content;
  color: ${(props) => props.selecttheme.black};
  font-weight: 700;
  font-size: 1.25em;
  padding: 10px 23px 10px 10px;
  text-decoration: none;

  &.active {
    color: ${(props) => props.selecttheme.primary};
  }

  &:hover {
    color: ${(props) => props.selecttheme.primary};
    background-color: ${(props) => props.selecttheme.menuHover};
    border-radius: 30px;
    cursor: pointer;
  }
`;

const NavLabel = styled.span`
  display: inline-block;
  height: 26px;
  vertical-align: middle;
  padding-top: 10px;
  padding-left: 5px;
`;

const Logo = styled.img`
  height: 50px;
  width: 50px;
  margin: 20px 0 10px 7px;
`;

const MeowButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 700;
  background-color: ${(props) => props.selecttheme.primary};
  color: ${(props) => props.selecttheme.buttonLabel};
  width: 180px;
  height: 45px;
  border-radius: 30px;
  border: none;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  transition: ease-in-out 0.1s;
  &:hover {
    background-color: ${(props) => props.selecttheme.primaryHover};
    cursor: pointer;
  }

  & span {
    margin-left: 10px;
  }
`;

const ThemeButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  width: 180px;
  height: 45px;
  border-radius: 30px;
  border: none;
  margin-left: auto;
  margin-right: auto;
  font-size: 20px;
  font-weight: 700;
  background-color: ${(props) => props.selecttheme.primary};
  color: ${(props) => props.selecttheme.buttonLabel};

  &:hover {
    background-color: ${(props) => props.selecttheme.primaryHover};
    cursor: pointer;
  }

  & span {
    margin-left: 10px;
  }
`;

const SunIcon = styled(BsSunFill)``;

const MoonIcon = styled(RiMoonClearFill)``;

export default SideBar;
