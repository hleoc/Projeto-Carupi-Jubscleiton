const { ObjectId } = require('mongodb');

const getCollection = require('./get-connection');

const getAllDois = async (carros) => {
  if (!carros.initialYear || !carros.lastYear) {
    return await getCollection('cars').then((car) => car.find({...carros}).toArray());
  } else if (carros.initialYear && carros.lastYear) {
    return await getCollection('cars').then((car) =>
      car.find({$and: [{"year": {$gte: carros.initialYear}}, {"year": {$lte: carros.lastYear}}]}).toArray(),
    );
  }
};

const create = async (brand, modelo, version, year, mileage, exchangeType, salePrice, userId) =>
  getCollection('cars')
    .then((car) =>
      car.insertOne({ brand, modelo, version, year, mileage, exchangeType, salePrice, userId }),
    )
    .then((result) => ({
      _id: result.insertedId,
      brand,
      modelo,
      version,
      year,
      mileage,
      exchangeType,
      salePrice,
      userId,
    }));

const getAll = async () => getCollection('cars').then((car) => car.find().toArray());

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return getCollection('cars').then((car) => car.findOne({ _id: ObjectId(id) }));
};

const update = async (
  id,
  { brand, modelo, version, year, mileage, exchangeType, salePrice },
  userId,
) => {
  if (!ObjectId.isValid(id)) return null;
  getCollection('cars').then((car) =>
    car.updateOne(
      { _id: ObjectId(id) },
      { $set: { brand, modelo, version, year, mileage, exchangeType, salePrice, userId } },
    ),
  );
  return { _id: id, brand, modelo, version, year, mileage, exchangeType, salePrice, userId };
};

const exclude = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return getCollection('cars').then((car) => car.deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  getAll,
  create,
  getById,
  update,
  exclude,
  getAllDois,
};


// db.cars.find({$and: [{"year": {$gte: "2009"}}, {"year": {$lte: "2011"}}]})