import { useState } from "react";
import { apiUrl } from "config";
import styles from "styles/app.module.scss";
import { uploadEP } from "integration/endpoints/advert";

export default function PhotosRow(props) {
  const [photos, setPhotos] = useState(
    props.item?.images ? props.item?.images.split(",") : []
  );
  const [uploading, setUploading] = useState(false);

  const selectFile = async (e) => {
    e.preventDefault();

    let file = e.target.files[0];
    let formData = new FormData();
    formData.append("file", file);
    setUploading(true);
    const response = await uploadEP(formData);
    setUploading(false);
    const list = response ? [...photos, response] : [...photos];
    setPhotos(list);
    props.handleChange({
      target: {
        name: "images",
        value: list.join(","),
      },
    });
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
