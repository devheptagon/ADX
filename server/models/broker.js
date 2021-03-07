const brokerModel = {
  brokerID: Number,
  brokerEmail: String,
  brokerPassword: String,
  brokerFullName: String,
  brokerPhone: String,
  brokerAgents: Array,
  companyName: String,
  companyWebSite: String,
  companyPhone: String,
  companyEmail: String,
  companySocial: Object,
  companyAddress: Object,
  updatedTime: String,
  createdTime: String
};

module.exports = brokerModel