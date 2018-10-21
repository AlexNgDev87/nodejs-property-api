const express = require('express');
const app = express();
const port = process.env.PORT || 3200;
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const routes = require('./api/routes/propertyRoutes');
routes(app);

app.use(errorHandler);
app.use(notFoundErrorHandler);

app.listen(port);

console.log('property RESTful API server started on: ' + port);

function errorHandler(err, req, res, next) {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        res.status(400).send({ error: 'Could not decode request: JSON parsing failed' });
    } else {
        next(err);
    }
}

function notFoundErrorHandler(req, res) {
    res.status(404).send({ url: req.originalUrl + ' was not found' });
}