const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async () => {
  const dbConnection = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  });

  console.log(`MongoDB Connected 
  name: ${dbConnection.connection.name}
  port: ${dbConnection.connection.port}
  host: ${dbConnection.connection.host}`.yellow.bold);
}

module.exports = connectDB;