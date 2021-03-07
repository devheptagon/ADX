const slug = require('../middleware/slug');
const { MongoClient, ObjectID, ISODate } = require('mongodb');
const url = 'mongodb://' + process.env.MONGO_USERNAME + ':' + encodeURIComponent(process.env.MONGO_PASSWORD) + '@' + process.env.MONGO_HOSTNAME + ':' + process.env.MONGO_PORT + '?authSource=admin';

const database = "advertisement";
const collection = "advert";
const collection01 = "advertID";

exports.createID = function (req, res) {

  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, async function (error, client) {

    if (error) throw error;

    const db = client.db(database);

    db.collection(collection01).find().limit(1).sort({ "ID": -1 }).toArray(function (error, result) {

      if (error) throw error;

      db.collection(collection01).insertOne({ "ID": result[0]["ID"] + 1 }, function (err, result) {

        if (err) throw err;

        client.close();

        return res.status(201).json({ status: 201, data: JSON.parse(result).ops[0] });
      });

    });

  });
}

exports.singleGet = function (req, res) {
  let qID = req.params.id;

  let filterquery = new Object();

  qID ? filterquery.advertID = parseFloat(qID) : null;

  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, async function (error, client) {

    if (error) throw error;

    const db = client.db(database);

    db.collection(collection).findOne(filterquery, function (error, result) {
      if (error) throw error;
      client.close();

      return res.status(200).json({
        status: 200,
        data: result
      });

    });

  });
}

exports.advertGet = function (req, res) {
  // Filter Query
  let filterquery = {};
  // Tenure = ["Freehold", "Leasehold", "Other"]
  let qTenure = req.query.tenure;
  qTenure ? filterquery['tenure'] = qTenure : null;
  // Sector
  let qSector = req.query.sector;
  qSector ? filterquery['sectors'] = qSector : null;
  // Location
  let qLocation = req.query.location;
  qLocation ? filterquery['location.county'] = qLocation : null;
  // Freehold Price
  let minFreehold = parseFloat(req.query.minFree);
  let maxFreehold = parseFloat(req.query.maxFree);
  minFreehold ? filterquery['freeHoldPrice'] = { $gte: minFreehold } : null;
  maxFreehold ? filterquery['freeHoldPrice'] = { $lte: maxFreehold } : null;
  minFreehold || maxFreehold ? filterquery['freeHoldPrice'] = { $gte: minFreehold, $lte: maxFreehold } : null;
  // Leasehold Price
  let minLeasehold = parseFloat(req.query.minLease);
  let maxLeasehold = parseFloat(req.query.maxLease);
  minLeasehold ? filterquery['leaseHoldPrice'] = { $gte: minLeasehold } : null;
  maxLeasehold ? filterquery['leaseHoldPrice'] = { $lte: maxLeasehold } : null;
  minLeasehold || maxLeasehold ? filterquery['leaseHoldPrice'] = { $gte: minLeasehold, $lte: maxLeasehold } : null;
  // Asking Price
  let minAskingPrice = parseFloat(req.query.minAsking);
  let maxAskingPrice = parseFloat(req.query.maxAsking);
  minAskingPrice ? filterquery['askingPrice'] = { $gte: minAskingPrice } : null;
  maxAskingPrice ? filterquery['askingPrice'] = { $lte: maxAskingPrice } : null;
  minAskingPrice || maxAskingPrice ? filterquery['askingPrice'] = { $gte: minAskingPrice, $lte: maxAskingPrice } : null;
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
    const count = await db.collection(collection).countDocuments(filterquery);
    const totalPage = count / qPerPage;

    db.collection(collection).find(filterquery).skip(skip).limit(qPerPage).sort(sort).toArray(function (error, result) {
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

exports.advertPost = function (req, res) {

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

      const advert = {
        advertID: parseFloat(req.body.advertID),
        title: req.body.title,
        slug: slug(req.body.title) + '-' + req.body.advertID,
        tenure: req.body.tenure,
        freeHoldPrice: req.body.freeHoldPrice,
        leaseHoldPrice: req.body.leaseHoldPrice,
        askingPrice: req.body.askingPrice,
        priceGuide: req.body.priceGuide,
        annualNetProfit: req.body.annualNetProfit,
        annualTurnover: req.body.annualTurnover,
        location: req.body.location,
        locationAccommodation: req.body.locationAccommodation,
        sectors: req.body.sectors,
        moreTags: req.body.moreTags,
        website: req.body.website,
        socialMedia: req.body.socialMedia,
        reviews: req.body.reviews,
        comRegNo: req.body.comRegNo,
        media: req.body.media,
        description: req.body.description,
        advertStatus: req.body.advertStatus,
        agentID: req.body.agentID,
        agentUser: req.body.agentUser,
        updatedTime: timestamp,
        createdTime: timestamp,
      }

      db.collection(collection).insertOne(advert, function (err, result) {

        if (err) throw err;

        client.close();

        return res.status(201).json({ status: 201, data: JSON.parse(result).ops });
      })

    });

  }

};

