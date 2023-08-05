import React from "react";
import dragImage from "../assets/drag-image.svg";
import "./DragImage.css";
import { useValidateImage } from "../hooks/useValidateImage";
import { UploadRes } from "../models/UploadRes";

export type DragImageProps = {
  uploadImage: (image: File) => void;
  uploadRes: UploadRes;
};

export const DragImage = ({ uploadImage, uploadRes }: DragImageProps) => {
  const fileInput = React.useRef<HTMLInputElement>(null);
  const [isInvalidSize, setIsInvalidSize] = React.useState(false);
  const [isInvalidType, setIsInvalidType] = React.useState(false);
  const { isValidImageSize, isValidImageType } = useValidateImage();

  const onDragOver = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
  };

  const onDrop = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!isValidImage(file)) return;
    uploadImage(file);
  };

  const onImageSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !isValidImage(file)) return;
    uploadImage(file);
  };

  const isValidImage = (file: File) => {
    const isValidSize = isValidImageSize(file.size);
    const isValidType = isValidImageType(file.type);
    setIsInvalidSize(!isValidSize);
    setIsInvalidType(!isValidType);
    return isValidSize && isValidType;
  };

  return (
    <div className="drag-image">
      <h1 className="drag-image__title">Upload your image</h1>
      <p
        className={[
          "drag-image__file-description",
          !isInvalidSize && !isInvalidType && !uploadRes?.message
            ? "drag-image__file-description--no-error"
            : "",
        ].join(" ")}
      >
        File should be jp(e)g, png, or gif
      </p>
      {isInvalidSize && <p className="drag-image__error">Image too large.</p>}
      {isInvalidType && (
        <p className="drag-image__error">Invalid image type.</p>
      )}
      {uploadRes?.message && (
        <p className="drag-image__error">{uploadRes.message}</p>
      )}
      <section
        onDragOver={onDragOver}
        onDrop={onDrop}
        className="drag-area"
        data-testid="drag-area"
      >
        <img className="drag-area__img" src={dragImage} alt="Drag image" />
        <p className="drag-area__description">Drag & Drop your image here.</p>
      </section>
      <p className="drag-image__or">Or</p>
      <input
        className="drag-image__input"
        type="file"
        name="image-selecto"
        id="image-selector"
        data-testid="image-selector"
        accept="image/jpeg, image/png, image/gif, image/jpg"
        onChange={(e) => onImageSelected(e)}
        ref={fileInput}
      />
      <button
        className="drag-image__choose-btn"
        type="button"
        onClick={() => fileInput.current?.click()}
      >
        Choose a file
      </button>
    </div>
  );
};
