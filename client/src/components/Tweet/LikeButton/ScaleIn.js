import { useSpring, animated } from "react-spring";

const ScaleIn = ({ children }) => {
  const style = useSpring({
    from: {
      transform: "scale(0)",
    },
    to: {
      transform: "scale(1)",
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

export default ScaleIn;
