const mongoose = require('mongoose');

mongoose.set('strictQuery', true);
const url = process.env.DATABASE;

mongoose.connect(url, {useNewUrlParser: true}).then( () => {
    console.log('Database connected');
} ).catch( (err) => {
    console.log(err);
} )