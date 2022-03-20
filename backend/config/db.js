const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoConnect = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `MongoDB Connected: ${mongoConnect.connection.host}`.cyan.underline
    );
  } catch (error) {
    console.log(`Error: ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};

module.exports = connectDB;
