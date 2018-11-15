const router = require('express').Router()
const { reply } = require('../controllers/df')

router.post('/', reply )

module.exports = router;