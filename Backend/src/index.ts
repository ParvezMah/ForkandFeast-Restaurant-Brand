import express from "express";
import dotenv from "dotenv";
import connectDB from "../db/connectDB.js";
import userRoute from "../routes/user.routes.js";
import bodyParser from "body-parser"; // Fix for body-parser import
import cookieParser from "cookie-parser";
import cors from "cors";

// Load environment variables
dotenv.config();

const app = express();
const PORT: string | number = process.env.PORT || 3000;

// Default Middleware for MERN project
app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
};
app.use(cors(corsOptions));

// API route
// app.use("/api/v1/user", userRoute);

// Start the server
app.listen(PORT, () => {
    connectDB();
    console.log(`Server Listening at Port: ${PORT}`);
});




























// import express from "express";
// import dotenv from "dotenv";
// import connectDB from "./db/connectDB.js"
// import userRoute from "../Backend/routes/user.routes.ts";
// import bodyParser from "body-parser";
// import cookieParser from "cookie-parser";
// import cors from "cors";



// dotenv.config();
// const app = express();

// const PORT = process.env.PORT || 3000;

// // Default Middleware for MERN project
// app.use(bodyParser.json({limit:'10mb'}));
// app.use(express.urlencoded({extended:true, limit:'10mb'}));
// app.use(express.json());
// app.use(cookieParser())
// const corsOptions = {
//     origin: "http://localhost:5173/",
//     credentials: true,
// }
// app.use(cors(corsOptions))

// //api route
// app.use("/api/v1/user", userRoute);

// app.listen(PORT, ()=>{
//     connectDB();
//     console.log(`Server Listeing at Port : ${PORT}`);
// })


