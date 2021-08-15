import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getProfileEP, updateProfileEP } from "integration/endpoints/user";
import { setUserAction } from "redux/app/appActions";
import styles from "styles/app.module.scss";
import { apiUrl } from "config";
import { useState } from "react";
import { uploadEP } from "integration/endpoints/advert";
import { customAlert } from "utils/appHelper";

export default function ContentList() {
  const dispatch = useDispatch();
  const {
    fullname,
    email,
    phone,
    line1,
    line2,
    postcode,
    avatar,
    id,
    role,
    seller_until,
  } = useSelector((state) => state.appReducer);
  const [uploading, setUploading] = useState(false);

  const selectFile = async (e, handleChange) => {
    e.preventDefault();

    let file = e.target.files[0];
    let formData = new FormData();
    formData.append("file", file);
    setUploading(true);
    const response = await uploadEP(formData);
    setUploading(false);
    handleChange({
      target: {
        name: "avatar",
        value: response,
      },
    });
  };

  const removePhoto = (e, handleChange) => {
    e.preventDefault();
    handleChange({
      target: {
        name: "avatar",
        value: "",
      },
    });
  };

  const [useExistingPassword, setUseExistingPassword] = useState(true);
  const toggleUseExistingPassword = (e) => {
    setUseExistingPassword(!useExistingPassword);
  };

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
        avatar,
        password: "",
        password2: "",
      }}
      validationSchema={yup.object().shape({
        fullname: yup.string().required(),
        email: yup.string().email(),
        phone: yup.string(),
        line1: yup.string(),
        line2: yup.string(),
        postcode: yup.string(),
        avatar: yup.string(),
        password: yup.string(),
        password2: yup.string(),
      })}
      onSubmit={async (values, { setSubmitting, setStatus, resetForm }) => {
        setSubmitting(true);
        if (
          values.password &&
          (values.password.length < 5 || values.password !== values.password2)
        ) {
          customAlert("Check your passwords");
          return;
        }
        await updateProfileEP({
          ...values,
          id,
        });
        const newProfile = await getProfileEP(id);
        dispatch(setUserAction(newProfile));
        setSubmitting(false);
        setStatus({ success: true });
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
                  <td colSpan={2} align="center">
                    <div className={styles.avatar}>
                      <div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => selectFile(e, handleChange)}
                          disabled={uploading}
                          className="btn btn-info"
                        />
                        {uploading && <h6>Uploading image, please wait...</h6>}
                        <br />
                        <br />
                      </div>
                      <img
                        alt="avatar"
                        src={apiUrl + "images/" + (values.avatar || "-")}
                      />
                    </div>
                    <br />
                    <a
                      href="#"
                      onClick={(e) => removePhoto(e, handleChange)}
                      className="btn btn-danger"
                    >
                      × delete
                    </a>
                  </td>
                </tr>
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
                        readOnly
                        className={styles.readOnly}
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
                <tr>
                  <td colSpan={2}>
                    <input
                      type="checkbox"
                      checked={useExistingPassword}
                      onChange={toggleUseExistingPassword}
                    />{" "}
                    I want to use my current password
                  </td>
                </tr>
                {!useExistingPassword && (
                  <>
                    <tr>
                      <td>
                        <label>New Password: &nbsp;</label>
                      </td>
                      <td>
                        <fieldset>
                          <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="New password"
                            title="* New password"
                            value={values.password}
                            onChange={handleChange}
                          />
                        </fieldset>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label>Retype New Password: &nbsp;</label>
                      </td>
                      <td>
                        <fieldset>
                          <input
                            type="password"
                            name="password2"
                            id="password2"
                            placeholder="Retype New password"
                            title="* Retype New password"
                            value={values.password2}
                            onChange={handleChange}
                          />
                        </fieldset>
                      </td>
                    </tr>
                  </>
                )}

                {role === "seller" && (
                  <tr>
                    <td colSpan={2}>
                      Subscription End Date:{" "}
                      {(seller_until || " ").split(" ")[0]}
                    </td>
                  </tr>
                )}
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
