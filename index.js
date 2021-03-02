const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(morgan('dev'));

app.use((req, res, next) => {
    req.requestTime = Date.now();
    console.log(req.method, req.path);
    next();
})
app.use('/dogs', (req, res, next) => {
    console.log("I Love Dogs")
    next();
})

const verifyPassword = ((req, res, next) => {       // Protecting Specific Routes
    const { password } = req.query;
    if(password === 'Vishu') {
        next();
    }
    res.send('SORRY you need a Password!')
})

app.get('/', (req, res) => {
    res.send('HOME PAGE!!')
})

app.get('/dogs', (req, res) => {
    console.log(`REQUEST.DATE: ${req.requestTime}`)
    res.send('WOOF WOOF!!')
})

app.get('/secret', verifyPassword, (req, res) => {
    res.send( 'My SECRET IS: SomeTimes I wear headPhones in public so I dont have to talk to anyone')
})


app.listen(3000, () => {
    console.log('App is running')
})