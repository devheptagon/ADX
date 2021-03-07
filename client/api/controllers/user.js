const slug = require('../middleware/slug');
const { MongoClient, ObjectID } = require('mongodb');
const url = 'mongodb://' + process.env.MONGO_USERNAME + ':' + encodeURIComponent(process.env.MONGO_PASSWORD) + '@' + process.env.MONGO_HOSTNAME + ':' + process.env.MONGO_PORT + '?authSource=admin';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const database = "advertisement";
const collectionUser = "user";
const collectionUserID = "userID";
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

exports.createID = function (req, res) {

  const newuser = req.body.newUser;
  if (newuser === true) {

    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, async function (error, client) {

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

exports.singleGet = function (req, res) {
  let qID = req.params.id;

  let filterquery = new Object();

  qID ? filterquery.userID = parseFloat(qID) : null;

  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, async function (error, client) {

    if (error) throw error;

    const db = client.db(database);

    db.collection(collectionUser).findOne(filterquery, { projection: { _id: 0, password: 0 } }, function (error, result) {
      if (error) throw error;
      client.close();

      return res.status(200).json({
        status: 200,
        data: result
      });

    });

  });
}

exports.userGet = function (req, res) {
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
  // Per Page
  let qPerPage = req.query.per_page ? parseFloat(req.query.per_page) : 10;
  // Sorting
  let sort = { "createdTime": -1 };
  // Skip
  let skip = qPage < 2 ? 0 : qPerPage * (qPage - 1);

  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, async function (error, client) {

    if (error) throw error;

    const db = client.db(database);
    const count = await db.collection(collectionUser).countDocuments(filterquery);
    const totalPage = count / qPerPage;

    db.collection(collectionUser).find(filterquery).project({ _id: 0 }).skip(skip).limit(qPerPage).sort(sort).toArray(function (error, result) {
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

exports.userPost = function (req, res) {

  if (!req.body.email || !req.body.phone) {

    return res.status(400).json({
      status: 400,
      message: "Email and Phone Required."
    });

  } else if (req.body.email || req.body.phone) {

    const filterQuery = {
      '$or': [
        {
          'email': req.body.email
        }, {
          'phone': req.body.phone
        }
      ]
    };

    MongoClient.connect(
      url,
      { useNewUrlParser: true, useUnifiedTopology: true },
      function (error, client) {

        if (error) throw error;

        const db = client.db(database);

        db.collection(collectionUser)
          .find(filterQuery).toArray(
            function (errorOrFilter, resultOrFilter) {

              if (errorOrFilter) throw errorOrFilter;

              console.log("find email or phone", resultOrFilter);

              client.close();

              if (resultOrFilter.length > 0) {

                return res.status(400).json({
                  status: 400,
                  message: "This email or phone already exists"
                });

              } else {

                MongoClient.connect(
                  url,
                  {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                  },
                  function (errorClient, client) {

                    if (errorClient) throw errorClient;

                    const db = client.db(database);

                    let object = new ObjectID();

                    const timestamp = object.getTimestamp();

                    db.collection(collectionUserID)
                      .find()
                      .limit(1)
                      .project({ _id: 0 })
                      .sort({ "ID": -1 })
                      .toArray(
                        function (errorID, resultID) {

                          if (errorID) throw errorID;

                          console.log("Find ID", resultID);

                          db.collection(collectionUserID)
                            .insertOne(
                              { "ID": resultID[0]["ID"] + 1 },
                              function (errorInsertID, resultInsertID) {

                                if (errorInsertID) throw errorInsertID;

                                console.log("Insert ID", resultInsertID.ops[0]["ID"]);

                                const user = {
                                  userID: parseFloat(JSON.parse(resultInsertID).ops[0]["ID"]),
                                  firstName: req.body.firstName,
                                  lastName: req.body.lastName,
                                  userName: slug(req.body.firstName + req.body.lastName),
                                  password: bcrypt.hashSync(req.body.password, 10),
                                  email: req.body.email,
                                  phone: req.body.phone,
                                  role: req.body.role,
                                  isOnline: false,
                                  lastLoginTime: null,
                                  lastLogoutTime: null,
                                  updatedTime: null,
                                  createdTime: timestamp,
                                }

                                db.collection(collectionUser)
                                  .insertOne(user,
                                    function (errorInsertUser, resultInsertUser) {

                                      if (errorInsertUser) throw errorInsertUser;

                                      console.log("Request User Data", user);

                                      let resData = JSON.parse(resultInsertUser).ops[0];

                                      let data = {
                                        userID: resData.userID,
                                        firstName: resData.firstName,
                                        lastName: resData.lastName,
                                        userName: resData.userName,
                                        email: resData.email,
                                        phone: resData.phone,
                                        role: resData.role,
                                        isOnline: resData.isOnline,
                                        lastLoginTime: resData.lastLoginTime,
                                        lastLogoutTime: resData.lastLogoutTime,
                                        updatedTime: resData.updatedTime,
                                        createdTime: resData.createdTime
                                      }

                                      console.log("Finally Return Data", data);

                                      client.close();

                                      return res.status(201).json({ status: 201, data: data });

                                    })

                              });

                        });

                  });

              }

            });

      });

  }

};

exports.userPatch = function (req, res) {

  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, async function (err, client) {

    const db = client.db(database);

    if (err) throw err;

    let setData = { updatedTime: new Date() };

    req.body.firstName ? setData.firstName = req.body.firstName : null;
    req.body.lastName ? setData.lastName = req.body.lastName : null;
    req.body.email ? setData.email = req.body.email : null;
    req.body.phone ? setData.phone = req.body.phone : null;
    req.body.password ? setData.password = bcrypt.hashSync(req.body.password, 10) : null;

    let newValues = {
      $set: setData
    };

    let getUser = { "userID": parseFloat(req.params.id) }
    let options = {
      returnNewDocument: true,
      projection: { _id: 0, password: 0 },
    };

    if (!req.params.id || parseFloat(req.params.id) < 10000) {

      return res.status(400).json({
        status: 400,
        message: "UserID could not be found."
      });

    } else {

      db.collection(collectionUser).findOneAndUpdate(getUser, newValues, options, function (err, result) {
        if (err) throw err;

        client.close();
        console.log(result);
        return res.status(200).json({ status: 200, data: result.value });
      })

    }

  });

};

exports.userDelete = function (req, res) {

  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, async function (err, client) {

    const db = client.db(database);

    if (err) throw err;

    let query = {};
    const qGetID = req.params.id;
    if (qGetID) {
      query = { "userID": parseFloat(qGetID) }
    }

    db.collection(collectionUser).findOneAndDelete(query, { projection: { _id: 0, password: 0 } }, function (err, result) {

      if (err) throw err;

      client.close();
      console.log(result);
      return res.status(200).json({ status: 200, data: result.value });
    })

  });

};

exports.userLogin = function (req, res) {

  if (req.body.email && req.body.password) {

    MongoClient.connect(
      url,
      { useNewUrlParser: true, useUnifiedTopology: true },
      function (error, client) {

        if (error) throw error;

        const db = client.db(database);

        db.collection(collectionUser).findOne(
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
                        userID: result.userID,
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