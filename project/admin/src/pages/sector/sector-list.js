export default function SectorList() {
  const edit = (e) => {
    const id = e.target.dataset.id;
  };

  const remove = (e) => {
    const id = e.target.dataset.id;
  };

  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Sector name</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <span data-id="1" onClick={edit}>
              <i className="fa fa-trash-o"></i>
            </span>
            &nbsp;&nbsp;
            <span data-id="1" onClick={remove}>
              <i className="fa fa-pencil-square-o"></i>
            </span>
          </td>
          <td>sector1</td>
        </tr>
      </tbody>
    </table>
  );
}
