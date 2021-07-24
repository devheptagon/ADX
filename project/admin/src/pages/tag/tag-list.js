import { useState } from "react";
import TagForm from "./tag-form";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { deleteTagEP, getTagsEP } from "integration/endpoints/tag";
import { setTagsAction } from "redux/app/appActions";

export default function TagList() {
  const dispatch = useDispatch();
  const tags = useSelector((state) => state.appReducer.tags);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const closeModal = () => {
    setModalOpen(false);
  };

  const edit = (e) => {
    const id = e.currentTarget.dataset.id;
    const item = tags.filter((s) => s.id === id)[0];
    setSelectedItem(item);
    setModalOpen(true);
  };

  const remove = async (e) => {
    const id = e.currentTarget.dataset.id;
    const label = e.currentTarget.dataset.label;
    const ok = window.confirm("Are you sure to delete " + label);
    if (ok) {
      await deleteTagEP(id);
      const newList = await getTagsEP();
      dispatch(setTagsAction(newList));
    }
  };

  return (
    <div>
      <button id="addbutton">ADD NEW KEYWORD</button>
      <table id="datatable">
        <thead>
          <tr>
            <th colSpan="2"></th>
            <th>Tag name</th>
          </tr>
        </thead>
        <tbody>
          {tags.map((item, index) => (
            <tr key={item.id}>
              <td>
                <span
                  data-id={item.id}
                  data-label={item.title}
                  onClick={remove}
                  title="delete"
                >
                  <i className="fa fa-trash-o"></i>
                </span>
              </td>
              <td>
                <span data-id={item.id} onClick={edit} title="edit">
                  <i className="fa fa-pencil-square-o"></i>
                </span>
              </td>
              <td>{item.title}</td>
            </tr>
          ))}
          <tr>
            <td colSpan={3} align="right">
              Page 1 of 1
            </td>
          </tr>
        </tbody>
      </table>
      <Modal ariaHideApp={false} isOpen={modalOpen}>
        <TagForm item={selectedItem} onClose={closeModal} />
      </Modal>
    </div>
  );
}
