const slug = require('../middleware/slug');
const { MongoClient, ObjectID } = require('mongodb');
const url = 'mongodb://' + process.env.MONGO_USERNAME + ':' + encodeURIComponent(process.env.MONGO_PASSWORD) + '@' + process.env.MONGO_HOSTNAME + ':' + process.env.MONGO_PORT + '?authSource=admin';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const database = "advertisement";
const collectionBroker = "broker";
const collectionBrokerID = "brokerID";
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

exports.brokerPost = function (req, res) {

  if (req.body.email && req.body.password) {

    MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }, function (errClient, client) {

      if (errClient) throw errClient;

      const db = client.db(database);

      db.collection(collectionBroker)
        .findOne({ email: req.body.email },
          function (errorFindEmail, resultFindEmail) {

            if (errorFindEmail) throw errorFindEmail;

            if (resultFindEmail === null) {

              db.collection(collectionBrokerID)
                .find()
                .limit(1)
                .project({ _id: 0 })
                .sort({ "ID": -1 })
                .toArray(function (error, resultID) {

                  if (error) throw error;

                  db.collection(collectionBrokerID)
                    .insertOne(
                      { "ID": resultID[0]["ID"] + 1 },
                      function (err, resID) {

                        if (err) throw err;

                        let object = new ObjectID();

                        const timestamp = object.getTimestamp();

                        if (err) throw err;

                        const broker = {
                          brokerID: parseFloat(JSON.parse(resID).ops[0]["ID"]),
                          email: req.body.email,
                          password: bcrypt.hashSync(req.body.password, 10),
                          fullName: req.body.fullName,
                          phone: req.body.phone,
                          company: {
                            name: req.body.company["name"],
                            webSite: req.body.company["webSite"],
                            phone: req.body.company["phone"],
                            email: req.body.company["email"],
                            social: {
                              facebook: req.body.company["social"]["facebook"],
                              linkedIn: req.body.company["social"]["linkedIn"],
                              twitter: req.body.company["social"]["twitter"]
                            },
                            address: {
                              line01: req.body.company["address"]["line01"],
                              line02: req.body.company["address"]["line02"],
                              city: req.body.company["address"]["city"],
                              county: req.body.company["address"]["county"],
                              regionName: req.body.company["address"]["regionName"],
                              postCode: req.body.company["address"]["postCode"]
                            }
                          },
                          agents: [],
                          adverts: [],
                          role: req.body.role,
                          package: {
                            id: req.body.package["id"],
                            lifeTime: req.body.package["lifeTime"],
                            buyDate: req.body.package["buyDate"],
                            endDate: req.body.package["endDate"],
                            price: req.body.package["price"],
                            sellPrice: req.body.package["sellPrice"],
                            receivedPrice: req.body.package["receivedPrice"],
                          },
                          isOnline: false,
                          lastLoginTime: null,
                          lastLogoutTime: null,
                          updatedTime: null,
                          createdTime: timestamp,
                        }

                        db.collection(collectionBroker).insertOne(broker, function (err, resResult) {

                          if (err) throw err;

                          client.close();
                          let resData = JSON.parse(resResult).ops[0];
                          let data = {
                            brokerID: resData.brokerID,
                            email: resData.email,
                            fullName: resData.fullName,
                            phone: resData.phone,
                            company: resData.company,
                            agents: resData.agents,
                            adverts: resData.adverts,
                            role: resData.role,
                            package: resData.package,
                            isOnline: resData.isOnline,
                            lastLoginTime: resData.lastLoginTime,
                            lastLogoutTime: resData.lastLogoutTime,
                            updatedTime: resData.updatedTime,
                            createdTime: resData.createdTime
                          }
                          console.log(data);
                          return res.status(201).json({ status: 201, data: data });
                        })


                      })

                });

            } else {
              return res.status(400).json({
                status: 400,
                message: "This email already exists"
              });
            }

          });
    });
  } else {
    return res.status(400).json({
      status: 400,
      message: "Email and Password required."
    });
  }
};

exports.brokerLogin = function (req, res) {

  if (req.body.email && req.body.password) {

    MongoClient.connect(
      url,
      { useNewUrlParser: true, useUnifiedTopology: true },
      function (error, client) {

        if (error) throw error;

        const db = client.db(database);

        db.collection(collectionBroker).findOne(
          { email: req.body.email },
          { projection: { _id: 0 } },
          function (err, result) {

            if (err) throw err;

            if (result !== null) {

              bcrypt.compare(
                req.body.password,
                result.password,
                function (err, resultcompare) {

                  if (err) throw err;

                  console.log("compare result", resultcompare);

                  if (resultcompare === true) {
                    const getToken = jwt.sign(
                      {
                        brokerID: result.brokerID,
                        email: result.email,
                        phone: result.phone,
                        role: result.role,
                        isOnline: true
                      },
                      accessTokenSecret,
                      { expiresIn: "30 days" }
                    );
                    return res.status(200).json({
                      status: 200,
                      data: {
                        "token": getToken,
                      }
                    });
                  } else {
                    return res.status(403).json({
                      status: 403,
                      message: "Unauthorized"
                    });
                  }

                });

            } else {
              return res.status(403).json({
                status: 403,
                message: "Unauthorized"
              });
            }

          });

      });

  } else {

    return res.status(403).json({
      status: 403,
      message: "Unauthorized"
    });

  }

}