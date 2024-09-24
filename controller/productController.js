const Products=require('../models/product.js')


exports.createProduct=async(req,res)=>{
  const {name,price,desc}=req.body;
  const userId = req.user.id;
  console.log(name,price ,desc);
  console.log("CODE COMES HERE")
  try{
    const newProduct=await Products.create({name,price,desc,userId});
     console.log("code here");
    res.status(201).json({message:"product create successfully",newProduct});
  }catch(error){
    res.status(500).json({ message: 'Server error',error:error.message });
  }
}




exports.updateProduct = async (req, res) => {
    const { id } = req.params; // Get the product ID from the request parameters
    const { name, price, desc } = req.body; // Get updated fields from the request body
    const userId=req.user.id;

    try {
        // Find the product by primary key (ID)
        // const product = await Products.findByPk(id); // Correct method is findByPk
        const product = await Products.findOne({ where: { id, userId } });
        // Check if the product was found
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Update the product with the new values
        const updatedProduct = await product.update({ name, price, desc });

        res.status(200).json({ message: "Product updated successfully", updatedProduct });
    } catch (error) {
        console.error('Error updating product:', error); // Log the error for debugging
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


exports.deleteProduct=async(req,res)=>{
    const {id}=req.params;
    const { name, price, desc } = req.body;
    const userId = req.user.id;
    try{
        const product = await Products.findOne({ where: { id, userId } });

        if(!product){
            return res.status(404).json({ message: 'Product not found' });
        }
        const deleteProduct = await product.destroy({ name, price, desc });
         res.status(200).json({ message: "Product deleted successfully"});
    }catch(error){
        console.error('Error in deleting product:', error); // Log the error for debugging
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

exports.fetchAllProduct=async(req,res)=>{
    const userId = req.user.id;
    try{
        const product=await Products.findAll({ where: { userId } });
        if(!product){
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    }catch(error){
        console.error('Error in feching  product:', error); // Log the error for debugging
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}