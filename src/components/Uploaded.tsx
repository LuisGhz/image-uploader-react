import React from 'react';
import "./Uploaded.css";
import { DarkLightMode } from './DarkLightMode';

type UploadedProps = {
  fileUrl: string;
};

export const Uploaded = ({ fileUrl }: UploadedProps) => {
  const [isLoading, setIsLoading] = React.useState(true);

  const copyLink = () => {
    navigator.clipboard.writeText(fileUrl);
  };

  return (
    <main className="uploaded">
      <DarkLightMode />
      <p className="uploaded__icon">✓</p>
      <h1 className="uploaded__title">Uploaded successfully!</h1>
      <img className="uploaded__img" src={fileUrl} alt="Uploaded image" onLoad={() => setIsLoading(prev => !prev)} />
      {isLoading && <div className="spinner-container">
        <div className="spinner"></div>
      </div>}
      <section className="link-container">
        <div className="link-container__uri">{fileUrl}</div>
        <button
          className="link-container__copy-btn"
          type="button"
          onClick={copyLink}
        >
          Copy Link
        </button>
      </section>
    </main>
  );
};
