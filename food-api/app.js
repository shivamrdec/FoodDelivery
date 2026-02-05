import express from "express";
import {config} from "dotenv"
import cookieParser from "cookie-parser";
import cors from "cors";
import {connection} from "./database/dbConnection.js"
import { errorMiddleware } from "./middlewares/error.js";
import userRouter from "./routes/UserRouter.js";
import restaurantRouter from "./routes/RestaurantRouter.js";
import foodRouter from "./routes/FoodRouter.js";
import { removeUnverifiedAccounts } from "./automation/removeUnverifiedAccounts.js";
import orderRouter from "./routes/OrderRouter.js";
import cartRouter from "./routes/CartRouter.js";
export const app = express();
config({path: "./config.env"});

const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];

app.use(cors({
        origin: function (origin, callback) {
          if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
          } else {
            callback(new Error("Not allowed by CORS"));
          }
        },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
})
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use("/api/v1/user", userRouter);
app.use("/api/v1/restaurant", restaurantRouter);
app.use("/api/v1/food",foodRouter);
app.use('/uploads', express.static('uploads'));
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/order",orderRouter);


removeUnverifiedAccounts();
connection();

app.use(errorMiddleware);