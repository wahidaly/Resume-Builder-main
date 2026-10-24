import mongoose from "mongoose";

const connectDb = async () => {
  const mongodbURI = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB_NAME || "Resume-Builder";

  if (!mongodbURI) {
    throw new Error("MONGODB_URI environment variable is not set");
  }

  mongoose.connection.on("connected", () => {
    console.log(`MongoDB connected successfully to database "${dbName}"`);
  });

  mongoose.connection.on("error", (error) => {
    console.error("MongoDB connection error:", error.message);
  });

  mongoose.connection.on("disconnected", () => {
    console.warn("MongoDB disconnected");
  });

  try {
    await mongoose.connect(mongodbURI, {
      dbName,
      serverSelectionTimeoutMS: 10000,
    });
  } catch (error) {
    console.error("Unable to connect to MongoDB:", error.message);
    throw error;
  }
};

export default connectDb;
