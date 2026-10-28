module.exports = {
  port: process.env.PORT || 8080,
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
};

