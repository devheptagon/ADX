import { updateAdvertsEP, addAdvertsEP } from "integration/endpoints/advert";
import { Formik } from "formik";
import * as yup from "yup";
import MultiSelect from "react-multi-select-component";
import { useSelector } from "react-redux";
import { useState } from "react";
import RichText from "components/richtext";
import statuses from "../../data/status.json";
import tenures from "../../data/tenure.json";
import cities from "../../data/city.json";

export default function AdvertForm(props) {
  /** SELLER BEGIN */
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

  /** STATUS BEGIN */

  const statusOptions = statuses?.map((s) => ({
    label: s,
    value: s,
  }));

  const [selectedStatutes, setSelectedStatutes] = useState(
    props.item?.status
      ? [statusOptions.find((s) => s.value === props.item.status)]
      : []
  );

  const selectStatus = (selection) => {
    setSelectedStatutes(
      selection.length ? [selection[selection.length - 1]] : [] //disables multi selection
    );
  };

  /** CITY BEGIN */

  const cityOptions = cities?.map((s) => ({
    label: s,
    value: s,
  }));

  const [selectedCities, setSelectedCities] = useState(
    props.item?.city
      ? [cityOptions.find((s) => s.value === props.item.city)]
      : []
  );

  const selectCity = (selection) => {
    setSelectedCities(
      selection.length ? [selection[selection.length - 1]] : [] //disables multi selection
    );
  };

  /** TENURES BEGIN */

  const tenureOptions = tenures?.map((s) => ({
    label: s,
    value: s,
  }));

  const [selectedTenures, setSelectedTenures] = useState(
    props.item?.tenures
      ? tenureOptions.filter((s) =>
          props.item.tenures.split(",").includes(s.value)
        )
      : []
  );

  const selectTenures = (selection) => {
    setSelectedTenures(selection);
  };

  /** SECTORS BEGIN */

  const sectors = useSelector((state) => state.appReducer.sectors);
  const sectorOptions = sectors?.map((s) => ({
    label: s.title,
    value: s.id,
  }));

  const [selectedSectors, setSelectedSectors] = useState(
    props.item?.sectors
      ? sectorOptions.filter((s) =>
          props.item.sectors.split(",").includes(s.label)
        )
      : []
  );

  const selectSector = (selection) => {
    setSelectedSectors(selection);
  };

  /** TAGS BEGIN */

  const tags = useSelector((state) => state.appReducer.tags);
  const tagOptions = tags?.map((s) => ({
    label: s.title,
    value: s.id,
  }));

  const [selectedTags, setSelectedTags] = useState(
    props.item?.tags
      ? tagOptions.filter((s) => props.item.tags.split(",").includes(s.label))
      : []
  );

  const selectTag = (selection) => {
    setSelectedTags(selection);
  };

  /** SHARED */
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
        sectors: props.item.sectors,
        status: props.item.status,
        tenures: props.item.tenures,
        tags: props.item.tags,
      }}
      validationSchema={yup.object().shape({
        title: yup.string().required(),
        seller_id: yup.string().required("Seller is required field"),
        freeHoldPrice: yup.number(),
        leaseHoldPrice: yup.number(),
        weeklyProfit: yup.number(),
        monthlyProfit: yup.number(),
        annualProfit: yup.number(),
        weeklyTurnover: yup.number(),
        monthlyTurnover: yup.number(),
        annualTurnover: yup.number(),
        line1: yup.string(),
        line2: yup.string(),
        city: yup.string(),
        postcode: yup.string(),
        description: yup.string(),
        sectors: yup.string(),
        status: yup.string(),
        tenures: yup.string(),
        tags: yup.string(),
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
            <table id="dataform" border="0">
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
                              value: selection.length
                                ? selection[selection.length - 1].value
                                : "",
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
                                ? selection[selection.length - 1].value
                                : "",
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
                              value: selection.map((s) => s.value).join(","),
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
                    <label>City: &nbsp;</label>
                  </td>
                  <td>
                    <fieldset>
                      <MultiSelect
                        options={cityOptions}
                        value={selectedCities}
                        labelledBy="Select City"
                        hasSelectAll={false}
                        onChange={(selection) => {
                          selectCity(selection);
                          handleChange({
                            target: {
                              name: "city",
                              value: selection.length
                                ? selection[selection.length - 1].value
                                : "",
                            },
                          });
                        }}
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
                <tr>
                  <td colSpan={4}>
                    <h6>Description</h6>
                    <RichText
                      field="description"
                      initialValue={values.description}
                      handleChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Sectors: &nbsp;</label>
                  </td>
                  <td colSpan={3}>
                    <fieldset>
                      <MultiSelect
                        options={sectorOptions}
                        value={selectedSectors}
                        labelledBy="Select Sector"
                        hasSelectAll={false}
                        onChange={(selection) => {
                          selectSector(selection);
                          handleChange({
                            target: {
                              name: "sectors",
                              value: selection.map((s) => s.value).join(","),
                            },
                          });
                        }}
                      />
                    </fieldset>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Tags: &nbsp;</label>
                  </td>
                  <td colSpan={3}>
                    <fieldset>
                      <MultiSelect
                        options={tagOptions}
                        value={selectedTags}
                        labelledBy="Select Tag"
                        hasSelectAll={false}
                        onChange={(selection) => {
                          selectTag(selection);
                          handleChange({
                            target: {
                              name: "tags",
                              value: selection.map((s) => s.value).join(","),
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
