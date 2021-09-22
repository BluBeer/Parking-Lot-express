const express = require('express');
const passport = require('passport');

const router = express.Router();
const parkingController = require('../controllers/parkingController');
const parkingMiddleware = require('../middleware');
const checkValue = require('../validations');
const schemas = require('../validations/schema');

router.get('/search/:type', parkingMiddleware.isLogIn, checkValue(schemas.vehicleType), parkingController.searchFreeSpots);
router.get('/floor/:floorNumber', parkingMiddleware.isLogIn, checkValue(schemas.floorType), parkingController.getFloorStatus);
router.put('/book/:id', parkingMiddleware.isLogIn, parkingController.bookSpot);
router.put('/release/:id', parkingMiddleware.isLogIn, parkingController.releaseSpot);
router.get('/home', parkingMiddleware.checkData('data'), parkingController.allFreeSpots);
router.get('/', parkingMiddleware.checkData('info'), parkingController.parkingLotInfo);
router.get('/login', parkingController.getUserLogIn);
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/google/failed' }),
  (req, res) => {
    res.redirect(req.session.returnTo || '/google/login');
    delete req.session.returnTo;
  });
router.get('/google/failed', (req, res) => {
  res.send('You failed to log in');
});
router.get('/google/login', (req, res) => {
  res.send(`Login successful. Welcome Mr ${req.user.Name}`);
});

router.use((req, res) => {
  console.log('Page you are looking for is not available, please check');
  res.send('Page not found');
});
module.exports = router;
