const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const router = require('./src/routers/index')
const PORT = 8000;

app.listen(PORT, () => {
    console.log(`server is running at ${PORT}`);
});

app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router)