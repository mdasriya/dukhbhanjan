
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
        res.status(200).send(order)
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


module.exports = {
    handleCreateOrder, handleGetOrder, handleGetAllOrders
}