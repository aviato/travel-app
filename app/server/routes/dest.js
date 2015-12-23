var express = require('express');
var router = express.Router();

var destController = require('../controllers/destController');


router.get('/', destController.getDestination);

router.get('/dests', destController.getDestinations);

router.get('/venues', destController.getVenues);

router.get('/venues/info', destController.getDetailedInfo);

module.exports = router;
