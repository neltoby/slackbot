require('./dotenv')();
const express = require('express');
const redisClient = require('./src/util/Redis-Client');
const { json, urlencoded } = require('body-parser');

const { connect } = require('./src/model');
const { logger } = require('./src/util/Logger');
const httpAdapter = require('./src/Event/httpAdapter');
const httpAllResponseAdapter = require('./src/Response/allUserResponse/httpAdapter');
const httpResponseAdapter = require('./src/Response/eachUserResponse/httpAdapter');
const httpActionAdapter = require('./src/Actions/httpAdapter');
const { eventController } = require('./src/Event/controller');
const { actionController } = require('./src/Actions/controller');
const {
  responseController,
} = require('./src/Response/eachUserResponse/controller');
const {
  allResponseController,
} = require('./src/Response/allUserResponse/controller');

const app = express();
const apiRoot = process.env.API_ROOT;

app.use(urlencoded({ extended: false }));

app.use(json());

app.use((req, res, done) => {
  logger.info(`${new Date()} :::: ${req.originalUrl}`);
  done();
});

app.post(`/${apiRoot}/event`, httpAdapter(eventController));

app.post(`/${apiRoot}/actions`, httpActionAdapter(actionController));

// app.post('/slack/event', async (req, res) => {
//     logger.info(`${new Date()} :::: server.endpoint.slack/event.`)
//     const { body } = req
//         res.send(body.challenge)

// })

app.get(`/${apiRoot}/response`, httpAllResponseAdapter(allResponseController));

app.get(`/${apiRoot}/response/:user`, httpResponseAdapter(responseController));

connect()
  .then(() => {
    logger.info(`${new Date()} :::: DB is connected`);
  })
  .catch((err) => {
    logger.error(
      `${new Date()} :::: db.connenction.failed. :::: ${err.message}`
    );
  });

const port = process.env.PORT || 8000;

app.set('port', port);

module.exports = app;
