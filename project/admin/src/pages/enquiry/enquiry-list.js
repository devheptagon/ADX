import React, { useState, useEffect } from "react";
import { getEnquiriesEP, deleteEnquiryEP } from "integration/endpoints/enquiry";

export default function SectorList() {
  const [enquiries, setEnquiries] = useState([]);

  const remove = async (e) => {
    const id = e.currentTarget.dataset.id;
    const label = e.currentTarget.dataset.label;
    const ok = window.confirm("Are you sure to delete " + label);
    if (ok) {
      await deleteEnquiryEP(id);
      const newList = await getEnquiriesEP();
      setEnquiries(newList);
    }
  };

  useEffect(() => {
    getEnquiriesEP().then((res) => setEnquiries(res));
  }, []);

  return enquiries?.length ? (
    <div>
      <table id="datatable">
        <tbody>
          {enquiries.map((item, index) => (
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
                <div>
                  <b>enquiry_type: </b>
                  {item.enquiry_type}
                </div>
                <div>
                  <b>user_type: </b>
                  {item.user_type}
                </div>
                <div>
                  <b>first_name: </b>
                  {item.first_name}
                </div>
                <div>
                  <b>last_name: </b>
                  {item.last_name}
                </div>
                <div>
                  <b>email: </b>
                  {item.email}
                </div>
              </td>
              <td>
                <div>
                  <b>location</b>
                  {item.location}
                </div>
                <div>
                  <b>property_type</b>
                  {item.property_type}
                </div>
                <div>
                  <b>price: </b>
                  {item.price}
                </div>
                <div>
                  <b>area_size</b>
                  {item.area_size}
                </div>
                <div>
                  <b>create_date</b>
                  {item.create_date.split(" ")[0]}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    "No enquiry found..."
  );
}
