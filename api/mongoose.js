const mongoose = require('mongoose');
const { database } = require('./config');

// connect to the database
const connectionString = `${database.client}://${database.host}:${database.port}`
mongoose.connect(connectionString, database.options)
// some event listeners for console feedback
const connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', console.log.bind(console, 'Database connection complete!'));
