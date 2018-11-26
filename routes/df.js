const router = require('express').Router()
const { reply, define, definefrench } = require('../controllers/df')

router.post('/', reply )
router.post('/define', define )
router.post('/definefrench', definefrench)

module.exports = router;