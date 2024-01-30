import http from "http";
import express, { Request, Response, Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./config/db";
import Routes from "./routes/v1";
import { ErrorHandler } from "./middleware/ErrorHandler";

dotenv.config();

const PORT = process.env.PORT || "8080";

const app: Express = express();
const server = http.createServer(app);

//middlewares
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:8080", "http://localhost:5173"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/api/v1", Routes);

// Defult Get API
app.get("/api/v1", (req: Request, res: Response) => {
  res.send("Hello From Node MongoDB Server");
});

app.all("*", (req: Request, res: Response) => {
  res.send("NO route found.");
});
//error handler
app.use(ErrorHandler);

db.then(() => {
  server.listen(parseInt(PORT), () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

process.on("unhandledRejection", (error: Error) => {
  console.error(error.name, error.message);

  // Gracefully close the server
  server.close(() => {
    console.log("Server is closed.");
    process.exit(1);
  });
});
