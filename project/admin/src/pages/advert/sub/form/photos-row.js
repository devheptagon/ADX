import { useState } from "react";
import { apiUrl } from "config";
import styles from "styles/app.module.scss";

export default function PhotosRow(props) {
  const [photos, setPhotos] = useState(props.item?.images?.split(",") || []);
  const [uploading, setUploading] = useState(false);

  const selectFile = (e) => {
    e.preventDefault();

    let file = e.target.files[0];
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      const list = [...photos, Math.random().toString()];
      setPhotos(list);
      props.handleChange({
        target: {
          name: "images",
          value: list.join(","),
        },
      });
    }, 2000);
  };

  const removePhoto = (e) => {
    e.preventDefault();
    const id = e.currentTarget.dataset.id;
    const list = photos.filter((p) => p !== id);
    setPhotos(list);
    props.handleChange({
      target: {
        name: "images",
        value: list.join(","),
      },
    });
  };

  return (
    <tr>
      <td colSpan={4}>
        <h6>Photos</h6>
        <input
          type="file"
          accept="image/*"
          onChange={selectFile}
          disabled={uploading}
        />
        {uploading && <h6>Uploading image, please wait...</h6>}
        <div className={styles.uploaded}>
          {photos.map((p) => (
            <div key={p} className={styles.image}>
              <a href={apiUrl + "images/" + p} target="_blank" rel="noreferrer">
                <img alt="photos" src={apiUrl + "images/" + p} />
              </a>
              <a href="#" onClick={removePhoto} data-id={p}>
                × delete
              </a>
            </div>
          ))}
        </div>
      </td>
    </tr>
  );
}
