import express from "express";
import path from "path";
import cors from "cors";
import fileUpload from "express-fileupload";
import userRoute from "../routes/user.routes.js";
import foodRoute from "../routes/food.routes.js";
import orderRoute from "../routes/order.routes.js";
const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors("*"));
app.use(fileUpload());
app.use(express.json());
app.use(express.static(path.join(process.cwd(), "client")));

app.get("/", (req, res) => res.send("index.html"));
app.use(userRoute);
app.use(foodRoute);
app.use(orderRoute);

app.listen(PORT, () =>
  console.log("Server is running http://localhost:" + PORT)
);
