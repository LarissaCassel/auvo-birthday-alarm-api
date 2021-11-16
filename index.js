import 'dotenv/config'; 
import './database.js';

import busboy from 'connect-busboy';
import busboyBodyParser from 'busboy-body-parser';

//models
import userRoutes from './src/routes/user.routes.js';
import friendRoutes from './src/routes/friend.routes.js';

const app = express();

import express from 'express';
import cors from 'cors';

app.use(express.json());
app.use(cors());
app.use(busboy());
app.use(busboyBodyParser());

// routes
app.use('/user', userRoutes);
app.use('/friend', friendRoutes);

app.listen(process.env.PORT || 8000, function () {
    console.log('API RODANDO');
  });