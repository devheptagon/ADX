import { apiUrl } from "config";
import styles from "styles/app.module.scss";

export default function PhotosInput(props) {
  const { selectFile, uploading, photos } = props;
  const removePhoto = () => {};
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
              <a href="#" onClick={removePhoto}>
                × delete
              </a>
            </div>
          ))}
        </div>
      </td>
    </tr>
  );
}
