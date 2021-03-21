import styles from "styles/home.module.scss";

export default function QueryForm() {
  return (
    <div className={styles.queryform}>
      <h2>Real Estate Inquiry Form</h2>
      <h3>
        You can get help from us by filling out the Linxbiz Real Estate Request
        Form
      </h3>
      <form
        method="post"
        name="New Form"
        action="https://linxbiz.com/wp-admin/admin-ajax.php"
      >
        <div>
          <fieldset>
            <label htmlFor="form-field-ba6c34c">Business Type</label>
            <div>
              <select
                name="enquiry_type"
                id="form-field-ba6c34c"
                required="required"
                title="* Business Type"
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
            <label htmlFor="form-field-b7fe77d">Information</label>
            <div>
              <select
                name="user_type"
                id="form-field-b7fe77d"
                required="required"
                title="* Information"
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
                id="form-field-cc6b92f"
                placeholder="First Name"
                title="* First Name"
                required="required"
              />
            </fieldset>

            <fieldset>
              <input
                type="text"
                name="last_name"
                id="form-field-3cc124e"
                placeholder="Last Name"
                title="* Last Name"
              />
            </fieldset>
          </div>

          <fieldset>
            <input
              type="email"
              name="email"
              id="form-field-932d82c"
              placeholder="Email Address"
              title="* Email Address"
              required="required"
            />
          </fieldset>

          <div className={styles.row}>
            <fieldset>
              <label htmlFor="form-field-2eaf20d">Location</label>
              <select
                name="e_meta[city]"
                id="form-field-2eaf20d"
                required="required"
                title="* Location"
              >
                <option value="">Select</option>
                <option
                  data-ref="birmingham"
                  data-belong="california"
                  value="birmingham"
                >
                  Birmingham
                </option>
                <option data-ref="bolsover" data-belong="" value="bolsover">
                  Bolsover
                </option>
                <option data-ref="bradford" data-belong="" value="bradford">
                  Bradford
                </option>
                <option data-ref="cambridge‎" data-belong="" value="cambridge‎">
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
                <option data-ref="liverpool" data-belong="" value="liverpool">
                  Liverpool
                </option>
                <option data-ref="london" data-belong="" value="london">
                  London
                </option>
                <option data-ref="manchester" data-belong="" value="manchester">
                  Manchester
                </option>
                <option
                  data-ref="newcastle"
                  data-belong="california"
                  value="newcastle"
                >
                  Newcastle
                </option>
                <option data-ref="plymouth" data-belong="" value="plymouth">
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
                <option data-ref="sunderland" data-belong="" value="sunderland">
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
              <label htmlFor="form-field-f0ee6fc">&nbsp;</label>
              <input
                type="text"
                name="e_meta[zipcode]"
                id="form-field-f0ee6fc"
                placeholder="Zip Code"
                title="* Zip Code"
                required="required"
              />
            </fieldset>
          </div>

          <fieldset>
            <label htmlFor="form-field-3180222">Business</label>
            <select
              name="e_meta[property_type]"
              id="form-field-3180222"
              required="required"
              title="* Business"
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
                name="e_meta[price]"
                id="form-field-c549d17"
                placeholder="Max price"
                title="* Max price"
                required="required"
              />
            </fieldset>

            <fieldset>
              <input
                type="number"
                name="e_meta[area-size]"
                id="form-field-e08cbcb"
                placeholder="Minimum size (Sq Ft)"
                title="* Minimum size (Sq Ft)"
                required="required"
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
            />
            I consent to having this website store my submitted information
          </fieldset>
          <br />
          <div>
            <button type="submit">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
}
