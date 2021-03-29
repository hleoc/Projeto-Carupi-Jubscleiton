const model = require('../Models/Car');

const getAll = async () => model.getAll();

const getAllDois = async (brand, modelo, version, initialYear, lastYear, mileage, exchangeType, salePrice) => {
  const carros = {};
  if (brand) {
    carros.brand = brand;
  }
  if (modelo) {
    carros.modelo = modelo;
  }
  if (version) {
    carros.version = version;
  }
  if (initialYear) {
    carros.initialYear = initialYear;
  }
  if (lastYear) {
    carros.lastYear = lastYear;
  }
  if (mileage) {
    carros.mileage = mileage;
  }
  if (exchangeType) {
    carros.exchangeType = exchangeType;
  }
  if (salePrice) {
    carros.salePrice = salePrice;
  }
  return model.getAllDois(carros)
}

const create = async (brand, modelo, version, year, mileage, exchangeType, salePrice, userId) => {
  if (!brand || !modelo || !version || !year || !mileage || !exchangeType || !salePrice) {
    return {
      error: true,
      code: 'invalid_data',
      message: 'Invalid entries. Try again.',
      statusCode: 400,
    };
  }
  
  return model.create(brand, modelo, version, year, mileage, exchangeType, salePrice, userId);
};

const update = async (id, brand, modelo, version, year, mileage, exchangeType, salePrice, userId) => {
  const car = await model.getById(id);
  if (!car) {
    return {
      error: true,
      code: 'invalid_data',
      message: 'Algo deu errado',
      statusCode: 401,
    };
  }
  return model.update(id, { brand, modelo, version, year, mileage, exchangeType, salePrice }, userId);
};

const getById = async (id) => {
  const car = await model.getById(id);
  if (!car) {
    return {
      error: true,
      code: 'invalid_data',
      message: 'recipe not found',
      statusCode: 404,
    };
  }
  return car;
};

const remove = async (id) => {
  const car = await model.exclude(id);
  if (!car) {
    return {
      error: true,
      code: 'invalid_data',
      message: 'Algo deu errado',
      statusCode: 500,
    };
  }
  return car;
};

module.exports = {
  getAll,
  create,
  update,
  getById,
  remove,
  getAllDois,
};
