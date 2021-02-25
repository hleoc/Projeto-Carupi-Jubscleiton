const frisby = require('frisby');
const { MongoClient } = require('mongodb');

const mongoDbUrl = 'mongodb://localhost:27017/Jubscleiton';
const url = 'http://localhost:3000';

describe('Endpoint para o cadastro de carro', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(mongoDbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = connection.db('Jubscleiton');
  });

  beforeEach(async () => {
    await db.collection('users').deleteMany({});
    await db.collection('cars').deleteMany({});
    const users = [
      { name: 'admin', email: 'root@email.com', password: 'admin' },
      {
        name: 'Hugo Costa',
        email: 'hugo@test.com',
        password: '12345678',
      },
    ];
    await db.collection('users').insertMany(users);
  });

  afterAll(async () => {
    await connection.close();
  });

  it('Será validado que não é possível cadastrar carro sem o campo "brand"', async () => {
    await frisby
      .post(`${url}/login/`, {
        email: 'hugo@test.com',
        password: '12345678',
      })
      .expect('status', 200)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        return frisby
          .setup({
            request: {
              headers: {
                Authorization: result.token,
                'Content-Type': 'application/json',
              },
            },
          })
          .post(`${url}/cars`, {
            modelo: 'Huracán',
            version: 'Teste',
            year: '2017',
            mileage: '11000',
            exchangeType: 'Automatic',
            salePrice: '1.800.000',
          })
          .expect('status', 400)
          .then((responseLogin) => {
            const { json } = responseLogin;
            expect(json.message).toBe('Invalid entries. Try again.');
          });
      });
  });

  it('Será validado que não é possível cadastrar carro sem o campo "modelo"', async () => {
    await frisby
      .post(`${url}/login/`, {
        email: 'hugo@test.com',
        password: '12345678',
      })
      .expect('status', 200)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        return frisby
          .setup({
            request: {
              headers: {
                Authorization: result.token,
                'Content-Type': 'application/json',
              },
            },
          })
          .post(`${url}/cars`, {
            brand: 'Lamborghini',
            version: 'Teste',
            year: '2017',
            mileage: '11000',
            exchangeType: 'Automatic',
            salePrice: '1.800.000',
          })
          .expect('status', 400)
          .then((responseLogin) => {
            const { json } = responseLogin;
            expect(json.message).toBe('Invalid entries. Try again.');
          });
      });
  });

  it('Será validado que não é possível cadastrar carro sem o campo "version"', async () => {
    await frisby
      .post(`${url}/login/`, {
        email: 'hugo@test.com',
        password: '12345678',
      })
      .expect('status', 200)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        return frisby
          .setup({
            request: {
              headers: {
                Authorization: result.token,
                'Content-Type': 'application/json',
              },
            },
          })
          .post(`${url}/cars`, {
            brand: 'Lamborghini',
            modelo: 'Huracán',
            year: '2017',
            mileage: '11000',
            exchangeType: 'Automatic',
            salePrice: '1.800.000',
          })
          .expect('status', 400)
          .then((responseLogin) => {
            const { json } = responseLogin;
            expect(json.message).toBe('Invalid entries. Try again.');
          });
      });
  });

  it('Será validado que não é possível cadastrar carro sem o campo "year"', async () => {
    await frisby
      .post(`${url}/login/`, {
        email: 'hugo@test.com',
        password: '12345678',
      })
      .expect('status', 200)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        return frisby
          .setup({
            request: {
              headers: {
                Authorization: result.token,
                'Content-Type': 'application/json',
              },
            },
          })
          .post(`${url}/cars`, {
            brand: 'Lamborghini',
            modelo: 'Huracán',
            version: 'Teste',
            mileage: '11000',
            exchangeType: 'Automatic',
            salePrice: '1.800.000',
          })
          .expect('status', 400)
          .then((responseLogin) => {
            const { json } = responseLogin;
            expect(json.message).toBe('Invalid entries. Try again.');
          });
      });
  });

  it('Será validado que não é possível cadastrar carro sem o campo "mileage"', async () => {
    await frisby
      .post(`${url}/login/`, {
        email: 'hugo@test.com',
        password: '12345678',
      })
      .expect('status', 200)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        return frisby
          .setup({
            request: {
              headers: {
                Authorization: result.token,
                'Content-Type': 'application/json',
              },
            },
          })
          .post(`${url}/cars`, {
            brand: 'Lamborghini',
            modelo: 'Huracán',
            version: 'Teste',
            year: '2017',
            exchangeType: 'Automatic',
            salePrice: '1.800.000',
          })
          .expect('status', 400)
          .then((responseLogin) => {
            const { json } = responseLogin;
            expect(json.message).toBe('Invalid entries. Try again.');
          });
      });
  });

  it('Será validado que não é possível cadastrar carro sem o campo "exchangeType"', async () => {
    await frisby
      .post(`${url}/login/`, {
        email: 'hugo@test.com',
        password: '12345678',
      })
      .expect('status', 200)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        return frisby
          .setup({
            request: {
              headers: {
                Authorization: result.token,
                'Content-Type': 'application/json',
              },
            },
          })
          .post(`${url}/cars`, {
            brand: 'Lamborghini',
            modelo: 'Huracán',
            version: 'Teste',
            year: '2017',
            mileage: '11000',
            salePrice: '1.800.000',
          })
          .expect('status', 400)
          .then((responseLogin) => {
            const { json } = responseLogin;
            expect(json.message).toBe('Invalid entries. Try again.');
          });
      });
  });

  it('Será validado que não é possível cadastrar carro sem o campo "salePrice"', async () => {
    await frisby
      .post(`${url}/login/`, {
        email: 'hugo@test.com',
        password: '12345678',
      })
      .expect('status', 200)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        return frisby
          .setup({
            request: {
              headers: {
                Authorization: result.token,
                'Content-Type': 'application/json',
              },
            },
          })
          .post(`${url}/cars`, {
            brand: 'Lamborghini',
            modelo: 'Huracán',
            version: 'Teste',
            year: '2017',
            mileage: '11000',
            exchangeType: 'Automatic',
          })
          .expect('status', 400)
          .then((responseLogin) => {
            const { json } = responseLogin;
            expect(json.message).toBe('Invalid entries. Try again.');
          });
      });
  });

  it('Será validado que não é possível cadastrar uma carro com token invalido', async () => {
    await frisby
      .setup({
        request: {
          headers: {
            Authorization: '6437658488',
            'Content-Type': 'application/json',
          },
        },
      })
      .post(`${url}/cars`, {
        brand: 'Lamborghini',
        modelo: 'Huracán',
        version: 'Teste',
        year: '2017',
        mileage: '11000',
        exchangeType: 'Automatic',
        salePrice: '1.800.000',
      })
      .expect('status', 401)
      .then((responseLogin) => {
        const { json } = responseLogin;
        expect(json.message).toBe('jwt malformed');
      });
  });

  it('Será validado que é possível cadastrar uma carro com sucesso', async () => {
    await frisby
      .post(`${url}/login/`, {
        email: 'hugo@test.com',
        password: '12345678',
      })
      .expect('status', 200)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        return frisby
          .setup({
            request: {
              headers: {
                Authorization: result.token,
                'Content-Type': 'application/json',
              },
            },
          })
          .post(`${url}/cars`, {
            brand: 'Lamborghini',
            modelo: 'Huracán',
            version: 'Teste',
            year: '2017',
            mileage: '11000',
            exchangeType: 'Automatic',
            salePrice: '1.800.000',
          })
          .expect('status', 201)
          .then((responseLogin) => {
            const { json } = responseLogin;
            expect(json.car.brand).toBe('Lamborghini');
            expect(json.car.modelo).toBe('Huracán');
            expect(json.car.version).toBe('Teste');
            expect(json.car.year).toBe('2017');
            expect(json.car.mileage).toBe('11000');
            expect(json.car.exchangeType).toBe('Automatic');
            expect(json.car.salePrice).toBe('1.800.000');
          });
      });
  });
});

