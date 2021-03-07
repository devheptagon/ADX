const express = require('express');
const path = require('path');
const cors = require("cors");

const app = express();
const advertRouter = require('./routes/advert');
const mediaRouter = require('./routes/media');
const locationRouter = require('./routes/location');
const sectorRouter = require('./routes/sector');
const userRouter = require('./routes/user');
const customerRouter = require('./routes/customer');
const brokerRouter = require('./routes/broker');
const messageRouter = require('./routes/message');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/advert', advertRouter);
app.use('/media', mediaRouter);
app.use('/location', locationRouter);
app.use('/sector', sectorRouter);
app.use('/user', userRouter);
app.use('/customer', customerRouter);
app.use('/broker', brokerRouter);
app.use('/message', messageRouter);

module.exports = app;