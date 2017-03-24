const router = require('express').Router();
module.exports = router;

router.use('/elements', require('./elements'));
router.use('/layouts', require('./layouts'));
router.use('/group', require('./group'));


