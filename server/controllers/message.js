const { MongoClient, ObjectID } = require('mongodb');
const url = 'mongodb://' + process.env.MONGO_USERNAME + ':' + encodeURIComponent(process.env.MONGO_PASSWORD) + '@' + process.env.MONGO_HOSTNAME + ':' + process.env.MONGO_PORT + '?authSource=admin';

const database = "advertisement";
const collectionMessage = "message";
const collectionMessageID = "messageID";

exports.createID = function (req, res) {

  const newmessage = req.body.newMessage;
  if (newmessage === true) {

    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, async function (error, client) {

      if (error) throw error;

      const db = client.db(database);

      db.collection(collectionMessageID).find().limit(1).project({ _id: 0 }).sort({ "ID": -1 }).toArray(function (error, result) {

        if (error) throw error;
        console.log(result)

        db.collection(collectionMessageID).insertOne({ "ID": result[0]["ID"] + 1 }, function (err, result) {

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

  qID ? filterquery.messageID = parseFloat(qID) : null;

  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, async function (error, client) {

    if (error) throw error;

    const db = client.db(database);

    db.collection(collectionMessage).findOne(filterquery, { projection: { _id: 0 } }, function (error, result) {
      if (error) throw error;
      client.close();

      return res.status(200).json({
        status: 200,
        data: result
      });

    });

  });
}

exports.messageGet = function (req, res) {
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
    const count = await db.collection(collectionMessage).countDocuments(filterquery);
    const totalPage = count / qPerPage;

    db.collection(collectionMessage).find(filterquery).project({ _id: 0 }).skip(skip).limit(qPerPage).sort(sort).toArray(function (error, result) {
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

exports.messagePost = function (req, res) {

  if (!req.is('application/json', 'multipart/form-data')) {

    return res.status(400).json({
      status: 400,
      message: "This url wants you to specify the 'application/json' format in all request headers."
    });

  } else {

    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, async function (err, client) {

      const db = client.db(database);
      let object = new ObjectID();
      const timestamp = object.getTimestamp();

      if (err) throw err;

      if (req.body.messageID) {
        db.collection(collectionMessage).findOne({ "messageID": parseFloat(req.body.messageID) }, function (err, result) {
          if (err) throw err;

          if (result === null) {

            const message = {
              messageID: parseFloat(req.body.messageID),
              fromIsGuest: req.body.fromIsGuest,
              fromCustomerID: req.body.fromCustomerID,
              fromFullName: req.body.fromFullName,
              fromEmail: req.body.fromEmail,
              fromPhone: req.body.fromPhone,
              toID: req.body.toID,
              advertID: req.body.advertID,
              messageContent: req.body.messageContent,
              messageSendStatus: req.body.messageSendStatus,
              messageReadStatus: req.body.messageReadStatus,
              updatedTime: timestamp,
              createdTime: timestamp,
            }

            db.collection(collectionMessage).insertOne(message, function (err, result) {

              if (err) throw err;

              client.close();
              let resData = JSON.parse(result).ops[0];
              let data = {
                messageID: resData.messageID,
                fromIsGuest: resData.fromIsGuest,
                fromCustomerID: resData.fromCustomerID,
                fromFullName: resData.fromFullName,
                fromEmail: resData.fromEmail,
                fromPhone: resData.fromPhone,
                toID: resData.toID,
                advertID: resData.advertID,
                messageContent: resData.messageContent,
                messageSendStatus: resData.messageSendStatus,
                messageReadStatus: resData.messageReadStatus,
                updatedTime: resData.updatedTime,
                createdTime: resData.createdTime
              }
              console.log(data);
              return res.status(201).json({ status: 201, data: data });
            })

          } else {

            return res.status(400).json({
              status: 400,
              message: "A message already exists with this 'messageID'."
            });

          }
        })
      }

    });

  }

};

exports.messagePatch = function (req, res) {

  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, async function (err, client) {

    const db = client.db(database);

    if (err) throw err;

    let setData = { updatedTime: new Date() };

    req.body.messageSendStatus ? setData.messageSendStatus = req.body.messageSendStatus : null;
    req.body.messageReadStatus ? setData.messageReadStatus = req.body.messageReadStatus : null;

    let newValues = {
      $set: setData
    };

    let getMessage = { "messageID": parseFloat(req.params.id) }
    let options = {
      returnNewDocument: true,
      projection: { _id: 0 },
    };

    if (!req.params.id || parseFloat(req.params.id) < 100000000) {

      return res.status(400).json({
        status: 400,
        message: "MessageID could not be found."
      });

    } else {

      db.collection(collectionMessage).findOneAndUpdate(getMessage, newValues, options, function (err, result) {
        if (err) throw err;

        client.close();
        console.log(result);
        return res.status(200).json({ status: 200, data: result.value });
      })

    }

  });

};

exports.messageDelete = function (req, res) {

  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, async function (err, client) {

    const db = client.db(database);

    if (err) throw err;

    let query = {};
    const qGetID = req.params.id;
    if (qGetID) {
      query = { "messageID": parseFloat(qGetID) }
    }

    db.collection(collectionMessage).findOneAndDelete(query, { projection: { _id: 0 } }, function (err, result) {

      if (err) throw err;

      client.close();
      console.log(result);
      return res.status(200).json({ status: 200, data: result.value });
    })

  });

};