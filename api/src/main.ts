/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';

import storiesRouter from './routes/stories.routes';
import connectToDatabase from './database/mongodb';
import { API_NODE_ENV } from './config/env';

const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to api!' });
});

console.log(`API_NODE_ENV: ${API_NODE_ENV}`);
app.use('/api/v1/stories', storiesRouter);
console.log('Registered stories routes');

const port = process.env.API_PORT || 3333;
const server = app.listen(port, async () => {
  console.log(`Listening at http://localhost:${port}/api`);
  await connectToDatabase();
  console.log(`Connected to database in ${API_NODE_ENV}`);
});
server.on('error', console.error);
