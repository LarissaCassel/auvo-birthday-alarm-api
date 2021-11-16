import mongoose from 'mongoose';
import 'dotenv/config'; 

const {URI} = process.env;

mongoose
  .connect(URI)
  .then(() => console.log('DB is Up!'))
  .catch((err) => console.log(err));