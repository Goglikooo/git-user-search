import React from "react";
import moonIcon from "../icons/icon-moon.svg";
import sunIcon from "../icons/icon-sun.svg";

interface Props {
  theme: string;
  toggleTheme: () => void;
}

export default function Header(props: Props) {
  const { theme, toggleTheme } = props;

  return (
    <div className="heading">
      <h2 className="devfinder">devfinder</h2>
      {theme === "light" ? (
        <div className="mode" onClick={toggleTheme}>
          <span>DARK</span>
          <img src={moonIcon} alt="moon icon" />
        </div>
      ) : (
        <div className="mode" onClick={toggleTheme}>
          <span>LIGHT</span>
          <img src={sunIcon} alt="moon icon" />
        </div>
      )}
    </div>
  );
}
