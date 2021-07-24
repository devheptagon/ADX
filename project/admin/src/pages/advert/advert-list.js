import React, { useState } from "react";
import Modal from "react-modal";
import { getAdvertsEP, deleteAdvertEP } from "integration/endpoints/advert";
import { getPagerList } from "utils/appHelper";
import { ROW_COUNT_PER_PAGE } from "config";
import AdvertForm from "./advert-form";

export default function AdvertList() {
  const [adverts, setAdverts] = useState([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState([1]);
  const [lastPageNo, setLastPageNo] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const closeModal = async (fetch) => {
    if (fetch) {
      const newList = await getAdvertsEP();
      setAdverts(newList);
    }

    setModalOpen(false);
  };

  const edit = (e) => {
    const id = e.currentTarget.dataset.id;
    const item = adverts.filter((s) => s.id === id)[0];
    setSelectedItem(item);
    setModalOpen(true);
  };

  const remove = async (e) => {
    const id = e.currentTarget.dataset.id;
    const label = e.currentTarget.dataset.label;
    const ok = window.confirm("Are you sure to delete " + label);
    if (ok) {
      await deleteAdvertEP(id);
      const newList = await getAdvertsEP();
      setAdverts(newList);
    }
  };

  React.useEffect(() => {
    loadPage(page);
  }, [page]);

  const loadPage = async (nextPage) => {
    const response = await getAdvertsEP(nextPage);
    setPage(nextPage);
    setPagination(getPagerList(nextPage, response.count || 0));
    setLastPageNo(Math.ceil(response.count / ROW_COUNT_PER_PAGE));
    setAdverts(response?.data || []);
  };

  return (
    <div>
      <button id="addbutton">ADD NEW ADVERT</button>
      <table id="datatable">
        <thead>
          <tr>
            <th colSpan="2"></th>
            <th></th>
            <th>Title</th>
            <th>Seller</th>
            <th>Area</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {adverts.map((item, index) => (
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
              <td>img</td>
              <td>{item.title}</td>
              <td>{item.seller?.fullname}</td>
              <td>{item.areas}</td>
              <td>{item.create_date.split(" ")[0]}</td>
            </tr>
          ))}
          <tr id="pager">
            <td colSpan={7} align="right">
              <span onClick={() => loadPage(1)} title="1">
                <i className="fa fa-fast-backward"></i>
              </span>
              &nbsp;&nbsp;
              <span
                onClick={() => loadPage(Math.max(1, page - 1))}
                title={Math.max(1, page - 1)}
              >
                <i className="fa fa-step-backward"></i>
              </span>
              &nbsp;&nbsp;
              {pagination.map((p) => (
                <span key={p}>
                  <span
                    style={{ color: p === page ? "gray" : "blue" }}
                    onClick={() => loadPage(p)}
                  >
                    {p}
                  </span>
                  &nbsp;&nbsp;
                </span>
              ))}
              <span
                onClick={() => loadPage(Math.min(lastPageNo, page + 1))}
                title={Math.min(lastPageNo, page + 1)}
              >
                <i className="fa fa-step-forward"></i>
              </span>
              &nbsp;&nbsp;
              <span onClick={() => loadPage(lastPageNo)} title={lastPageNo}>
                <i className="fa fa-fast-forward"></i>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      <Modal ariaHideApp={false} isOpen={modalOpen}>
        <AdvertForm item={selectedItem} onClose={closeModal} />
      </Modal>
    </div>
  );
}
