const { MongoClient } = require('mongodb');
const url = 'mongodb://' + process.env.MONGO_USERNAME + ':' + encodeURIComponent(process.env.MONGO_PASSWORD) + '@' + process.env.MONGO_HOSTNAME + ':' + process.env.MONGO_PORT + '?authSource=admin';

const database = "advertisement";
const collection = "sector";

exports.sectorGet = function (req, res) {

  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, async function (err, client) {
    if (err) throw err;

    const db = client.db(database);
    const count = await db.collection(collection).estimatedDocumentCount();
    const perPage = 0;
    const totalPage = count / perPage;
    db.collection(collection).find({}).limit(perPage).sort({ "name": 1 }).toArray(function (err, result) {
      if (err) throw err;

      client.close();
      return res.status(200).json({
        status: 200,
        count: count,
        perPage: perPage,
        totalPage: (totalPage > 0 && Number.isInteger(totalPage)) ? totalPage : parseInt(totalPage) + 1,
        data: result
      });
    });

  });

};