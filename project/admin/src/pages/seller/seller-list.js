import { useSelector, useDispatch } from "react-redux";
import { getSellersEP, toggleSellerEP } from "integration/endpoints/user";
import { setSellersAction } from "redux/app/appActions";
import { apiUrl } from "config";

export default function SellerList() {
  const dispatch = useDispatch();
  const sellers = useSelector((state) => state.appReducer.sellers);

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
                  >
                    <i className="fa fa-toggle-on"></i> Deactivate
                  </span>
                ) : (
                  <span
                    data-id={item.id}
                    data-val="true"
                    onClick={toggle}
                    title="edit"
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
                {item.active ? (
                  <i className="fa fa-check" color="green"></i>
                ) : (
                  <i className="fa fa-times" color="red"></i>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
