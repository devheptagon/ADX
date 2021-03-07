const customerModel = {
  customerID: Number,
  firstName: String,
  lastName: String,
  userName: String,
  password: String,
  email: String,
  phone: String,
  address: Object,
  role: String,//Basic or Premium
  package: {
    id: Number,
    time: String,
    buyDate: String,
    endDate: String,
    price: String,
    sellPrice: String,
    receivedPrice: String,
  },
  isOnline: Boolean,
  lastLoginTime: String,
  lastLogoutTime: String,
  updatedTime: String,
  createdTime: String
};

module.exports = customerModel