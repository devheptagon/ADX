import { updateAdvertsEP, addAdvertsEP } from "integration/endpoints/advert";
import { Formik } from "formik";
import * as yup from "yup";
import MultiSelect from "react-multi-select-component";
import { useSelector } from "react-redux";
import { useState } from "react";
import statuses from "../../data/status.json";
import tenures from "../../data/tenure.json";

export default function AdvertForm(props) {
  const sellers = useSelector((state) => state.appReducer.sellers);
  const sellerOptions = sellers?.map((s) => ({
    label: s.fullname,
    value: s.id,
  }));

  const [selectedSellers, setSelectedSellers] = useState(
    props.item?.seller_id
      ? [sellerOptions.find((s) => s.value === props.item.seller_id)]
      : []
  );

  const selectSeller = (selection) => {
    setSelectedSellers(
      selection.length ? [selection[selection.length - 1]] : [] //disables multi selection
    );
  };

  const statusOptions = statuses?.map((s) => ({
    label: s,
    value: s,
  }));

  const [selectedStatutes, setSelectedStatutes] = useState([]);

  const selectStatus = (selection) => {
    setSelectedStatutes(
      selection.length ? [selection[selection.length - 1]] : [] //disables multi selection
    );
  };

  const tenureOptions = tenures?.map((s) => ({
    label: s,
    value: s,
  }));

  const [selectedTenures, setSelectedTenures] = useState([]);

  const selectTenures = (selection) => {
    setSelectedTenures(selection);
  };

  const cancel = () => {
    props.onClose(false);
  };

  return (
    <Formik
      initialValues={{
        seller_id: props.item.seller_id,
        title: props.item.title,
        freeHoldPrice: props.item.freeHoldPrice,
        leaseHoldPrice: props.item.leaseHoldPrice,
        weeklyProfit: props.item.weeklyProfit,
        monthlyProfit: props.item.monthlyProfit,
        annualProfit: props.item.annualProfit,
        weeklyTurnover: props.item.weeklyTurnover,
        monthlyTurnover: props.item.monthlyTurnover,
        annualTurnover: props.item.annualTurnover,
        line1: props.item.line1,
        line2: props.item.line2,
        city: props.item.city,
        postcode: props.item.postcode,
        description: props.item.description,
        status: props.item.status,
        tenures: [],
      }}
      validationSchema={yup.object().shape({
        title: yup.string().required(),
        seller_id: yup.string().required("Seller is required field"),
        status: yup.array(),
        tenures: yup.array(),
        freeHoldPrice: yup.number(),
        leaseHoldPrice: yup.number(),
        weeklyProfit: yup.number(),
        monthlyProfit: yup.number(),
        annualProfit: yup.number(),
        weeklyTurnover: yup.number(),
        monthlyTurnover: yup.number(),
        annualTurnover: yup.number(),
      })}
      onSubmit={async (values, { setSubmitting, setStatus, resetForm }) => {
        setSubmitting(true);
        if (props.item.id) {
          await updateAdvertsEP({ id: props.item.id, title: values.title });
        } else {
          await addAdvertsEP({ id: props.item.id, title: values.title });
        }

        setSubmitting(false);
        setStatus({ success: true });
        props.onClose(true);
      }}
    >
      {({
        values,
        errors,
        dirty,
        isSubmitting,
        handleChange,
        handleSubmit,
      }) => {
        return (
          <form onSubmit={handleSubmit}>
            <table id="dataform" border="1">
              <tbody>
                <tr>
                  <td>
                    <label>Seller: &nbsp;</label>
                  </td>
                  <td colSpan={3}>
                    <fieldset>
                      <MultiSelect
                        options={sellerOptions}
                        value={selectedSellers}
                        labelledBy="Select Seller"
                        hasSelectAll={false}
                        onChange={(selection) => {
                          selectSeller(selection);
                          handleChange({
                            target: {
                              name: "seller_id",
                              value: selection.length ? selection[0].value : "",
                            },
                          });
                        }}
                      />
                    </fieldset>
                    <span data-id="error">{errors.seller_id}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Title: &nbsp;</label>
                  </td>
                  <td colSpan={3}>
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
                    <span data-id="error">{errors.title}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Status: &nbsp;</label>
                  </td>
                  <td>
                    <fieldset>
                      <MultiSelect
                        options={statusOptions}
                        value={selectedStatutes}
                        labelledBy="Select Status"
                        hasSelectAll={false}
                        onChange={(selection) => {
                          selectStatus(selection);
                          handleChange({
                            target: {
                              name: "status",
                              value: selection.length
                                ? selection.map((s) => s.value)
                                : [],
                            },
                          });
                        }}
                      />
                    </fieldset>
                  </td>
                  <td>
                    <label>Tenures: &nbsp;</label>
                  </td>
                  <td>
                    <fieldset>
                      <MultiSelect
                        options={tenureOptions}
                        value={selectedTenures}
                        labelledBy="Select Tenures"
                        hasSelectAll={false}
                        onChange={(selection) => {
                          selectTenures(selection);
                          handleChange({
                            target: {
                              name: "tenures",
                              value: selection.length
                                ? selection.map((s) => s.value)
                                : [],
                            },
                          });
                        }}
                      />
                    </fieldset>
                  </td>
                </tr>
                <tr>
                  <td colSpan={4}>
                    <h4>FINANCIAL DETAILS</h4>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Leasehold Price: &nbsp;</label>
                  </td>
                  <td>
                    <fieldset>
                      £
                      <input
                        type="number"
                        name="leaseHoldPrice"
                        id="leaseHoldPrice"
                        placeholder="Leasehold price"
                        title="* Leasehold price"
                        value={values.leaseHoldPrice}
                        onChange={handleChange}
                        min={0}
                      />
                    </fieldset>
                  </td>
                  <td>
                    <label>Freehold Price: &nbsp;</label>
                  </td>
                  <td>
                    <fieldset>
                      £
                      <input
                        type="number"
                        name="freeHoldPrice"
                        id="freeHoldPrice"
                        placeholder="FreeHold price"
                        title="* FreeHold price"
                        value={values.freeHoldPrice}
                        onChange={handleChange}
                        min={0}
                      />
                    </fieldset>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Weekly profit: &nbsp;</label>
                  </td>
                  <td>
                    <fieldset>
                      £
                      <input
                        type="number"
                        name="weeklyProfit"
                        id="weeklyProfit"
                        placeholder="Weekly profit"
                        title="* Weekly profit"
                        value={values.weeklyProfit}
                        onChange={handleChange}
                        min={0}
                      />
                    </fieldset>
                  </td>
                  <td>
                    <label>Weekly turnover: &nbsp;</label>
                  </td>
                  <td>
                    <fieldset>
                      £
                      <input
                        type="number"
                        name="weeklyTurnover"
                        id="weeklyTurnover"
                        placeholder="Weekly turnover"
                        title="* Weekly turnover"
                        value={values.weeklyTurnover}
                        onChange={handleChange}
                        min={0}
                      />
                    </fieldset>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Monthly profit: &nbsp;</label>
                  </td>
                  <td>
                    <fieldset>
                      £
                      <input
                        type="number"
                        name="monthlyProfit"
                        id="monthlyProfit"
                        placeholder="Monthly profit"
                        title="* Monthly profit"
                        value={values.monthlyProfit}
                        onChange={handleChange}
                        min={0}
                      />
                    </fieldset>
                  </td>
                  <td>
                    <label>Monthly turnover: &nbsp;</label>
                  </td>
                  <td>
                    <fieldset>
                      £
                      <input
                        type="number"
                        name="monthlyTurnover"
                        id="monthlyTurnover"
                        placeholder="Monthly turnover"
                        title="* Monthly turnover"
                        value={values.monthlyTurnover}
                        onChange={handleChange}
                        min={0}
                      />
                    </fieldset>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Annual profit: &nbsp;</label>
                  </td>
                  <td>
                    <fieldset>
                      £
                      <input
                        type="number"
                        name="annualProfit"
                        id="annualProfit"
                        placeholder="Annual profit"
                        title="* Annual profit"
                        value={values.annualProfit}
                        onChange={handleChange}
                        min={0}
                      />
                    </fieldset>
                  </td>
                  <td>
                    <label>Annual turnover: &nbsp;</label>
                  </td>
                  <td>
                    <fieldset>
                      £
                      <input
                        type="number"
                        name="annualTurnover"
                        id="annualTurnover"
                        placeholder="Annual turnover"
                        title="* Annual turnover"
                        value={values.annualTurnover}
                        onChange={handleChange}
                        min={0}
                      />
                    </fieldset>
                  </td>
                </tr>
                <tr>
                  <td colSpan={4}>
                    <h4>ADDRESS DETAILS</h4>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Line1: &nbsp;</label>
                  </td>
                  <td>
                    <fieldset>
                      £
                      <input
                        type="number"
                        name="line1"
                        id="line1"
                        placeholder="Line1"
                        title="* Line1"
                        value={values.line1}
                        onChange={handleChange}
                        min={0}
                      />
                    </fieldset>
                  </td>
                  <td>
                    <label>Line2: &nbsp;</label>
                  </td>
                  <td>
                    <fieldset>
                      £
                      <input
                        type="number"
                        name="line2"
                        id="line2"
                        placeholder="Line2"
                        title="* Line2"
                        value={values.line2}
                        onChange={handleChange}
                        min={0}
                      />
                    </fieldset>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>City: &nbsp;</label>
                  </td>
                  <td>
                    <fieldset>
                      <input
                        type="text"
                        name="city"
                        id="city"
                        placeholder="City"
                        title="* City"
                        value={values.city}
                        onChange={handleChange}
                      />
                    </fieldset>
                  </td>
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
                  <td colSpan={4}>
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
                <tr>
                  <td colSpan={4}>
                    <button data-id="cancel" onClick={cancel}>
                      Cancel
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
