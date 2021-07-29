import { Formik } from "formik";
import * as yup from "yup";

import { getProfileEP, updateProfileEP } from "integration/endpoints/seller";
import { useEffect, useState } from "react";

export default function ContentList() {
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    getProfileEP().then((res) => setProfile(res));
  }, []);

  if (!profile) return null;
  const { fullname, email, phone, line1, line2, postcode, avatar, id } =
    profile;
  return (
    <Formik
      initialValues={{
        id,
        fullname,
        email,
        phone,
        line1,
        line2,
        postcode,
      }}
      validationSchema={yup.object().shape({
        fullname: yup.string().required(),
        email: yup.string().email(),
        phone: yup.string(),
        line1: yup.string(),
        line2: yup.string(),
        postcode: yup.string(),
      })}
      onSubmit={async (values, { setSubmitting, setStatus, resetForm }) => {
        setSubmitting(true);
        await updateProfileEP({
          ...values,
          id,
        });

        const newProfile = await getProfileEP();
        setProfile(newProfile);
        setSubmitting(false);
        resetForm({});
        setStatus({ success: true });
      }}
    >
      {(props) => {
        const {
          values,
          //touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleSubmit,
        } = props;
        return (
          <form onSubmit={handleSubmit}>
            <table id="dataform">
              <tbody>
                <tr>
                  <td>
                    <label>Full name: &nbsp;</label>
                  </td>
                  <td>
                    <fieldset>
                      <input
                        type="text"
                        name="fullname"
                        id="fullname"
                        placeholder="Full name"
                        fullname="* Full name"
                        required="required"
                        value={values.fullname}
                        onChange={handleChange}
                      />
                    </fieldset>
                    <span data-id="error">{errors.fullname}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Email: &nbsp;</label>
                  </td>
                  <td>
                    <fieldset>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        placeholder="Email"
                        fullname="* Email"
                        value={values.email}
                        onChange={handleChange}
                      />
                    </fieldset>
                    <span data-id="error">{errors.email}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Phone: &nbsp;</label>
                  </td>
                  <td>
                    <fieldset>
                      <input
                        type="text"
                        name="phone"
                        id="phone"
                        placeholder="Phone"
                        fullname="* Phone"
                        value={values.phone}
                        onChange={handleChange}
                      />
                    </fieldset>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Line1: &nbsp;</label>
                  </td>
                  <td>
                    <fieldset>
                      <input
                        type="text"
                        name="line1"
                        id="line1"
                        placeholder="Line1"
                        title="* Line1"
                        value={values.line1}
                        onChange={handleChange}
                      />
                    </fieldset>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Line2: &nbsp;</label>
                  </td>
                  <td>
                    <fieldset>
                      <input
                        type="text"
                        name="line2"
                        id="line2"
                        placeholder="Line2"
                        title="* Line2"
                        value={values.line2}
                        onChange={handleChange}
                      />
                    </fieldset>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Postcode: &nbsp;</label>
                  </td>
                  <td>
                    <fieldset>
                      <input
                        type="text"
                        name="postcode"
                        id="postcode"
                        placeholder="Postcode"
                        title="* Postcode"
                        value={values.postcode}
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
  );
}
