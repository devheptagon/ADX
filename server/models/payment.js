const payment = {
  id: Number,
  serviceName: String,//Stripe, Paypal etc.
  processType: String,//Refund or Received
  amount: String,
  payer: {
    type: String,//Customer,Broker,Advertisement
    id: Number,//CustomerID,BrokerID,Advertisement=0
  },
  status: String,//Success,Failed,Pending
  updatedTime: String,
  createdTime: String,
}
module.exports = payment