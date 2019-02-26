let env = process.env.NODE_ENV || 'development';
const config = require('./../credentials')[env];

process.env.MONGODB_URI = `mongodb://${config.user}:${config.password}${config.database}`;