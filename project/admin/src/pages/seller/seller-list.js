import { useState } from "react";
import SellerForm from "./seller-form";
import Modal from "react-modal";
import { useSelector } from "react-redux";

export default function SellerList() {
  const sellers = useSelector((state) => state.appReducer.sellers);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const closeModal = () => {
    setModalOpen(false);
  };

  const edit = (e) => {
    const id = e.currentTarget.dataset.id;
    const item = sellers.filter((s) => s.id === id)[0];
    setSelectedItem(item);
    setModalOpen(true);
  };

  return (
    <div>
      <table id="datatable">
        <thead>
          <tr>
            <th colSpan="2"></th>
            <th>Seller name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {sellers.map((item, index) => (
            <tr key={item.id}>
              <td></td>
              <td>
                <span data-id={item.id} onClick={edit} title="edit">
                  <i className="fa fa-pencil-square-o"></i>
                </span>
              </td>
              <td>{item.fullname}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
            </tr>
          ))}
          <tr>
            <td colSpan={5} align="right">
              Page 1 of 1
            </td>
          </tr>
        </tbody>
      </table>
      <Modal ariaHideApp={false} isOpen={modalOpen}>
        <SellerForm item={selectedItem || {}} onClose={closeModal} />
      </Modal>
    </div>
  );
}
