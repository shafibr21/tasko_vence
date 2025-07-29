import express from "express";
import cors from "cors";
import "dotenv/config";
import { connect } from "mongoose";
import connectDB from "./config/mongodb.js";
// import connectCLoudinary from "./config/cloudinary.js"; // Commented out since not using cloudinary
import userRouter from "./routes/userRoute.js";

const frontend = process.env.FRONTEND_URL;
//App Config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
// connectCLoudinary(); // Commented out since not using cloudinary

//Middlewares
app.use(express.json());
app.use(
  cors({
    origin: frontend, // Your frontend URL
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);

// api endpoints
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("API Working 404");
});

app.listen(port, () => console.log("Server started on Port: " + port));
