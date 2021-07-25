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
        county: props.item.county,
        region: props.item.region,
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
                    <label>Seller: &nbsp;</label>
                  </td>
                  <td>
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
                </tr>
                <tr>
                  <td>
                    <label>Title: &nbsp;</label>
                  </td>
                  <td>
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
                <tr>
                  <td colSpan={2}>
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
