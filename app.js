require('dotenv').config()

global.__base = __dirname+'/'

const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')

const session = require('express-session')
const sessionFileStore = require('session-file-store')(session)

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

if (process.env.CORS_ORIGIN) {
	let cors_origin = []

	for (let origin of process.env.CORS_ORIGIN.split(',')) {
		cors_origin.push(origin)
	}

	app.use(cors({
		origin: cors_origin,
		credentials: true
	}))
}

app.use(session({
	secret: 'clone-youtube-music',
	resave: false,
	saveUninitialized: true,
	store: new sessionFileStore()
}))


app.use(function(req, res, next){
	if (req.originalUrl != '/') {
		res.setHeader('Content-Type', 'application/json')
	}
	
	res.locals.locale = 'ko'


	next()
})


app.use('/', require('./routes/index'))
app.use('/music', require('./routes/music'))
app.use('/chart', require('./routes/chart'))


app.use(function(req, res, next){
	next(createError(404))
})

app.use(function(err, req, res, next){
	res.locals.message = err.message
	res.locals.error = process.env.NODE_ENV == undefined || process.env.NODE_ENV === 'development' ? err : {}

	res.status(err.status || 500)
	res.render('error')
})

module.exports = app