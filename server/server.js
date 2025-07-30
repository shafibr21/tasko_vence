import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import userRouter from "./routes/userRoute.js";
import taskRouter from "./routes/taskRoute.js";

const frontend = process.env.FRONTEND_URL;
//App Config
const app = express();
const port = process.env.PORT || 5000;
connectDB();


//Middlewares
app.use(express.json());
app.use(
  cors({
    origin: frontend,
    credentials: true, 
  })
);
app.use(cookieParser());
// api endpoints
app.use("/api/user", userRouter);
app.use("/api/task", taskRouter);

app.get("/", (req, res) => {
  res.send("API Working 404");
});

app.listen(port, () => console.log("Server started on Port: " + port));
