const mongoose = require('mongoose');
const { database } = require('./config');

console.log(database)

// connect to the database
const connectionString = `${database.client}://${database.host}:${database.port}`
console.log(connectionString)
console.log(database.options)
mongoose.connect(connectionString, database.options);
// some event listeners for console feedback
const connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', console.log.bind(console, 'Database connection complete!'));
