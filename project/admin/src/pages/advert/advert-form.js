import { updateAdvertsEP, addAdvertsEP } from "integration/endpoints/advert";
import { Formik } from "formik";
import * as yup from "yup";
import MultiSelect from "react-multi-select-component";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function AdvertForm(props) {
  const sellers = useSelector((state) => state.appReducer.sellers);
  const sellerOptions = sellers?.map((s) => ({
    label: s.fullname,
    value: s.id,
  }));

  const [selectedSellers, setSelectedSellers] = useState([]);

  const selectSeller = (selection) => {
    setSelectedSellers(selection);
  };

  const cancel = () => {
    props.onClose(false);
  };

  return (
    <Formik
      initialValues={{
        seller_id: props.item.seller_id,
        status: props.item.status,
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
      }}
      validationSchema={yup.object().shape({
        title: yup.string().required(),
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
                    <label htmlFor="Title">Seller: &nbsp;</label>
                  </td>
                  <td>
                    <fieldset>
                      <MultiSelect
                        options={sellerOptions}
                        value={selectedSellers}
                        labelledBy="Select Seller"
                        hasSelectAll={false}
                        onChange={selectSeller}
                      />
                    </fieldset>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="Title">Title: &nbsp;</label>
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
