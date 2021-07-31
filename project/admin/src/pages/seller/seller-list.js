import { useSelector } from "react-redux";

export default function SellerList() {
  const sellers = useSelector((state) => state.appReducer.sellers);

  const edit = (e) => {
    const id = e.currentTarget.dataset.id;
    const item = sellers.filter((s) => s.id === id)[0];
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
              <td>Deactivate</td>
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
    </div>
  );
}
