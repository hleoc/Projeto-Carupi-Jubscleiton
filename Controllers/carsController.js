const { Router } = require('express');

const service = require('../Service/CarsService');

const auth = require('../Middlewares/auth');

const cars = Router();

cars.post('/', auth, async (req, res) => {
  try {
    const { brand, modelo, version, year, mileage, exchangeType, salePrice } = req.body;

    const { _id: userId } = req.user;
    const newCar = await service.create(
      brand,
      modelo,
      version,
      year,
      mileage,
      exchangeType,
      salePrice,
      userId,
    );

    if (newCar.error) {
      return res.status(newCar.statusCode).json({ message: newCar.message });
    }
    return res.status(201).json({ car: newCar });
  } catch (error) {
    res.status(500).json({ message: 'Algo está errado.' });
    // res.status(500).json({ message: error });
  }
});

cars.get('/', async (_req, res) => {
  const allCars = await service.getAll();
  return res.status(200).json(allCars);
});

cars.put('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { brand, modelo, version, year, mileage, exchangeType, salePrice } = req.body;
    const { _id: userId } = req.user;
    const toEditCar = await service.update(
      id,
      brand,
      modelo,
      version,
      year,
      mileage,
      exchangeType,
      salePrice,
      userId,
    );
    if (toEditCar.error) {
      return res.status(toEditCar.statusCode).json({ message: toEditCar.message });
    }
    return res.status(200).json(toEditCar);
  } catch (error) {
    return res.status(500).json({ message: 'Algo está errado.' });
  }
});

cars.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const car = await service.getById(id);
    if (car.error) {
      return res.status(car.statusCode).json({ message: car.message });
    }
    return res.status(200).json(car);
  } catch (error) {
    return res.status(500).json({ message: 'Algo está errado.' });
  }
});

cars.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const removeCar = await service.remove(id);
    if (!auth) return res.status(401).json({ message: 'missing auth token' });
    return res.status(204).json(removeCar);
  } catch (error) {
    return res.status(500).json({ message: 'Algo está errado.' });
  }
});

module.exports = cars;
