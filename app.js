const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const app = express()
// import router
const authRouter = require('./routes/authRouter')
// set up view engine
app.set('view engine','ejs')
app.set('views','views')

// middleware array
const middleware = [
    morgan('dev'),
    express.static('public'),
    express.urlencoded({extended : true}),
    express.json()
]

app.use(middleware)      
app.use('/auth',authRouter)

app.get('/',(req,res) =>{
    res.render('pages/hompage', {title : 'Homepage'})
})

const DB = `mongodb+srv://niaz:281198@cluster0.zozv5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose.connect(DB,({
    useNewUrlParser : true,
    useCreateIndex : true,
    useUnifiedTopology : true,
    useFindAndModify : false
})).then(()=>{
    console.log('Database connected successfully...')
})

const port = 5000;
app.listen(port,()=>{
    console.log(`App is running on port ${port}....`)
})

module.exports = app