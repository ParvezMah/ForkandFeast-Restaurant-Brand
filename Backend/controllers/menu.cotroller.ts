import { Request, Response } from "express";
import { Menu } from "models/menu.models";
import { Restaurant } from "models/restaurant.models";
import mongoose, { Types } from 'mongoose';

import uploadImageCloudinary from "utils/imageUpload";

//01 - Adding a menu
export const addMenu = async (req:Request, res:Response)=>{
    try {
        const {name, description, price} = req.body;
        const file = req.file;
        if(!file){
            return res.status(400).json({
                success:false,
                message:"Image is Required"
            })
        }
        const imageUrl = await uploadImageCloudinary(file as Express.Multer.File);
        const menu:any = await Menu.create({
            name, 
            description, 
            price, 
            image: imageUrl
        })
        const restaurant = await Restaurant.findOne({user:req.id});
        if(restaurant){
            (restaurant.menus as mongoose.Schema.Types.ObjectId[]).push(menu._id);
            await restaurant.save();
        }

        return res.status(201).json({
            success:true,
            message:"Menu added successfully",
            menu,
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal Server Error"})
    }
}

//02 - Edit a Menu
export const editMenu = async (req:Request, res:Response)=>{
    try {
        const {id} = req.params;
        const {name, price, description} = req.body;
        const file = req.file;
        const menu = await Menu.findById(id);

        if(!menu){
            return res.status(404).json({
                success:false,
                message:"Menu not found"
            })
        }

        if(name) menu.name = name;
        if(price) menu.price = price;
        if(description) menu.description = description;
        if(file){
            const imageUrl = await uploadImageCloudinary(file as Express.Multer.File);
            menu.image = imageUrl;
        }

        await menu.save();

        return res.status(200).json({
            succcess:true,
            message:"Menu updated",
            menu,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal Server Error"})
    }
}
