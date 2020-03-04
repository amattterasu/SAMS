const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 4000 || process.env.PORT;

mongoose.connect('mongodb://localhost/token-db', { useNewUrlParser: true } )
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

app.use(bodyParser.json());

app.use('/api', require('./api'));

app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}`);
});