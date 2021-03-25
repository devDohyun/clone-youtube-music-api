const express = require('express')
const router = express.Router()


router.get('/', (req, res) => {
	return res.render('index', {
		node_env: process.env.NODE_ENV == undefined ? 'development' : process.env.NODE_ENV,
		title: process.env.TITLE,
		frontend_url: process.env.FRONTEND_URL,
		locale: res.locals.locale
	})
})


module.exports = router