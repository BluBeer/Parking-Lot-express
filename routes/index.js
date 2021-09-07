const express = require('express');

const router = express.Router();
const parkingController = require('../controllers/parkingController');
const parkingMiddleware = require('../middleware');
const checkValue = require('../validations');
const schemas = require('../validations/schema');

router.get('/search/:type', checkValue(schemas.vehicleType), parkingController.searchFreeSpots);
router.get('/floor/:floorNumber', checkValue(schemas.floorType), parkingController.getFloorStatus);
router.put('/book/:id', parkingController.bookSpot);
router.put('/release/:id', parkingController.releaseSpot);
router.get('/home', parkingMiddleware.checkData('data'), parkingController.allFreeSpots);
router.get('/', parkingMiddleware.checkData('info'), parkingController.parkingLotInfo);

router.use((req, res) => {
  console.log('Page you are looking for is not available, please check');
  res.send('Page not found');
});
module.exports = router;
