import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import productRouter from "./routers/productRouter.js";
import userRouter from "./routers/userRouter.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// the above two app.use middlewares added to express - all requests that contain data get translated to req.body in node application

mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/reptizon", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// app.get("/api/products/:id", (req, res) => {
//   const product = data.products.find((x) => x._id === req.params.id);
//   if (product) {
//     res.send(product);
//   } else {
//     res.status(404).send({ message: "Product not found" });
//   }
// });

// app.get("/api/products", (req, res) => {
//   res.send(data.products);
// }); This was used when data was coming in staticly from data.js - now coming from MONGO

app.use("/api/users", userRouter);

app.use('/api/products', productRouter);

app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is up at http://localhost:${port}`);
});
