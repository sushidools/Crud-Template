const parser = require('body-parser');
const express = require('express');

const app = express();
const { PORT: port = 1999 } = process.env;

require('./server/config/database');

app.use(express.static(__dirname + '/public/dist/public'));
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

app.use(require('./server/routes'));

app.listen(port, () => console.log(`Express server listening on port ${port}`));