const router = require('express').Router();
const {TranslateDetect,TranslateFrom} = require('../controllers/translateController');

router.post('/', TranslateDetect);
router.post('/from', TranslateFrom);

module.exports = router;