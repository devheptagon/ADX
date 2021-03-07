const userModel = {
  userID: Number,
  firstName: String,
  lastName: String,
  userName: String,
  password: String,
  email: String,
  phone: String,
  role: String,//Admin or Editor
  isOnline: Boolean,
  lastLoginTime: String,
  lastLogoutTime: String,
  updatedTime: String,
  createdTime: String
};

module.exports = userModel