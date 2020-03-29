require('dotenv').config();
const express = require('express');
const routes = require('./routes');
const cors = require('cors');

const app = express();

app.use(cors(process.env.FRONTEND));
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT || 3333, () => console.log('O servidor está online.'));