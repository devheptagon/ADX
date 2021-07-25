import { useState } from "react";

export default function PhotoParams(props) {
  const [photos, setPhotos] = useState([1, 2, 3]);
  const [uploading, setUploading] = useState(false);

  const selectFile = (e) => {
    e.preventDefault();

    let file = e.target.files[0];
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setPhotos([...photos, Math.random()]);
    }, 2000);
  };
  return { photos, uploading, selectFile };
}
