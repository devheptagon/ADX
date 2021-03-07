const { MongoClient } = require('mongodb');
const url = 'mongodb://' + process.env.MONGO_USERNAME + ':' + encodeURIComponent(process.env.MONGO_PASSWORD) + '@' + process.env.MONGO_HOSTNAME + ':' + process.env.MONGO_PORT + '?authSource=admin';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const database = "advertisement";
const collectionUser = "user";
const collectionCustomer = "customer";
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

exports.register = function (req, res) {

  const newuser = req.body.newUser;
  if (newuser === true) {

    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (error, client) {

      if (error) throw error;

      const db = client.db(database);

      db.collection(collectionUserID).find().limit(1).project({ _id: 0 }).sort({ "ID": -1 }).toArray(function (error, result) {

        if (error) throw error;
        console.log(result)

        db.collection(collectionUserID).insertOne({ "ID": result[0]["ID"] + 1 }, function (err, result) {

          if (err) throw err;

          client.close();
          console.log(result);

          return res.status(201).json({ status: 201, data: JSON.parse(result).ops[0]["ID"] });
        });

      });

    });

  } else {

    return res.status(400).json({
      status: 400,
      message: "Missing parameter."
    });

  }

}

exports.login = function (req, res) {

  const { email, password } = req.body;
  console.log("req body", req.body);

  let filterquery = new Object();

  email ? filterquery.email = email : null;
  // username ? filterquery.username = username : null;
  // userID ? filterquery.userID = userID : null;
  // customerID ? filterquery.customerID = customerID : null;
  // phone ? filterquery.phone = phone : null;
  // password ? filterquery.password = password : null;

  if (email && password) {


  } else {
    return res.status(400).json({
      status: 400,
      message: "Missing parameter."
    });
  }
}