/**
 * @param {*} title
 * @param {*} contactNumber
 * @param {*} businessCategory
 * @param {*} tenure
 */
const advertModel = {
  advertID: Number,
  title: String, // 1. Step
  tenure: String, // 2. Step [Freehold, Leasehold, Freehold & Leasehold, Other]
  freeHoldPrice: String, // 2. Step [Asking Price, Price On Application, Not Applicable]
  leaseHoldPrice: String, // 2. Step [Asking Price, Annual Rent, Price On Application, Not Applicable]
  priceGuide: String, // 2. Step [Open To Offers, Price is Negotiable, On Nearest Offer]
  annualNetProfit: String, // 2. Step [Profit, Available On Request, Not Applicable]
  annualTurnover: String, // 2. Step [Turnover, Available, Not Applicable]
  location: String, // 3. Step [This]
  locationAccommodation: String,
  businessCategory: String, // 1. Step
  sectors: String,
  moreTags: String,
  website: String,
  socialMedia: String,
  reviews: String,
  comRegNo: String,
  media: String,
  description: String,
  status: String,
  adID: String,
  agentID: String,
  agentUser: String,
  updatedTime: String,
  createdTime: String
};

module.exports = advertModel