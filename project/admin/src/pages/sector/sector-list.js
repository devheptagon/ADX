import { useState } from "react";
import SectorForm from "./sector-form";
import Modal from "react-modal";

export default function SectorList() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(0);
  const closeModal = () => {
    setModalOpen(false);
  };

  const edit = (e) => {
    const id = e.currentTarget.dataset.id;
    setSelectedItemId(id);
    setModalOpen(true);
  };

  const remove = (e) => {
    const id = e.currentTarget.dataset.id;
    const label = e.currentTarget.dataset.label;
    const value = window.confirm("Are you sure to delete " + label);
  };

  return (
    <div>
      <button id="addbutton">ADD NEW SECTOR</button>
      <table id="datatable">
        <thead>
          <tr>
            <th colSpan="2"></th>
            <th>Sector name</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <span
                data-id="1"
                data-label="sector1"
                onClick={remove}
                title="delete"
              >
                <i className="fa fa-trash-o"></i>
              </span>
            </td>
            <td>
              <span data-id="1" onClick={edit} title="edit">
                <i className="fa fa-pencil-square-o"></i>
              </span>
            </td>
            <td>sector1</td>
          </tr>
        </tbody>
      </table>
      <Modal ariaHideApp={false} isOpen={modalOpen}>
        <SectorForm id={selectedItemId} onClose={closeModal} />
      </Modal>
    </div>
  );
}
