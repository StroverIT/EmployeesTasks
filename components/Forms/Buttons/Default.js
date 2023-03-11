import React from "react";
import { motion } from "framer-motion";
import { GiReturnArrow } from "react-icons/gi";

const Button = ({
  text,
  onClick,
  type = "button",
  className,
  theme = "black",
  color,
  isBg = true,
  isPos,
  icon,
  classNameIcon,
  iconPos,
  classNameText,
}) => {
  const themeColors = {
    black: ["bg-gray-900", "rgb(17 24 39)"],
  };

  const boxShadowStyle = `0 0 0 3px white, 0 0 0 6px ${
    color ? color : themeColors[theme][1]
  }`;
  const icons = {
    giReturn: <GiReturnArrow />,
  };
  return (
    <motion.button
      style={
        isBg
          ? {
              backgroundColor: color,
            }
          : {
              color,
            }
      }
      type={type}
      className={`${className} ${
        isBg && themeColors[theme][0]
      } text-white py-2 rounded-md  flex-center`}
      whileHover={{
        boxShadow: boxShadowStyle,
        transition: { type: "spring", stiffness: 300, duration: 2 },
      }}
    >
      <div className={classNameIcon}>
        {icon && iconPos == "left" && icons[icon]}
      </div>{" "}
      <div className={`${classNameText} flex-center`}>{text}</div>
      <div className={classNameIcon}>
        {icon && iconPos == "right" && icons[icon]}
      </div>
    </motion.button>
  );
};

export default Button;
