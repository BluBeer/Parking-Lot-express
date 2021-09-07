const parkingService = require('../services/parkingService');
const { redisClient } = require('../database');

const searchFreeSpots = async (req, res) => {
  const type = req.params.type;
  const data = await parkingService.searchFreeTypeSpots(type);
  res.status(200).send(data);
};

const getFloorStatus = async (req, res) => {
  const floor = req.params.floorNumber;
  const data = await parkingService.getFloorStatus(floor);
  res.status(200).send(data);
};

const bookSpot = async (req, res) => {
  const id = req.params.id;
  const type = req.body.type;
  await parkingService.searchAndBook(id, type);
  console.log('booked');
  redisClient.DEL('data');
  res.status(200).send();
};

const releaseSpot = async (req, res) => {
  const id = req.params.id;
  const type = req.body.type;
  await parkingService.searchAndRelease(id, type);
  redisClient.DEL('data');
  res.status(200).send();
};

const allFreeSpots = async (req, res) => {
  const data = await parkingService.getFloorStatus(0);
  redisClient.set('data', JSON.stringify(data));
  res.status(200).send(data);
};

const parkingLotInfo = async (req, res) => {
  const data = await parkingService.getParkingLotInfo();
  redisClient.set('info', data);
  res.status(200).send(data);
};

module.exports = {
  searchFreeSpots, getFloorStatus, bookSpot, releaseSpot, allFreeSpots, parkingLotInfo,
};
