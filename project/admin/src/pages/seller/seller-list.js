import { useSelector, useDispatch } from "react-redux";
import { getSellersEP, toggleSellerEP } from "integration/endpoints/user";
import { setSellersAction } from "redux/app/appActions";

export default function SellerList() {
  const dispatch = useDispatch();
  const sellers = useSelector((state) => state.appReducer.sellers);

  const toggle = async (e) => {
    const id = e.currentTarget.dataset.id;
    const val = e.currentTarget.dataset.val === "true" ? true : false;
    await toggleSellerEP(id, val);
    const sellers = await getSellersEP();
    dispatch(setSellersAction(sellers));
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
              <td colSpan={2}>
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
    </div>
  );
}
