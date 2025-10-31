import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import dockerRoutes from "./routes/dockerRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: [
      "authorization",
      "x-client-info",
      "apikey",
      "content-type",
    ], 
  })
);

// Connect to MongoDB
connectDB();

// Routes
app.get("/", (request, response) => {
  response.setHeader("Content-Type", "text/html");
  // Send the simple HTML string
  response.status(200).send("<h1>Hello, world!</h1>");
});
app.use("/api/docker", dockerRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
