const mongoose = require('mongoose');

async function conectMongodb(url){

    return mongoose.connect(url,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    });
}

module.exports = {conectMongodb};
