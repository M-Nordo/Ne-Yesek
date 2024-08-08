import { response } from "express";
import foodModel from "../models/foodModel.js";
import fs from 'fs'


// food ekle

const addFood = async (req,res) => {

    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
    })
    try {
        await food.save();
        res.json({success:true,message:"Ürün Eklendi"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Hata"})
    }

}

// tüm ürünleri listele

const listFood = async (req,res) => {
    try {
        const foods = await foodModel.find({});
        res.json({success:true,data:foods})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Hata !"})
    }
}

// ürünü kaldır

const removeFood = async (req,res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{})

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Ürün Kaldırıldı"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Hata"})
    }
}

export { addFood,listFood,removeFood }