describe('Endpoint para a listagem de carro', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(mongoDbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = connection.db('Jubscleiton');
  });

  beforeEach(async () => {
    await db.collection('users').deleteMany({});
    await db.collection('cars').deleteMany({});
    const users = [
      { name: 'admin', email: 'root@email.com', password: 'admin' },
      {
        name: 'Hugo Costa',
        email: 'hugo@test.com',
        password: '12345678',
      },
    ];
    await db.collection('users').insertMany(users);
    const Listcars = [
      {
        brand: 'Lamborghini',
        modelo: 'Huracán',
        version: 'Teste',
        year: '2017',
        mileage: '11000',
        exchangeType: 'Automatic',
        salePrice: '1.800.000',
      },
    ];
    await db.collection('cars').insertMany(Listcars);
  });

  afterAll(async () => {
    await connection.close();
  });

  it('Será validado que é possível listar todos os carros sem estar autenticado', async () => {
    await frisby
      .get(`${url}/cars/`)
      .expect('status', 200)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result[0].brand).toBe('Lamborghini');
        expect(result[0].modelo).toBe('Huracán');
        expect(result[0].version).toBe('Teste');
        expect(result[0].year).toBe('2017');
        expect(result[0].mileage).toBe('11000');
        expect(result[0].exchangeType).toBe('Automatic');
        expect(result[0].salePrice).toBe('1.800.000');
      });
  });

  it('Será validado que é possível listar todos as carros estando autenticado', async () => {
    await frisby
      .post(`${url}/login/`, {
        email: 'hugo@test.com',
        password: '12345678',
      })
      .expect('status', 200)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        return frisby
          .setup({
            request: {
              headers: {
                Authorization: result.token,
                'Content-Type': 'application/json',
              },
            },
          })
          .get(`${url}/cars`)
          .expect('status', 200)
          .then((response) => {
            const { body } = response;
            const result = JSON.parse(body);
            expect(result[0].brand).toBe('Lamborghini');
            expect(result[0].modelo).toBe('Huracán');
            expect(result[0].version).toBe('Teste');
            expect(result[0].year).toBe('2017');
            expect(result[0].mileage).toBe('11000');
            expect(result[0].exchangeType).toBe('Automatic');
            expect(result[0].salePrice).toBe('1.800.000');
          });
      });
  });
});
