const { upload, processMedia } = require('../middleware/upload');
const { MongoClient } = require('mongodb');
const url = 'mongodb://' + process.env.MONGO_USERNAME + ':' + encodeURIComponent(process.env.MONGO_PASSWORD) + '@' + process.env.MONGO_HOSTNAME + ':' + process.env.MONGO_PORT + '?authSource=admin';

const database = "advertisement";
const collection = "media";

exports.mediaGet = function (req, res) {

  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, async function (err, client) {
    if (err) throw err;

    const db = client.db(database);
    const count = await db.collection(collection).estimatedDocumentCount();
    const perPage = 10;
    const totalPage = count / perPage;
    db.collection(collection).find({}).limit(perPage).sort({ "createdTime": -1 }).toArray(function (err, result) {
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

exports.mediaPost = function (req, res) {
  upload(req, res, function (err) {

    if (!req.is('multipart/form-data')) {

      res.status(400).json({
        status: 400,
        message: "This url wants you to specify the 'multipart/form-data' format in all request headers."
      });

    } else {

      MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {

        const db = client.db(database);

        if (err) throw err;

        let mediaList = new Array();
        for (let i = 0; i < res.req.files.length; i++) {

          processMedia(res.req.files[i].filename, req.body.title + (i < 9 ? '-0' : '-') + (i + 1));

          const media = {
            title: req.body.title,
            slug: req.body.title,
            altText: req.body.altText,
            images: {
              large: req.body.title + (i < 9 ? '-0' : '-') + (i + 1) + '-large.jpg',
              medium: req.body.title + (i < 9 ? '-0' : '-') + (i + 1) + '-medium.jpg',
              small: req.body.title + (i < 9 ? '-0' : '-') + (i + 1) + '-small.jpg',
            },
            updatedTime: new Date().toISOString(),
            createdTime: new Date().toISOString(),
          };
          mediaList.push(media);

        }
        db.collection(collection).insertMany(mediaList, function (err, result) {

          if (err) throw err;
          client.close();

          return res.status(201).json({ status: 201, data: result.ops });

        })

      });

    }

  })
};