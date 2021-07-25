import * as yup from "yup";

export default yup.object().shape({
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
});
