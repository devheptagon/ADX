import { Formik } from "formik";
import * as yup from "yup";

import {
  getContentsEP,
  updateContentsEP,
} from "integration/endpoints/contents";
import { useEffect, useState } from "react";
import RichText from "components/richtext";
import { customAlert } from "utils/appHelper";

export default function ContentList() {
  const [contents, setContents] = useState(null);
  useEffect(() => {
    getContentsEP().then((res) => setContents(res));
  }, []);

  if (!contents) return null;
  const {
    about,
    terms,
    address,
    phone,
    email,
    facebook,
    twitter,
    linkedin,
    instagram,
    youtube,
  } = contents;
  return (
    <Formik
      initialValues={{
        about,
        terms,
        address,
        phone,
        email,
        facebook,
        twitter,
        linkedin,
        instagram,
        youtube,
      }}
      validationSchema={yup.object().shape({
        about: yup.string(),
        terms: yup.string(),
        address: yup.string(),
        phone: yup.string(),
        email: yup.string().email(),
        facebook: yup.string().url(),
        twitter: yup.string().url(),
        linkedin: yup.string().url(),
        instagram: yup.string().url(),
        youtube: yup.string().url(),
      })}
      onSubmit={async (values, { setSubmitting, setStatus, resetForm }) => {
        setSubmitting(true);
        await updateContentsEP(values);
        setSubmitting(false);
        setStatus({ success: true });
        getContentsEP().then((res) => setContents(res));

        customAlert("Changes saved!");
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
                    <label htmlFor="Title">Address:</label>
                  </td>
                  <td>
                    <fieldset>
                      <input
                        type="text"
                        name="address"
                        id="address"
                        placeholder="address here..."
                        title="* address"
                        value={values.address}
                        onChange={handleChange}
                      />
                    </fieldset>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="Title">Phone:</label>
                  </td>
                  <td>
                    <fieldset>
                      <input
                        type="text"
                        name="phone"
                        id="phone"
                        placeholder="Phone here..."
                        title="* Phone"
                        value={values.phone}
                        onChange={handleChange}
                      />
                    </fieldset>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="Title">Email:</label>
                  </td>
                  <td>
                    <fieldset>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        placeholder="Email here..."
                        title="* Email"
                        value={values.email}
                        onChange={handleChange}
                      />
                    </fieldset>
                    <span data-id="error">{errors.email}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="Title">Facebook:</label>
                  </td>
                  <td>
                    <fieldset>
                      <input
                        type="text"
                        name="facebook"
                        id="facebook"
                        placeholder="Facebook here..."
                        title="* Facebook"
                        value={values.facebook}
                        onChange={handleChange}
                      />
                    </fieldset>
                    <span data-id="error">{errors.facebook}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="Title">Twitter:</label>
                  </td>
                  <td>
                    <fieldset>
                      <input
                        type="text"
                        name="twitter"
                        id="twitter"
                        placeholder="Twitter here..."
                        title="* Twitter"
                        value={values.twitter}
                        onChange={handleChange}
                      />
                    </fieldset>
                    <span data-id="error">{errors.twitter}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="Title">Linkedin:</label>
                  </td>
                  <td>
                    <fieldset>
                      <input
                        type="text"
                        name="linkedin"
                        id="linkedin"
                        placeholder="Linkedin here..."
                        title="* Linkedin"
                        value={values.linkedin}
                        onChange={handleChange}
                      />
                    </fieldset>
                    <span data-id="error">{errors.linkedin}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="Title">Instagram:</label>
                  </td>
                  <td>
                    <fieldset>
                      <input
                        type="text"
                        name="instagram"
                        id="instagram"
                        placeholder="Instagram here..."
                        title="* Instagram"
                        value={values.instagram}
                        onChange={handleChange}
                      />
                    </fieldset>
                    <span data-id="error">{errors.instagram}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="Title">Youtube:</label>
                  </td>
                  <td>
                    <fieldset>
                      <input
                        type="text"
                        name="youtube"
                        id="youtube"
                        placeholder="Youtube here..."
                        title="* Youtube"
                        value={values.youtube}
                        onChange={handleChange}
                      />
                    </fieldset>
                    <span data-id="error">{errors.youtube}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="Title">About Us:</label>
                  </td>
                  <td>
                    <fieldset>
                      <RichText
                        field="about"
                        initialValue={values.about}
                        handleChange={handleChange}
                      />
                    </fieldset>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="Title">Terms & Privacy:</label>
                  </td>
                  <td>
                    <fieldset>
                      <RichText
                        field="terms"
                        initialValue={values.terms}
                        handleChange={handleChange}
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
                      Save Changes
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
