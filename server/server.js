import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDb from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";
import resumeRouter from "./routes/resumeRoutes.js";
import aiRouter from "./routes/aiRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Server is live");
});

app.use("/api/users", userRouter);
app.use("/api/resumes", resumeRouter);
app.use("/api/ai", aiRouter);

// Don't accept requests until MongoDB is connected. This prevents the API
// from appearing healthy while queries are only buffering and timing out.
const startServer = async () => {
  try {
    await connectDb();

    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Backend startup aborted because MongoDB could not connect.");
    process.exit(1);
  }
};

startServer();
