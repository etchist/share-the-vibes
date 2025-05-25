import mongoose from 'mongoose';

import { API_DB_URL, API_NODE_ENV } from '../config/env';

if (!API_DB_URL) throw new Error('DB_URL is not defined');

const connectToDatabase = async () => {
  try {
    await mongoose.connect(API_DB_URL);
  } catch (error) {
    console.log('Error connecting to database:', error);
    process.exit(1);
  }
};

export default connectToDatabase;
