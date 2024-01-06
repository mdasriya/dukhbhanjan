
const { OrderModel } = require("../model/order.model")

const handleCreateOrder = async (req, res) => {
    // logic goes here
    const data = req.body
    const newData = data.map((item) => {
        delete item._id
        item.orderDateTime = Date.now();
        item.status = false
        return item
    })
    try {

        const orders = await OrderModel.insertMany(newData);
        res.status(200).json({ msg: "Order is added in my order success", state: true })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ msg: "Something Went Wrong", error: error.message, state: false })
    }
}
const handleGetOrder = async (req, res) => {
    let UserId = req.body.UserId
    try {
        const order = await OrderModel.find({ UserId: UserId })
       if(order.length > 0){
        res.status(200).json({msg:'order data', order:order, state:true})
       }else{
        res.status(200).json({msg:'No Order Present', state:false})
       }
    } catch (error) {
        console.log(error.message)
        res.status(400).send({ msg: error.message })
    }
}


const handleGetAllOrders = async (req, res) => {

    try {
        const Orders = await OrderModel.find()
        res.status(200).send(Orders)
    } catch (error) {
        res.status(500).json({ msg: "Something Went Wrong", error: error.message })
    }
}
const handleCancelOrder = async (req, res) => {
    // console.log("call");
    const userIdinUserDoc = req.body.UserId;
    const { id } = req.params;
    req.body.cancel = 'canceled';
    req.body.cancelDate = new Date(); // Set the cancel date to the current date
  
    // console.log(req.body);
  
    try {
      const order = await OrderModel.findOne({ _id: id });
    //   console.log(order);
      const userIDinOrderDoc = order.UserId;
  
      if (userIdinUserDoc === userIDinOrderDoc) {
        await OrderModel.findByIdAndUpdate({ _id: id }, req.body);
        res.status(200).json({
          msg: `Your Order Cancelled Successfully`,
          state: true,
        });
      } else {
        res.status(200).json({
          msg: "You are not Authorized to cancel this order",
          state: false,
        });
      }
    } catch (error) {
      console.log(error.message);
      res.status(400).json({
        msg: "Something went wrong while updating the order",
        state: false,
      });
    }
  };
  


module.exports = {
    handleCreateOrder, handleGetOrder, handleGetAllOrders,handleCancelOrder
}