import { DarkLightMode } from "./DarkLightMode";
import "./Uploading.css";

export const Uploading = () => {
  return (
    <div className="loading">
      <DarkLightMode />
      <div className="loading__bar-container">
        <div className="loading__bar"></div>
      </div>
    </div>
  );
};
