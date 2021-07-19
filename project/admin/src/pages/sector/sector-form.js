import { getSectorsEP, updateSectorsEP } from "integration/endpoints/sector";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSectorsAction } from "redux/app/appActions";

export default function SectorForm(props) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(props.item.title);

  const update = async () => {
    await updateSectorsEP({ id: props.item.id, title });
    const newList = await getSectorsEP();
    dispatch(setSectorsAction(newList));
    props.onClose();
  };

  const cancel = () => {
    props.onClose();
  };

  return (
    <table>
      <tbody>
        <tr>
          <td>Title</td>
          <td>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
            <button onClick={update}>Update</button>
          </td>
          <td colSpan={2}>
            <button onClick={cancel}>Cancel</button>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
