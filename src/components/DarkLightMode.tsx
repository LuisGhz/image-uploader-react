import React from "react";
import "./DarkLightMode.css";

export const DarkLightMode = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  const handleMode = (isDarkMode: boolean) => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
      return;
    }
    document.body.classList.remove("dark-mode");
  };

  React.useEffect(() => {
    const darkMode = localStorage.getItem("darkMode");
    setIsDarkMode(!!darkMode);
    handleMode(!!darkMode);
  }, []);

  const switchToDarkMode = () => {
    localStorage.setItem("darkMode", "true");
    setIsDarkMode(true);
    handleMode(true);
  };

  const switchToLightMode = () => {
    localStorage.removeItem("darkMode");
    setIsDarkMode(false);
    handleMode(false);
  };

  return (
    <>
      {!isDarkMode && (
        <span
          className="material-symbols-outlined icon"
          onClick={switchToDarkMode}
        >
          light_mode
        </span>
      )}
      {isDarkMode && (
        <span
          className="material-symbols-outlined icon"
          onClick={switchToLightMode}
        >
          dark_mode
        </span>
      )}
    </>
  );
};
