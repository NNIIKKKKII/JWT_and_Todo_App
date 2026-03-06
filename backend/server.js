import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";

dotenv.config();
connectDB();



const app = express();
app.use(express.json());
app.use(cors())

app.get("/", (req, res) => {
    res.send("Hello World!");
});


app.use("/api/users", userRoutes);


app.use("/api/tasks", taskRoutes);


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});