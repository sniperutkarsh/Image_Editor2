const express = require('express');
const userRouter = require('./routers/userRouter');
const utilRouter = require('./routers/util');
const filterRouter = require('./routers/filterRouter');

const cors= require('cors');

// two types of path 
// 1. relative path
// 2. absolute path


const app = express();

const port =5000;



// middleware
// to convert json to javascript 
app.use(express.json());
app.use(cors({
    origin : ['http://localhost:3000']
}));

app.use('/user',userRouter);
app.use('/util',utilRouter);
app.use('/filter',filterRouter);

app.use(express.static('./static/uploads'));

// routes
app.get('/', (req,res) => {
    // to generate string response
    res.send('response from express');
    // db operation
})
app.get('/home', (req,res) => {
    // to generate string response
    res.send('response from home');
})



app.listen(port,() => {
    console.log('express server started..')
})