const express = require('express');
const app = express();
const connectdb = require('./config/db');

app.get('/',(req,res)=>res.send('hello'));

connectdb();

app.use( express.json({extended:false}));

app.use('/api/users',require('./routes/api/users'));

app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/posts',require('./routes/api/posts'));
app.use('/api/profile',require('./routes/api/profile'));

PORT=process.env.PORT ||5000;

app.listen(PORT,()=>console.log(`sever started at ${PORT}`));