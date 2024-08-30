// import-dev-data.js
const mongoose = require('mongoose');
const fs = require('fs');
const dotenv = require('dotenv');
const Country = require('../models/countryModel');
// const countryNames = require('./countryNames.json'); // JSON file containing the list of countries
dotenv.config({path: './config.env'});

const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => console.log('DB conection successful!')
);

const countries = JSON.parse(fs.readFileSync(`${__dirname}/countryNames.jason`, 'utf-8'));

const importData = async () => {
    try {
        await Country.create(countries)
        console.log('Data successfully loaded!!!')
        process.exit();

    } catch (err) {
        console.log(err)
    }
};

const deleteData = async () => {
    try {
        await Country.deleteMany()
        console.log('Data successfully deleted!!!')
        process.exit();
    } catch (err) {
        console.log(err)
    }
};

if (process.argv[2] === '--import') {
    importData()
} else if (process.argv[2] === '--delete') {
    deleteData()
}

