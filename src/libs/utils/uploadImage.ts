import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../configs/firebase.config';

export const uploadImage = (images: File | null) => {
  if (!images) return null;
  const storageRef = ref(storage, `/files/${images.name}`);
  const uploadTask = uploadBytesResumable(storageRef, images);
  uploadTask.on(
    'state_changed',
    (snapshot) => {
      const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    },
    (err) => {
      return null;
    },
    async () => {
      const url = await getDownloadURL(uploadTask.snapshot.ref);
      return url;
    },
  );
};
