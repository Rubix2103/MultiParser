const { isInRange } = require('../shared-services/validator.js');

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;
const validatedPort = isInRange(port, 1024, 65535) ? port : 8080;

module.exports = {
  port: validatedPort,
  host: process.env.HOST || 'localhost',
  environment: process.env.NODE_ENV || 'development',
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
  database: {
    maxConnections: 10,
    idleTimeoutMs: 30000,
  },
  auth: {
    tokenExpirationSec: 3600,
    headerName: 'X-Auth-Token',
  },
};
