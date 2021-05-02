import React from "react";
import styles from "styles/home.module.scss";
import { Formik, dis } from "formik";
import * as yup from "yup";
import { postEvaluationRequest } from "api/api";
import { useSelector } from "react-redux";

export default function QueryForm() {
  const sectors = useSelector((state) => state.appReducer.sectors);
  const areas = useSelector((state) => state.appReducer.areas);

  return (
    <div className={styles.queryform}>
      <h2>Real Estate Inquiry Form</h2>
      <h3>You can get help from us by filling out the form</h3>
      <Formik
        initialValues={{
          enquiry_type: "",
          user_type: "",
          first_name: "",
          last_name: "",
          email: "",
          location: "",
          property_type: "",
          price: "",
          area_size: "",
          gdpr_agreement: "",
        }}
        validationSchema={yup.object().shape({
          email: yup.string().email().required(),
          enquiry_type: yup.string().required(),
          user_type: yup.string().nullable().notRequired(),
          first_name: yup.string().required(),
          last_name: yup.string().required(),
          location: yup.string().nullable().notRequired(),
          property_type: yup.string().required(),
          price: yup.number().nullable().notRequired(),
          area_size: yup.number().nullable().notRequired(),
          gdpr_agreement: yup.bool().required(),
        })}
        onSubmit={async (values, { setSubmitting, setStatus, resetForm }) => {
          setSubmitting(true);
          await postEvaluationRequest(values);
          setSubmitting(false);
          resetForm({});
          setStatus({ success: true });
          alert("Request received, thanks");
          window.location.href = window.location.href;
          return false;
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
            //handleBlur,
            handleSubmit,
            //handleReset,
          } = props;
          return (
            <form onSubmit={handleSubmit}>
              <div>
                <fieldset>
                  <label>Business Type</label>
                  <div>
                    <select
                      name="enquiry_type"
                      id="enquiry_type"
                      required="required"
                      title="* Business Type"
                      value={values.enquiry_type}
                      onChange={handleChange}
                    >
                      <option value="">Select</option>
                      <option value="Purchase">Purchase</option>
                      <option value="Rent"> Rent</option>
                      <option value="Sell"> Sell</option>
                      <option value="Evaluation"> Evaluation</option>
                      <option value="Mortgage"> Mortgage </option>
                      <option value="Other"> Other </option>
                    </select>
                  </div>
                </fieldset>
                <fieldset>
                  <label>* Seller or Buyer (Optional)</label>
                  <div>
                    <select
                      name="user_type"
                      id="user_type"
                      title="* Information"
                      value={values.user_type}
                      onChange={handleChange}
                    >
                      <option value="">Seller or Buyer</option>
                      <option value="Seller">Seller</option>
                      <option value="Buyer">Buyer</option>
                    </select>
                  </div>
                </fieldset>
                <div className={styles.row}>
                  <fieldset>
                    <input
                      type="text"
                      name="first_name"
                      id="first_name"
                      placeholder="First Name"
                      title="* First Name"
                      required="required"
                      value={values.first_name}
                      onChange={handleChange}
                    />
                  </fieldset>

                  <fieldset>
                    <input
                      type="text"
                      name="last_name"
                      id="last_name"
                      placeholder="Last Name"
                      title="* Last Name"
                      value={values.last_name}
                      onChange={handleChange}
                    />
                  </fieldset>
                </div>
                <fieldset>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email Address"
                    title="* Email Address"
                    required="required"
                    value={values.email}
                    onChange={handleChange}
                  />
                </fieldset>
                <div className={styles.row}>
                  <fieldset>
                    <label>* Location (Optional)</label>
                    <select
                      name="location"
                      id="location"
                      title="* Location"
                      value={values.location}
                      onChange={handleChange}
                    >
                      <option value="">Select</option>
                      {areas.map(({ title }) => (
                        <option
                          key={title}
                          data-ref={title}
                          data-belong={title}
                          value={title}
                        >
                          {title}
                        </option>
                      ))}
                    </select>
                  </fieldset>
                </div>
                <fieldset>
                  <label>Business</label>
                  <select
                    name="property_type"
                    required="required"
                    title="* Business"
                    value={values.property_type}
                    onChange={handleChange}
                  >
                    <option value="">Select type</option>
                    {sectors.map(({ title }) => (
                      <option key={title} value={title}>
                        {" "}
                        {title}
                      </option>
                    ))}
                  </select>
                </fieldset>
                <div className={styles.row}>
                  <fieldset>
                    <label>* (Optional Max Price) (£)</label>
                    <input
                      type="number"
                      name="price"
                      id="price"
                      placeholder="Max price"
                      title="* Max price"
                      value={values.price}
                      onChange={handleChange}
                      min={0}
                    />
                  </fieldset>

                  <fieldset>
                    <label>* (Optional Min Size)</label>
                    <input
                      type="number"
                      name="area_size"
                      id="area_size"
                      placeholder="Minimum size (Sq Ft)"
                      title="* Minimum size (Sq Ft)"
                      value={values.area_size}
                      onChange={handleChange}
                      min={0}
                    />
                  </fieldset>
                </div>
                <fieldset>
                  <label htmlFor="gdpr_agreement">GDPR Agreement</label>
                  <br />
                  <input
                    required=""
                    type="checkbox"
                    title="* GDPR Agreement"
                    name="gdpr_agreement"
                    id="gdpr_agreement"
                    value={values.gdpr_agreement}
                    onChange={handleChange}
                  />
                  I consent to having this website store my submitted
                  information
                </fieldset>
                <br />
                <div>
                  <button
                    type="submit"
                    disabled={
                      isSubmitting || !dirty || Object.keys(errors).length
                    }
                  >
                    Submit
                  </button>
                </div>
                <br />
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
}
