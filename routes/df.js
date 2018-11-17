const router = require('express').Router()
const { reply, define } = require('../controllers/df')

router.post('/', reply )
router.post('/define', define )

module.exports = router;