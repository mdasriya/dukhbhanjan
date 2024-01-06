const { ProductModel } = require("../model/product.model")

const handleCreateProduct = async (req, res) => {
   const data = req.body
   try {
      const product = new ProductModel(data)
      await product.save()
      res.status(200).json({ msg: "product added Success!!!", products: product })
   } catch (error) {
      res.status(400).json({ msg: error.message })
   }
}

const handleGetProduct = async (req, res) => {
   try {
      const products = await ProductModel.find()
      res.status(200).send(products)
   } catch (error) {
      res.status(400).send({ msg: error.msg })
   }
}

const handleUpadteProduct = async (req, res) => {
   const { productId } = req.params
   // console.log(productId)
   try {
      await ProductModel.findByIdAndDelete({ _id: productId }, req.body)
      res.json({ msg: `product has been updated` })

   } catch (error) {
      console.log(error);
   }

}

const handleDeleteProduct = async (req, res) => {
   const { productId } = req.params

   try {
      await ProductModel.findByIdAndUpdate({ _id: productId }, req.body)
      res.json({ msg: `product has been updated` })

   } catch (error) {
      console.log(error);
   }
}

module.exports = {
   handleCreateProduct,
   handleGetProduct, handleUpadteProduct, handleDeleteProduct
}