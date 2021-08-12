const mongoose = require("mongoose");

const connectDb = async () => {
  const conn = await mongoose.connect(
    "mongodb://test:test@cluster0-shard-00-00.irbgw.mongodb.net:27017,cluster0-shard-00-01.irbgw.mongodb.net:27017,cluster0-shard-00-02.irbgw.mongodb.net:27017/touristGuideDB?ssl=true&replicaSet=atlas-y7m3vg-shard-0&authSource=admin&retryWrites=true&w=majority",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  );
  console.log(`mongo connected: ${conn.connection.host}`);
};

module.exports = connectDb;
