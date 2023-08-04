import { useState } from 'react';
import './App.css'
import { DragImage } from './components/DragImage'
import { ViewState } from './types/ViewState';

function App() {
  const [viewState, setViewState] = useState<ViewState>("drag");
  
  const uploadImage = async (image: File) => {
    console.log(image);
  };

  return (
    <>
      <main className='image-uploader'>
        <div className='container'>
          {viewState === "drag" && <DragImage uploadImage={uploadImage} />}
        </div>
      </main>
      <footer>Footer</footer>
    </>
  )
}

export default App
