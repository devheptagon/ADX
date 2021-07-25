import { updateAdvertsEP, addAdvertsEP } from "integration/endpoints/advert";
import { Formik } from "formik";
import RichText from "components/richtext";
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
import SellerParams from "./sub/form/params/seller-params";
import StatusParams from "./sub/form/params/status-params";
import CityParams from "./sub/form/params/city-params";
import TenureParams from "./sub/form/params/tenure-params";
import SectorParams from "./sub/form/params/sector-params";
import TagParams from "./sub/form/params/tag-params";

export default function AdvertForm(props) {
  const { sellerOptions, selectedSellers, selectSeller } = SellerParams(props);
  const { statusOptions, selectedStatutes, selectStatus } = StatusParams(props);
  const { cityOptions, selectedCities, selectCity } = CityParams(props);
  const { tenureOptions, selectedTenures, selectTenures } = TenureParams(props);
  const { sectorOptions, selectedSectors, selectSector } = SectorParams(props);
  const { tagOptions, selectedTags, selectTag } = TagParams(props);

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
