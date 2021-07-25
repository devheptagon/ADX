import { updateAdvertsEP, addAdvertsEP } from "integration/endpoints/advert";
import { Formik } from "formik";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { useState } from "react";
import RichText from "components/richtext";
import statuses from "../../data/status.json";
import tenures from "../../data/tenure.json";
import cities from "../../data/city.json";
import SellerRow from "./sub/form/seller-row";
import TitleRow from "./sub/form/title-row";
import StatusAndTenuresRow from "./sub/form/status-and-tenures-row";
import LeaseholdAndFreeholdRow from "./sub/form/leasehold-and-freehold-row";
import WeeklyRow from "./sub/form/weekly-row";
import MonthlyRow from "./sub/form/monthly-row";
import AnnualRow from "./sub/form/annual-row";
import LinesRow from "./sub/form/lines-row";
import CityAndPostcodeRow from "./sub/form/city-and-postcode-row";
import SectorsRow from "./sub/form/sectors-row";
import TagsRow from "./sub/form/tags-row";
import FooterRow from "./sub/form/footer-row";
import yupSchema from "./sub/form/yup-schema";

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

  const submit = async (values, { setSubmitting, setStatus, resetForm }) => {
    setSubmitting(true);
    if (props.item.id) {
      await updateAdvertsEP({ id: props.item.id, title: values.title });
    } else {
      await addAdvertsEP({ id: props.item.id, title: values.title });
    }
    setSubmitting(false);
    setStatus({ success: true });
    props.onClose(true);
  };

  return (
    <Formik
      initialValues={{ ...props.item }}
      validationSchema={yupSchema}
      onSubmit={submit}
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
                <SellerRow
                  {...{
                    sellerOptions,
                    selectedSellers,
                    selectSeller,
                    handleChange,
                    errors,
                  }}
                />
                <TitleRow {...{ values, handleChange, errors }} />
                <StatusAndTenuresRow
                  {...{
                    handleChange,
                    statusOptions,
                    selectedStatutes,
                    selectStatus,
                    tenureOptions,
                    selectedTenures,
                    selectTenures,
                  }}
                />
                <tr>
                  <td colSpan={4}>
                    <h4>FINANCIAL DETAILS</h4>
                  </td>
                </tr>
                <LeaseholdAndFreeholdRow {...{ values, handleChange }} />
                <WeeklyRow {...{ values, handleChange }} />
                <MonthlyRow {...{ values, handleChange }} />
                <AnnualRow {...{ values, handleChange }} />
                <tr>
                  <td colSpan={4}>
                    <h4>ADDRESS DETAILS</h4>
                  </td>
                </tr>
                <LinesRow {...{ values, handleChange }} />
                <CityAndPostcodeRow
                  {...{
                    cityOptions,
                    selectedCities,
                    selectCity,
                    handleChange,
                    values,
                  }}
                />
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
                <SectorsRow
                  {...{
                    sectorOptions,
                    selectedSectors,
                    selectSector,
                    handleChange,
                  }}
                />
                <TagsRow
                  {...{ tagOptions, selectedTags, selectTag, handleChange }}
                />
              </tbody>
              <tfoot>
                <FooterRow {...{ isSubmitting, dirty, errors, cancel }} />
              </tfoot>
            </table>
          </form>
        );
      }}
    </Formik>
  );
}
