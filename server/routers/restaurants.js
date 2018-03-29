var express = require('express');
var router = express.Router();
var getRestaurantById = require('../../db/controllers/getRestaurantById.js');

router.use('/:id', express.static('client/dist'));
//router.use('/:id', express.static('public'));
//router.use('/:id', express.static(path.join(__dirname, '../../public')));

module.exports = router;
