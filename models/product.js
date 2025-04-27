import mongoose from "mongoose";

const productScheama = new mongoose.Schema({
  userId:{type: String,requied:true, ref:"user"},
  name:{type: String,requied:true},
  description:{type: String,requied:true},
  price:{type:Number,requied:true},
  offerPrice:{type:Number,requied:true},
  image:{type:Array,requied:true},
  category:{type: String,requied:true},
  date:{type:Number,requied:true}
})

const Product = mongoose.model.product || mongoose.model('product',productScheama)

export default Product