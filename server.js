
const mongoose = require('mongoose');

process.on('uncaughtException', err => {
    console.log('uncaught Exception...... shutting down....')
    console.log(err)
    server.close(() => {
        process.exit(1)
    })
})

const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');


const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);

mongoose.connect( DB , {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => console.log('DB conection successful!')
);




const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`App running on port ${port}....`)
});

process.on('unhandledRejection', err => {
    console.log('unhandler Rejection...... shutting down....')
    console.log(err.name, err.message)
    server.close(() => {
        process.exit(1)
    })
});