const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });


// handling uncaught exceptions globally
process.on('uncaughtException', err => {
    console.log(`UNCAUGHT EXCEPTION: ${err.name}-- ${err.message}`);
    console.log(err);
    console.log('SHUTTING DOWN...💔');
    process.exit(1);
});


const app = require(`${__dirname}/app.js`);
const mongoose = require('mongoose');


const DB = process.env.DATABASE.replace(
    '<PASSWORD>', process.env.DATABASE_PASSWORD
);

// connecting to mondo db using mongoose 
mongoose
    .connect(DB, {
        useNewUrlParser: true
    }
    ).then(con =>
        console.log('DB connected successfully..')
    ).catch(err =>
        console.log('DB not connected..')
    );


// Server details
const port = process.env.PORT,
    hostname = process.env.HOSTNAME;

const server = app.listen(port, hostname, () =>
    console.log(`Server running on Port: ${port}`)
);

// handling unhandeled promises globally
process.on('unhandledRejection', err => {
    console.log(`UNHADELED REJECTION: ${err.name}-- ${err.message}`);
    console.log(err);
    console.log('SHUTTING DOWN...💔');
    server.close(() => process.exit(1));
});
