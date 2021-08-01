import { useState } from "react";
import SectorForm from "./sector-form";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { deleteSectorEP, getSectorsEP } from "integration/endpoints/sector";
import { setSectorsAction } from "redux/app/appActions";

export default function SectorList() {
  const dispatch = useDispatch();
  const sectors = useSelector((state) => state.appReducer.sectors);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const closeModal = () => {
    setModalOpen(false);
    setSelectedItem(null);
  };

  const edit = (e) => {
    const id = e.currentTarget.dataset.id;
    const item = sectors.filter((s) => s.id === id)[0];
    setSelectedItem(item);
    setModalOpen(true);
  };

  const remove = async (e) => {
    const id = e.currentTarget.dataset.id;
    const label = e.currentTarget.dataset.label;
    const ok = window.confirm("Are you sure to delete " + label);
    if (ok) {
      await deleteSectorEP(id);
      const newList = await getSectorsEP();
      dispatch(setSectorsAction(newList));
    }
  };

  return (
    <div>
      <button
        id="addbutton"
        onClick={() => setModalOpen(true)}
        className="btn btn-primary"
      >
        ADD NEW SECTOR
      </button>
      <br />
      <br />
      <table id="datatable">
        <thead>
          <tr>
            <th colSpan="2"></th>
            <th>Sector name</th>
          </tr>
        </thead>
        <tbody>
          {sectors.map((item, index) => (
            <tr key={item.id}>
              <td>
                <span
                  data-id={item.id}
                  data-label={item.title}
                  onClick={remove}
                  title="delete"
                  className="btn btn-danger"
                >
                  <i className="fa fa-trash-o"></i>
                </span>
              </td>
              <td>
                <span
                  data-id={item.id}
                  onClick={edit}
                  title="edit"
                  className="btn btn-info"
                >
                  <i className="fa fa-pencil-square-o"></i>
                </span>
              </td>
              <td>{item.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal ariaHideApp={false} isOpen={modalOpen}>
        <SectorForm item={selectedItem || {}} onClose={closeModal} />
      </Modal>
    </div>
  );
}
