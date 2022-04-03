import { getDownloadURL, ref, uploadBytesResumable } from '@firebase/storage';
import React, { useState } from 'react';
import { storage } from '../../configs/firebase.config';

const UploadFile: React.FC = () => {
  const [progess, setProgress] = useState(0);
  const [images, setImages] = useState<File | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const handleChangeFile = (e: any) => {
    setImages(e.target.files[0]);
  };
  const handleButtonClick = () => {
    if (!images) return;
    const storageRef = ref(storage, `/files/${images.name}`);
    const uploadTask = uploadBytesResumable(storageRef, images);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(prog);
      },
      (err) => console.log(err),
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        setUrl(url);
      },
    );
  };
  return (
    <div>
      <input type="file" onChange={handleChangeFile} />
      <button type="button" onClick={handleButtonClick}>
        hello
      </button>
      <br />
      <div>Progress: {progess}</div>
      <div>{url ? <img src={url} alt="image" /> : null}</div>
    </div>
  );
};

export default UploadFile;
