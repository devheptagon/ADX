//import styles from "styles/app.module.scss";
import Layout from "Layout";
import { Formik } from "formik";
import * as yup from "yup";
import { useHistory, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import { getAdvertEP } from "integration/endpoints/advert";
import { getSellerEP } from "integration/endpoints/user";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function MessageList(props) {
  const query = useQuery();
  const history = useHistory();
  const sellerid = query.get("sid"); //sellerid
  const advertid = query.get("aid"); //advertid

  const [sellerName, setSellerName] = useState("");
  const [advertTitle, setAdvertTitle] = useState("");
  useEffect(() => {
    getSellerEP(sellerid).then((res) => setSellerName(res.fullname));
    getAdvertEP(advertid).then((res) => setAdvertTitle(res.title));
  }, [advertid, sellerid]);

  return (
    <Layout>
      <h3>New message</h3>
      <Formik
        initialValues={{
          title: "",
        }}
        validationSchema={yup.object().shape({
          title: yup.string().required(),
        })}
        onSubmit={async (values, { setSubmitting, setStatus, resetForm }) => {
          setSubmitting(true);
          history.push("/sent");
          setSubmitting(false);
          resetForm({});
          setStatus({ success: true });
        }}
      >
        {({
          values,
          //touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleSubmit,
        }) => {
          return (
            <form onSubmit={handleSubmit}>
              <table id="dataform">
                <tbody>
                  <tr>
                    <td>
                      <label htmlFor="Title">Seller: &nbsp;</label>
                    </td>
                    <td>{sellerName}</td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="Title">Advert: &nbsp;</label>
                    </td>
                    <td>{advertTitle}</td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="Title">Title: &nbsp;</label>
                    </td>
                    <td>
                      {" "}
                      <fieldset>
                        <input
                          type="text"
                          name="title"
                          id="title"
                          placeholder="Title"
                          title="* Title"
                          required="required"
                          value={values.title}
                          onChange={handleChange}
                        />
                      </fieldset>
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={2}>
                      <button
                        data-id="save"
                        type="submit"
                        disabled={
                          isSubmitting || !dirty || Object.keys(errors).length
                        }
                      >
                        Save
                      </button>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </form>
          );
        }}
      </Formik>
    </Layout>
  );
}
