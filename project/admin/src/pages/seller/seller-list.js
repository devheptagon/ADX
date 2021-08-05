import { useSelector, useDispatch } from "react-redux";
import { getSellersEP, toggleSellerEP } from "integration/endpoints/user";
import { setSellersAction } from "redux/app/appActions";
import { apiUrl } from "config";
import { useEffect } from "react";

export default function SellerList() {
  const dispatch = useDispatch();
  const sellers = useSelector((state) => state.appReducer.sellers);

  useEffect(() => {
    getSellersEP().then((list) => dispatch(setSellersAction(list)));
  }, [dispatch]);

  const toggle = async (e) => {
    const id = e.currentTarget.dataset.id;
    const val = e.currentTarget.dataset.val === "true" ? true : false;
    await toggleSellerEP(id, val);
    const newlist = await getSellersEP();
    dispatch(setSellersAction(newlist));
  };

  const onlySellers = sellers.filter((s) => s.role === "seller");

  return (
    <div>
      <table id="datatable">
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th>Seller name</th>
            <th>Email</th>
            <th>Phone</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {onlySellers.map((item, index) => (
            <tr key={item.id}>
              <td>
                {item.active ? (
                  <span
                    data-id={item.id}
                    data-val="false"
                    onClick={toggle}
                    title="edit"
                    className="btn btn-danger"
                  >
                    <i className="fa fa-toggle-on"></i> Deactivate
                  </span>
                ) : (
                  <span
                    data-id={item.id}
                    data-val="true"
                    onClick={toggle}
                    title="edit"
                    className="btn btn-info"
                  >
                    <i className="fa fa-toggle-off"></i> Activate
                  </span>
                )}
              </td>
              <td>
                <img
                  src={apiUrl + "images/" + (item.avatar || "-")}
                  alt="img"
                />
              </td>
              <td>{item.fullname}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              <td>
                <span
                  className={item.active ? "btn btn-success" : "btn btn-danger"}
                >
                  {item.active ? (
                    <i className="fa fa-check"></i>
                  ) : (
                    <i className="fa fa-times"></i>
                  )}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
