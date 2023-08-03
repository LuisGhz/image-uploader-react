import dragImage from '../assets/drag-image.svg';
import "./DragImage.css";

export const DragImage = () => {
  return <div className="drag-image">
    <h1 className='drag-image__title'>Upload your image</h1>
    <p className='drag-image__file-description'>File should be jpeg, png...</p>
    <section className='drag-area'>
      <img className='drag-area__img' src={dragImage} alt="Drag image" />
      <p className='drag-area__description'>Drag & Drop your image here.</p>
    </section>
    <p className='drag-image__or'>Or</p>
    <button className='drag-image__choose-btn' type="button">Choose a file</button>
  </div>;
};
