const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const multer = require("multer");
const path = require("path");
const { log } = require("console");



/* Multer storage */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });


router.post("/", upload.single("image"),async(req,res)=>{
    try{
        const product = await Product.create({
            name: req.body.name,
            price: req.body.price,
            image: req.file.filename
        }); // insert data
        res.status(201).json({
            message:"product saved successfully",
            product:product
        }); 
    } catch(err){
        console.error(err);
    res.status(500).json({ error: err.message });
    }
})


router.get("/getAllProduct", async(req,res)=>{
 
    try{

        const page = parseInt(req.query.page) || 0;
        const limit = parseInt(req.query.limit) || 6;

         const total = await Product.countDocuments();

        // 0-based pagination
        const skip = page * limit;
        const product = await Product.find().skip(skip)
        .limit(limit)
        
        res.status(200).json({
            data: product,
            total: total
        });
    } catch(err){
          res.status(500).json({
            message: "failed to get product ",
            error: err.message
        })
    }
})

module.exports = router;