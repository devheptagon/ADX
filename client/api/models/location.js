/**
 * location request order
 * @param {string} town
 * @param {string} county
 * @param {string} postcode
 */
const locationModel = {
  postcode: String,
  easting: String,
  northing: String,
  latitude: String,
  longitude: String,
  city: String,
  county: String,
  country_code: String,
  country_name: String,
  iso3166_2: String,
  region_code: String,
  region_name: String
};

module.exports = locationModel