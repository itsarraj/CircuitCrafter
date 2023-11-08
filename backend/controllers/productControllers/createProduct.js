import express from "express";
import multer from "multer";
import Product from "../../models/Product.js";
import asyncHandler from "express-async-handler";
import { uploadProductImage } from "../../services/uploadService.js";
import cloudinaryv2 from "../../util/cloudinary.js";
import fs from "fs";
import { memoryUsage } from "process";

// @desc:   create a new product
// @access: private
// @route:  POST api/products/

// @database : This is local
//
// const createProduct = asyncHandler(async (req, res) => {
//   const user = req.user._id;
//   const { name, price, qtyInStock } = req.body;
//   console.log(req.body);
//   const image = req.file.path;
//   const product = new Product({
//     user,
//     name,
//     image,
//     price,
//     qtyInStock: +qtyInStock > 0 ? +qtyInStock : 1,
//   });
//   const newProduct = await product.save();
//   res.status(200).json(newProduct);
// });

// @database : This is cloudinary
//

// const createProduct = asyncHandler(async (req, res) => {
//   const user = req.user._id;
//   const { name, price, qtyInStock } = req.body;
//   console.log(req.body);
//   const image = req.file.path;
//   const imageUrl = await uploadProductImage(image);
//   console.log("imageUrl", imageUrl);

//   const product = new Product({
//     user,
//     name,
//     image: imageUrl,
//     price,
//     qtyInStock: +qtyInStock > 0 ? +qtyInStock : 1,
//   });
//   const newProduct = await product.save();
//   deleteLocalImage(image);
//   res.status(200).json(newProduct);
// });

// const deleteLocalImage = async (image) => {
//   fs.rmSync(image);
// };

// @database : This is cloudinary & No Local Storage Everything is Saved in Memory
//

const createProduct = asyncHandler(async (req, res) => {
  const user = req.user._id;
  const { name, price, qtyInStock } = req.body;
  // console.log(req.body);
  const image = req.file;
  // console.log("image", image);
  const dataURI = `data:image/png;base64,${image.buffer.toString("base64")}`;
  // console.log("dataURI", dataURI);

  const imageUrl = await uploadProductImage(dataURI);
  // console.log("imageUrl", imageUrl);

  const product = new Product({
    user,
    name,
    image: imageUrl,
    price,
    qtyInStock: +qtyInStock > 0 ? +qtyInStock : 1,
  });
  const newProduct = await product.save();
  // console.log(newProduct);
  // console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxx");
  // console.log(req.file);

  // Clear the memory everytime
  req.file = null; // Remove the reference to the uploaded file.
  // console.log("---------------------");
  // console.log(req.file);
  // console.log("memoryUsage()", memoryUsage());

  res.status(200).json(newProduct);
});

export default createProduct;
