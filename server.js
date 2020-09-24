const express = require('express');
const path = require('path');
const app = express();
const connectdb = require('./config/db');



connectdb();

app.use( express.json({extended:false}));

app.use('/api/users',require('./routes/api/users'));

app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/posts',require('./routes/api/posts'));
app.use('/api/profile',require('./routes/api/profile'));


if (process.env.NODE_ENV==='production') {
    app.use(express.static('client/build'));
   
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}



const PORT=process.env.PORT ||5000;

app.listen(PORT,()=>console.log(`sever started at ${PORT}`));