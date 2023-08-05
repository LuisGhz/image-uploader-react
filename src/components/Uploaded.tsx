import "./Uploaded.css";

type UploadedProps = {
  fileUrl: string;
};

export const Uploaded = ({ fileUrl }: UploadedProps) => {

  const copyLink = () => {
    navigator.clipboard.writeText(fileUrl);
  };

  return (
    <main className="uploaded">
      <p className="uploaded__icon">✓</p>
      <h1 className="uploaded__title">Uploaded successfully!</h1>
      <img className="uploaded__img" src={fileUrl} alt="Uploaded image" />
      <section className="link-container">
        <div className="link-container__uri">{fileUrl}</div>
        <button className="link-container__copy-btn" type="button" onClick={copyLink}>
          Copy Link
        </button>
      </section>
    </main>
  );
};
