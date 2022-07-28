let express    = require('express')
let bodyParser = require('body-parser')
let session    = require('express-session')
let Message    = require('./models/message')

let app = express()

app.set('view engine', 'ejs')

app.use(express.static('public'))

app.use(bodyParser.urlencoded({extended: false}))

app.use(bodyParser.json())

app.use(session({
    secret           : '3423edwedfdefdwe',
    resave           : false,
    saveUninitialized: true,    
    cookie           : { secure: false }
}))

app.use(require('./middlewares/flash'))

app.get('/', (req, res) => {
    Message.all( (messages) => {
        res.render('index', {messages: messages})
    })
})

app.post('/', (req, res) => {
    if (req.body.message == undefined || req.body.message === '')
    {
        req.flash('error', "Vous n'avez pas entré de message")

        res.redirect('/')
    }
    else
    {
        Message.create(req.body.message, function () {
            req.flash('success', "Votre message a bien été envoyé")

            res.redirect('/')
        })
    }
})

app.get('/message/:id', (req, res) => {
    Message.find(req.params.id, (message) => {
        res.render('message', {message: message})
    })
})

app.listen(8000)