const mongoose = require("mongoose");

const mongoDbConnection = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/to-do", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error);
    process.exit(1);
  }
};

// CommonJS export
module.exports = mongoDbConnection;
