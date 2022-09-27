import { useSpring, animated } from "react-spring";

const TurnIn = ({ children }) => {
  const style = useSpring({
    from: {
      transform: "rotate(-200deg) scale(0)",
    },
    to: {
      transform: "rotate(0deg) scale(1)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
    },
    config: {
      tension: 150,
      friction: 10,
    },
  });

  return <animated.div style={style}>{children}</animated.div>;
};

export default TurnIn;
