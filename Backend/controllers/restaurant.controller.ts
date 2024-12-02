import { Request, Response } from "express";
import multer from "multer";
import { Restaurant } from "../models/restaurant.models";

export const createRestaurant = async (req:Request, res:Response)=>{
    try {
        const {restaurantName, city, country, deliveryTime, cuisines, price} = req.body();
        const file = req.file;

        const restaurant = Restaurant.findOne({user:req.id});
        if(restaurant){
            return res.status(400).json({
                success: false,
                message: "Restaurant already exist for this user"
            })
        }

        if (!file) {
            return res.status(400).json({
                success: false,
                message: "Image is required"
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal server error"});
    }
}