exports.advertPatch = function (req, res) {

  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, async function (err, client) {

    const db = client.db(database);

    if (err) throw err;

    let setData = { updatedTime: new Date() };

    req.body.title ? setData.title = req.body.title : null;
    req.body.tenure ? setData.tenure = req.body.tenure : null;
    req.body.freeHoldPrice ? setData.freeHoldPrice = req.body.freeHoldPrice : null;
    req.body.leaseHoldPrice ? setData.leaseHoldPrice = req.body.leaseHoldPrice : null;
    req.body.askingPrice ? setData.askingPrice = req.body.askingPrice : null;
    req.body.priceGuide ? setData.priceGuide = req.body.priceGuide : null;
    req.body.annualNetProfit ? setData.annualNetProfit = req.body.annualNetProfit : null;
    req.body.annualTurnover ? setData.annualTurnover = req.body.annualTurnover : null;
    req.body.location ? setData.location = req.body.location : null;
    req.body.locationAccommodation ? setData.locationAccommodation = req.body.locationAccommodation : null;
    req.body.sectors ? setData.sectors = req.body.sectors : null;
    req.body.moreTags ? setData.moreTags = req.body.moreTags : null;
    req.body.website ? setData.website = req.body.website : null;
    req.body.socialMedia ? setData.socialMedia = req.body.socialMedia : null;
    req.body.reviews ? setData.reviews = req.body.reviews : null;
    req.body.comRegNo ? setData.comRegNo = req.body.comRegNo : null;
    req.body.media ? setData.media = req.body.media : null;
    req.body.description ? setData.description = req.body.description : null;
    req.body.advertStatus ? setData.advertStatus = req.body.advertStatus : null;
    req.body.agentID ? setData.agentID = req.body.agentID : null;
    req.body.agentUser ? setData.agentUser = req.body.agentUser : null;

    let newValues = {
      $set: setData
    };

    let getAdvert = { "advertID": parseFloat(req.params.id) }

    if (!req.params.id || parseFloat(req.params.id) < 100000000) {

      return res.status(400).json({
        status: 400,
        message: "AdvertID could not be found."
      });

    } else {

      db.collection(collection).updateOne(getAdvert, newValues, function (err, result) {
        if (err) throw err;

        client.close();
        return res.status(200).json({ status: 200 });
      })

    }

  });

};

exports.advertDelete = function (req, res) {

  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, async function (err, client) {

    const db = client.db(database);

    if (err) throw err;

    let query = {};
    const qGetID = req.params.id;
    if (qGetID) {
      query = { "advertID": parseFloat(qGetID) }
    }

    db.collection(collection).deleteOne(query, function (err, result) {

      if (err) throw err;

      client.close();
      return res.status(200).json({ status: 200 });
    })

  });

};