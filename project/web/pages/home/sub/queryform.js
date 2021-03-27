import styles from "styles/home.module.scss";
import { Formik, dis } from "formik";
import * as yup from "yup";

export default function QueryForm() {
  return (
    <div className={styles.queryform}>
      <h2>Real Estate Inquiry Form</h2>
      <h3>
        You can get help from us by filling out the Linxbiz Real Estate Request
        Form
      </h3>
      <Formik
        initialValues={{
          enquiry_type: "",
          user_type: "",
          first_name: "",
          last_name: "",
          email: "",
          city: "",
          zipcode: "",
          property_type: "",
          price: "",
          area_size: "",
          gdpr_agreement: "",
        }}
        validationSchema={yup.object().shape({
          email: yup.string().email().required,
          enquiry_type: yup.string(),
          user_type: yup.string(),
          first_name: yup.string().required,
          last_name: yup.string().required,
          city: yup.string(),
          zipcode: yup.string(),
          property_type: yup.string(),
          price: yup.number(),
          area_size: yup.number(),
          gdpr_agreement: yup.bool,
        })}
        onSubmit={async (values) => {
          await new Promise((resolve) => setTimeout(resolve, 500));
          console.log(JSON.stringify(values, null, 2));
        }}
      >
        {(props) => {
          const {
            values,
            touched,
            errors,
            dirty,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
            handleReset,
          } = props;
          return (
            <form method="post" name="New Form">
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
                      <option value="Miss"> Miss</option>
                      <option value="Evaluation"> Evaluation</option>
                      <option value="Mortgage"> Mortgage </option>
                    </select>
                  </div>
                </fieldset>

                <fieldset>
                  <label>Information</label>
                  <div>
                    <select
                      name="user_type"
                      id="user_type"
                      required="required"
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
                    <label>Location</label>
                    <select
                      name="city"
                      id="city"
                      required="required"
                      title="* Location"
                      value={values.city}
                      onChange={handleChange}
                    >
                      <option value="">Select</option>
                      <option
                        data-ref="birmingham"
                        data-belong="california"
                        value="birmingham"
                      >
                        Birmingham
                      </option>
                      <option
                        data-ref="bolsover"
                        data-belong=""
                        value="bolsover"
                      >
                        Bolsover
                      </option>
                      <option
                        data-ref="bradford"
                        data-belong=""
                        value="bradford"
                      >
                        Bradford
                      </option>
                      <option
                        data-ref="cambridge‎"
                        data-belong=""
                        value="cambridge‎"
                      >
                        Cambridge‎
                      </option>
                      <option data-ref="cardiff" data-belong="" value="cardiff">
                        Cardiff
                      </option>
                      <option
                        data-ref="edinburgh"
                        data-belong="california"
                        value="edinburgh"
                      >
                        Edinburgh
                      </option>
                      <option
                        data-ref="glasgow"
                        data-belong="california"
                        value="glasgow"
                      >
                        Glasgow
                      </option>
                      <option
                        data-ref="lambeth"
                        data-belong="greater-london"
                        value="lambeth"
                      >
                        Lambeth
                      </option>
                      <option
                        data-ref="liverpool"
                        data-belong=""
                        value="liverpool"
                      >
                        Liverpool
                      </option>
                      <option data-ref="london" data-belong="" value="london">
                        London
                      </option>
                      <option
                        data-ref="manchester"
                        data-belong=""
                        value="manchester"
                      >
                        Manchester
                      </option>
                      <option
                        data-ref="newcastle"
                        data-belong="california"
                        value="newcastle"
                      >
                        Newcastle
                      </option>
                      <option
                        data-ref="plymouth"
                        data-belong=""
                        value="plymouth"
                      >
                        Plymouth
                      </option>
                      <option
                        data-ref="southampton"
                        data-belong=""
                        value="southampton"
                      >
                        Southampton
                      </option>
                      <option
                        data-ref="stratford"
                        data-belong="greater-london"
                        value="stratford"
                      >
                        Stratford
                      </option>
                      <option
                        data-ref="sunderland"
                        data-belong=""
                        value="sunderland"
                      >
                        Sunderland
                      </option>
                      <option
                        data-ref="wembley"
                        data-belong="greater-london"
                        value="wembley"
                      >
                        Wembley
                      </option>
                    </select>
                  </fieldset>

                  <fieldset>
                    <label>&nbsp;</label>
                    <input
                      type="text"
                      name="zipcode"
                      id="zipcode"
                      placeholder="Zip Code"
                      title="* Zip Code"
                      required="required"
                      value={values.zipcode}
                      onChange={handleChange}
                    />
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
                    <option value="beauty-salons"> Beauty Salons</option>
                    <option value="commercial"> Commercial</option>
                    <option value="office">- Office</option>
                    <option value="shop">- Shop</option>
                    <option value="restaurants-and-cafes">
                      Restaurants &amp; Cafes
                    </option>
                    <option value="cafes">- Cafes</option>
                    <option value="fast-food-restaurants">
                      - Fast Food Restaurants
                    </option>
                    <option value="restaurants">- Restaurants</option>
                    <option value="sweetshops">- Sweet Shops</option>
                  </select>
                </fieldset>

                <div className={styles.row}>
                  <fieldset>
                    <input
                      type="number"
                      name="price"
                      id="price"
                      placeholder="Max price"
                      title="* Max price"
                      required="required"
                      value={values.price}
                      onChange={handleChange}
                    />
                  </fieldset>

                  <fieldset>
                    <input
                      type="number"
                      name="area_size"
                      id="area_size"
                      placeholder="Minimum size (Sq Ft)"
                      title="* Minimum size (Sq Ft)"
                      required="required"
                      value={values.area_size}
                      onChange={handleChange}
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
                  <button type="submit" disabled={isSubmitting}>
                    Submit
                  </button>
                </div>
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
}
