const express = require('express');
const app = express();
const morgan = require('morgan');

const AppError = require('./AppError')
app.use(morgan('dev'));

app.use((req, res, next) => {
    req.requestTime = Date.now();
    next();
})
app.use('/dogs', (req, res, next) => {
   // console.log("I Love Dogs")
    next();
})
const verifyPassword = ((req, res, next) => {       // Protecting Specific Routes
    const { password } = req.query;
    if(password === 'Vishu') {
        next();
    }
    //  res.send('SORRY you need a Password!')
    throw new AppError('PassWord required!', 401)                           //custom error handling
   
})
app.get('/', (req, res) => {
    res.send('HOME PAGE!!')
})

app.get('/error', (req, res) => {
   res.send('error!!', 500)
})

app.get('/dogs', (req, res) => {
    console.log(`REQUEST.DATE: ${req.requestTime}`)
    res.send('WOOF WOOF!!')
})

app.get('/secret', verifyPassword, (req, res) => {
    res.send( 'My SECRET IS: SomeTimes I wear headPhones in public so I dont have to talk to anyone')
})
app.get('/admin', (req, res) => {
    throw new AppError('You are not an Admin!!', 403)
})

app.use((req,res) => {
    res.status(404).send('NOT FOUND')
})
app.use ((err, req, res, next) => {                             //error handling 
    const { status = 500, message = 'Something Went Wrong'} = err;
    res.status(status).send(message)
})


app.listen(3000, () => {
    console.log('App is running')
})