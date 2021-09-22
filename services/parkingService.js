/* eslint-disable no-unused-vars */
async function searchFreeTypeSpots(type) {
  const data = await global.db.collection('Spots').find({ 'type': type }).project({ _id: 0, slots: 1 });
  const arr = [];
  await data.forEach((item) => {
    item.slots.forEach((itr) => {
      if (itr.isOccupied === false) arr.push(itr);
    });
  });
  return arr;
}

async function calculateVacantSpots(type, floor) {
  let num = 0;
  const data = await global.db.collection('Spots').find({ 'type': type }).project({ _id: 0, slots: 1 });
  await data.forEach((item) => {
    item.slots.forEach((itr) => {
      if (((floor == 0) || itr.floor == floor) && itr.isOccupied == false) {
        num++;
      }
    });
  });
  return num;
}

async function getFloorStatus(floor) {
  const data = { car: await calculateVacantSpots('car', floor), truck: await calculateVacantSpots('truck', floor), bike: await calculateVacantSpots('bike', floor) };
  return data;
}

async function searchAndBook(id, type) {
  let data = await global.db.collection('Spots').findOne({ 'slots.id': id });
  if (data == null) console.log('Wrong Booking id');
  data = data.slots;
  const index = data.findIndex((obj1) => obj1.id == id);
  data[index].isOccupied = true;
  await global.db.collection('Spots').updateOne({ 'slots.id': id }, { $set: { slots: data } });
}

async function searchAndRelease(id, type) {
  let data = await global.db.collection('Spots').findOne({ 'slots.id': id });
  if (data == null) console.log('Wrong Releasing id');
  data = data.slots;
  const index = data.findIndex((obj1) => obj1.id == id);
  data[index].isOccupied = false;
  await global.db.collection('Spots').updateOne({ 'slots.id': id }, { $set: { slots: data } });
}

function setResponse(data) {
  return `<p>Welcome to <b>${data.name}</b>. We have total <b>${data.totalFloors}</b> floors and total <b>${data.totalSpots}</b> spots for parking</p>`;
}

async function getParkingLotInfo() {
  const data = await global.db.collection('Info').findOne();
  return setResponse(data);
}

async function checkLogIn(username, password) {
  const data = await global.db.collection('User').findOne({ username });
  if (password == data.password) return `<h1>Password matched, Welcome ${username}</h1>`;
  return '<h1>Password not matched</h1>';
}

module.exports = {
  searchFreeTypeSpots,
  getFloorStatus,
  searchAndBook,
  searchAndRelease,
  getParkingLotInfo,
  checkLogIn,
};
