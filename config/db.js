const mongoose = require('mongoose');
const config = require('config');
const db= config.get('mongoURI');


const connectdb=async()=>{
    try {
        mongoose.connect(db,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex:true ,
        useFindAndModify:false
    });
        console.log('mongodb connected');

    
    } 
    catch (error) {
    console.log(error);
    process.exit(1);    
    }
}
module.exports=connectdb;