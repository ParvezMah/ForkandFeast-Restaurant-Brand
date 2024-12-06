import { Response, Request } from "express"
import { Order } from "models/order.models";
import { Restaurant } from "models/restaurant.models";

type  CheckoutSessionRequest = {
    cartItems : {
        menuId: string;
        name: string;
        image: string;
        price: number;
        quantity: number;
    }[],
    deliveryDetails: {
        name: string;
        email: string;
        address: string;
        city: string;
    },
    restaurantId:string
}

type MenuItems = {
    menuId: string;
        name: string;
        image: string;
        price: number;
        quantity: number;
}

export const getOrders = async (req:Request, res:Response)=>{
    try {
        const orders = await Order.find({user:req.id}).populate('user').populate('restaurant');
        return res.status(200).json({
            success:true,
            orders
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: "Interval server error"});
    }
}

export const createCheckoutSession = async (req:Request, res:Response) => {
    try {
        const checkoutSessionRequest : CheckoutSessionRequest = req.body;
        const restaurant = await Restaurant.findById(checkoutSessionRequest.restaurantId).populate('menu');
        if(!restaurant){
            return res.status(404).json({
                success:false,
                message:"Restaurant Not Found"
            })
        }
        const order = new Order({
            restaurant: restaurant._id,
            user:req.id,
            deliveryDetails: checkoutSessionRequest.deliveryDetails,
            cartItems: checkoutSessionRequest.cartItems,
            status: "pending"
        })

        // Line Items
        const menuItems = restaurant.menus;
        const lineItems = createLineItems(checkoutSessionRequest, menuItems);

        // session for stripe set up - i use ssl commerz instead of stripe
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"})
    }
}


export const createLineItems = (checkoutSessionRequest: CheckoutSessionRequest, menuItems:any)=>{
    // 1. create line items
    const lineItems = checkoutSessionRequest.cartItems.map((cartItem)=>{
        const menuItem = menuItems.find((item:any)=>item._id === cartItem.menuId);
        if(!menuItem) throw new Error(`Menu Item is not found`);

        return {
            price_data:{
                currency:'bdt',
                product_data:{
                    name:menuItem.name,
                    images:[menuItem.image],
                },
                unit_amount:menuItem.price * 100
            },
            quantity: cartItem.quantity,
        }
    })
    // 2. return lineitems
    return lineItems;
}