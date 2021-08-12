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
import PhotosRow from "./sub/form/photos-row";
import yupSchema from "./sub/form/yup-schema";
import SellerParams from "./sub/form/params/seller-params";
import StatusParams from "./sub/form/params/status-params";
import CityParams from "./sub/form/params/city-params";
import TenureParams from "./sub/form/params/tenure-params";
import SectorParams from "./sub/form/params/sector-params";
import TagParams from "./sub/form/params/tag-params";
import { useSelector } from "react-redux";

export default function AdvertForm(props) {
  const userId = useSelector((state) => state.appReducer.id);
  const userRole = useSelector((state) => state.appReducer.role);
  const isSeller = userRole === "seller";
  const isAdmin = userRole === "admin";
  const item = props.item || {};
  if (isSeller) item.seller_id = userId;

  const { sellerOptions, selectedSellers, selectSeller } = SellerParams(item);
  const { statusOptions, selectedStatutes, selectStatus } = StatusParams(item);
  const { cityOptions, selectedCities, selectCity } = CityParams(item);
  const { tenureOptions, selectedTenures, selectTenures } = TenureParams(item);
  const { sectorOptions, selectedSectors, selectSector } = SectorParams(item);
  const { tagOptions, selectedTags, selectTag } = TagParams(item);

  const cancel = () => {
    props.onClose(false);
  };

  const submit = async (values, { setSubmitting, setStatus, resetForm }) => {
    setSubmitting(true);
    if (item.id) {
      await updateAdvertsEP({ id: item.id, ...values });
    } else {
      await addAdvertsEP({ ...values });
    }
    setSubmitting(false);
    setStatus({ success: true });
    props.onClose(true);
  };

  return (
    <Formik
      initialValues={{ ...item }}
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
                {isAdmin && (
                  <SellerRow
                    {...{
                      sellerOptions,
                      selectedSellers,
                      selectSeller,
                      handleChange,
                      errors,
                    }}
                  />
                )}

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
                <PhotosRow
                  {...{
                    item,
                    handleChange,
                  }}
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
