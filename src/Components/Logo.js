import React from "react";
import * as S from "../styled/Logo.styled";

import { motion } from "framer-motion";

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i) => {
    const delay = 1 + i * 1;
    return {
      opacity: 1,
      transition: {
        pathLength: { delay, duration: 0.3 },
        opacity: { delay, duration: 0.2 },
      },
    };
  },
};

const Logo = () => {
  return (
    <S.LogoContainer>
      <svg width="80" height="69" viewBox="0 0 80 69" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="Group 27">
          <motion.path
            variants={draw}
            initial="hidden"
            animate="visible"
            custom={0.7}
            id="sign"
            d="M9 41.0891L23.6667 55.6675L38.3333 41.0891L53 26.6675"
            stroke="#479F45"
            strokeWidth="17.26"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <motion.circle
            variants={draw}
            custom={0.26}
            initial="hidden"
            animate="visible"
            id="Ellipse 7"
            cx="24.2023"
            cy="56.2024"
            r="8.62836"
            transform="rotate(-45 24.2023 56.2024)"
            fill="#D9D9D9"
          />
          <motion.circle
            variants={draw}
            custom={0.37}
            initial="hidden"
            animate="visible"
            id="Ellipse 6"
            cx="52.6092"
            cy="55.4652"
            r="8.62836"
            transform="rotate(-45 52.6092 55.4652)"
            fill="#D9D9D9"
          />
          <motion.circle
            variants={draw}
            custom={0.52}
            initial="hidden"
            animate="visible"
            id="Ellipse 5"
            cx="38.1884"
            cy="41.0442"
            r="8.62836"
            transform="rotate(-45 38.1884 41.0442)"
            fill="#D9D9D9"
          />
          <motion.circle
            variants={draw}
            custom={0.19}
            initial="hidden"
            animate="visible"
            id="Ellipse 4"
            cx="23.7677"
            cy="26.6233"
            r="8.62836"
            transform="rotate(-45 23.7677 26.6233)"
            fill="#D9D9D9"
          />
          <motion.circle
            variants={draw}
            custom={0.45}
            initial="hidden"
            animate="visible"
            id="Ellipse 3"
            cx="67.0303"
            cy="41.0442"
            r="8.62836"
            transform="rotate(-45 67.0303 41.0442)"
            fill="#D9D9D9"
          />
          <motion.circle
            variants={draw}
            custom={0.28}
            initial="hidden"
            animate="visible"
            id="Ellipse 2"
            cx="53.2023"
            cy="26.2024"
            r="8.62836"
            transform="rotate(-45 53.2023 26.2024)"
            fill="#D9D9D9"
          />
          <motion.circle
            variants={draw}
            custom={0.35}
            initial="hidden"
            animate="visible"
            id="Ellipse 1"
            cx="38.1884"
            cy="12.2024"
            r="8.62836"
            transform="rotate(-45 38.1884 12.2024)"
            fill="#D9D9D9"
          />
        </g>
      </svg>
    </S.LogoContainer>
  );
};

export default Logo;
