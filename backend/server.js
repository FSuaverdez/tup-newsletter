import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import 'colors';

import userRoutes from './routes/userRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import subCategoryRoutes from './routes/subCategoryRoutes.js';
import postRoutes from './routes/postRoutes.js';
import filteredWordRoutes from './routes/filteredWordRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

dotenv.config();

const app = express();

app.use(express.json({ limit: '50mb', extended: true }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello to TUP Newsletter API');
});

app.use('/user', userRoutes);
app.use('/category', categoryRoutes);
app.use('/subcategory', subCategoryRoutes);
app.use('/post', postRoutes);
app.use('/filteredword', filteredWordRoutes);

app.use(notFound);
app.use(errorHandler);

const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL)
  .then(conn => {
    console.log(`MongoDB Conencted: ${conn.connection.host}`.yellow.bold);
    app.listen(PORT, () => {
      console.log(`Server running on port : ${PORT}`.yellow.bold);
      console.log(
        `Server Link: `.green + `http://localhost:${PORT}`.green.underline
      );
    });
  })
  .catch(error => {
    console.log(error.message);
  });
