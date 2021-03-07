const slug = require('../middleware/slug');
const { MongoClient, ObjectID } = require('mongodb');
const url = 'mongodb://' + process.env.MONGO_USERNAME + ':' + encodeURIComponent(process.env.MONGO_PASSWORD) + '@' + process.env.MONGO_HOSTNAME + ':' + process.env.MONGO_PORT + '?authSource=admin';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const database = "advertisement";
const collectionCustomer = "customer";
const collectionCustomerID = "customerID";
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

exports.createID = function (req, res) {

  const newcustomer = req.body.newCustomer;
  if (newcustomer === true) {

    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, async function (error, client) {

      if (error) throw error;

      const db = client.db(database);

      db.collection(collectionCustomerID).find().limit(1).project({ _id: 0 }).sort({ "ID": -1 }).toArray(function (error, result) {

        if (error) throw error;
        console.log(result)

        db.collection(collectionCustomerID).insertOne({ "ID": result[0]["ID"] + 1 }, function (err, result) {

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

exports.singleGet = function (req, res) {
  let qID = req.params.id;

  let filterquery = new Object();

  qID ? filterquery.customerID = parseFloat(qID) : null;

  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, async function (error, client) {

    if (error) throw error;

    const db = client.db(database);

    db.collection(collectionCustomer).findOne(filterquery, { projection: { _id: 0, password: 0 } }, function (error, result) {
      if (error) throw error;
      client.close();

      return res.status(200).json({
        status: 200,
        data: result
      });

    });

  });
}

exports.customerGet = function (req, res) {
  // Filter Query
  let filterquery = {};
  // Date
  let qDate = parseFloat(req.query.date);
  var getDay = Math.ceil(111 * (1000 * 60 * 60 * 24));
  var findDate = new Date().getTime() - getDay;
  new Date(findDate);
  function mathDay(day) {
    const getDay = Math.ceil(day * (1000 * 60 * 60 * 24));
    const findDate = new Date().getTime() - getDay;
    return new Date(findDate).toISOString();
  }
  qDate ? filterquery['createdTime'] = { $gte: new Date(mathDay(qDate)) } : null;
  // Page
  let qPage = req.query.page ? parseFloat(req.query.page) : 1;
  if (qPage < 1) {
    return res.status(404).json({
      status: 404, message: "No response found for request."
    })
  };
  console.log("page", qPage);
  // Per Page
  let qPerPage = req.query.per_page ? parseFloat(req.query.per_page) : 10;
  console.log("per page", qPerPage);
  // Sorting
  let sort = { "createdTime": -1 };
  console.log("sort", sort);
  // Skip
  let skip = qPage < 2 ? 0 : qPerPage * (qPage - 1);
  console.log("skip", skip);

  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, async function (error, client) {

    if (error) throw error;

    const db = client.db(database);
    const count = await db.collection(collectionCustomer).countDocuments(filterquery);
    const totalPage = count / qPerPage;

    db.collection(collectionCustomer).find(filterquery).project({ _id: 0, password: 0 }).skip(skip).limit(qPerPage).sort(sort).toArray(function (error, result) {
      if (error) throw error;
      client.close();

      return res.status(200).json({
        status: 200,
        count: count,
        perPage: qPerPage,
        totalPage: (totalPage > 0 && Number.isInteger(totalPage)) ? totalPage : parseInt(totalPage) + 1,
        currentPage: qPage,
        data: result
      });

    });

  });

};

exports.customerPost = function (req, res) {

  if (req.body.email && req.body.password) {

    MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }, function (err, client) {

      if (err) throw err;

      const db = client.db(database);

      db.collection(collectionCustomer)
        .findOne({ email: req.body.email },
          function (errorFindEmail, resultFindEmail) {

            if (errorFindEmail) throw errorFindEmail;

            if (resultFindEmail === null) {

              db.collection(collectionCustomerID)
                .find()
                .limit(1)
                .project({ _id: 0 })
                .sort({ "ID": -1 })
                .toArray(function (error, result) {

                  if (error) throw error;

                  db.collection(collectionCustomerID)
                    .insertOne(
                      { "ID": result[0]["ID"] + 1 },
                      function (err, result) {

                        if (err) throw err;

                        MongoClient.connect(
                          url,
                          { useNewUrlParser: true, useUnifiedTopology: true },
                          function (err, client) {

                            const db = client.db(database);
                            let object = new ObjectID();
                            const timestamp = object.getTimestamp();

                            if (err) throw err;

                            const customer = {
                              customerID: parseFloat(JSON.parse(result).ops[0]["ID"]),
                              firstName: req.body.firstName,
                              lastName: req.body.lastName,
                              userName: slug(req.body.firstName + req.body.lastName),
                              password: bcrypt.hashSync(req.body.password, 10),
                              email: req.body.email,
                              phone: req.body.phone,
                              address: req.body.address,
                              role: req.body.role,
                              package: req.body.package,
                              isOnline: false,
                              lastLoginTime: null,
                              lastLogoutTime: null,
                              updatedTime: null,
                              createdTime: timestamp,
                            }

                            db.collection(collectionCustomer).insertOne(customer, function (err, resResult) {

                              if (err) throw err;

                              client.close();
                              let resData = JSON.parse(resResult).ops[0];
                              let data = {
                                customerID: resData.customerID,
                                firstName: resData.firstName,
                                lastName: resData.lastName,
                                userName: resData.userName,
                                email: resData.email,
                                phone: resData.phone,
                                address: resData.address,
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

                          });

                      })

                });

            } else {
              return res.status(400).json({
                status: 400,
                message: "This email already exists"
              });
            }

          });
    })
  } else {
    return res.status(400).json({
      status: 400,
      message: "This email or phone already exists"
    });
  }
};

exports.customerPatch = function (req, res) {

  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, async function (err, client) {

    const db = client.db(database);

    if (err) throw err;

    let setData = { updatedTime: new Date() };

    req.body.firstname ? setData.firstname = req.body.firstname : null;
    req.body.lastname ? setData.lastname = req.body.lastname : null;
    req.body.email ? setData.email = req.body.email : null;
    req.body.phone ? setData.phone = req.body.phone : null;

    let newValues = {
      $set: setData
    };

    let getCustomer = { "customerID": parseFloat(req.params.id) }
    let options = {
      returnNewDocument: true,
      projection: { _id: 0, password: 0 },
    };

    if (!req.params.id || parseFloat(req.params.id) < 100000) {

      return res.status(400).json({
        status: 400,
        message: "CustomerID could not be found."
      });

    } else {

      db.collection(collectionCustomer).findOneAndUpdate(getCustomer, newValues, options, function (err, result) {
        if (err) throw err;

        client.close();
        console.log(result);
        return res.status(200).json({ status: 200, data: result.value });
      })

    }

  });

};

exports.customerDelete = function (req, res) {

  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, async function (err, client) {

    const db = client.db(database);

    if (err) throw err;

    let query = {};
    const qGetID = req.params.id;
    if (qGetID) {
      query = { "customerID": parseFloat(qGetID) }
    }

    db.collection(collectionCustomer).findOneAndDelete(query, { projection: { _id: 0, password: 0 } }, function (err, result) {

      if (err) throw err;

      client.close();
      console.log(result);
      return res.status(200).json({ status: 200, data: result.value });
    })

  });

};

exports.customerLogin = function (req, res) {

  if (req.body.email && req.body.password) {

    MongoClient.connect(
      url,
      { useNewUrlParser: true, useUnifiedTopology: true },
      function (error, client) {

        if (error) throw error;

        const db = client.db(database);

        db.collection(collectionCustomer).findOne(
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
                        customerID: result.customerID,
                        firstName: result.firstName,
                        lastName: result.lastName,
                        userName: result.userName,
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