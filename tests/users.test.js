const frisby = require('frisby');
const { MongoClient } = require('mongodb');

const mongoDbUrl = 'mongodb://localhost:27017/Jubscleiton';
const url = 'http://localhost:3000';

describe('Endpoint para o cadastro de usuários', () => {
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
    const users = {
      name: 'admin', email: 'root@email.com', password: 'admin' };
    await db.collection('users').insertOne(users);
  });

  afterAll(async () => {
    await connection.close();
  });

  it('Será validado que o campo "name" é obrigatório', async () => {
    await frisby
      .post(`${url}/users/`,
        {
          email: 'hugo@test.com',
          password: '12345678',
        })
      .expect('status', 400)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('Invalid entries. Try again.');
      });
  });

  it('Será validado que o campo "email" é obrigatório', async () => {
    await frisby
      .post(`${url}/users/`,
        {
          name: 'Hugo Costa',
          password: '12345678',
        })
      .expect('status', 400)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('Invalid entries. Try again.');
      });
  });

  it('Será validado que não é possível cadastrar usuário com o campo email inválido', async () => {
    await frisby
      .post(`${url}/users/`,
        {
          name: 'Hugo Costa',
          email: 'hugo',
          password: '12345678',
        })
      .expect('status', 400)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('Invalid entries. Try again.');
      });
  });

  it('Será validado que o campo "senha" é obrigatório', async () => {
    await frisby
      .post(`${url}/users/`,
        {
          name: 'Hugo Costa',
          email: 'hugo',
        })
      .expect('status', 400)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('Invalid entries. Try again.');
      });
  });

  it('Será validado que o campo "email" é único', async () => {
    await frisby
      .post(`${url}/users/`,
        {
          name: 'Hugo Costa',
          email: 'hugo@test.com',
          password: '12345678',
        })
      .expect('status', 201);
      
    await frisby
      .post(`${url}/users/`,
        {
          name: 'Hugo Costa',
          email: 'hugo@test.com',
          password: '12345678',
        })
      .expect('status', 409)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('Email already registered');
      });
  });

  it('Será validado que é possível cadastrar usuário com sucesso', async () => {
    await frisby
      .post(`${url}/users/`,
        {
          name: 'Hugo Costa',
          email: 'hugo@test.com',
          password: '12345678',
        })
      .expect('status', 201)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.user.name).toBe('Hugo Costa');
        expect(result.user.email).toBe('hugo@test.com');
      });
  });

  it('Será validado que é possível ao cadastrar usuário, o valor do campo "role" tenha o valor "user"', async () => {
    await frisby
      .post(`${url}/users/`,
        {
          name: 'Hugo Costa',
          email: 'hugo@test.com',
          password: '12345678',
        })
      .expect('status', 201)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.user.name).toBe('Hugo Costa');
        expect(result.user.email).toBe('hugo@test.com');
      });
  });
});

describe('Endpoint para o login de usuários', () => {
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
    const users = {
      name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin' };
    await db.collection('users').insertOne(users);
  });

  afterAll(async () => {
    await connection.close();
  });

  it('Será validado que o campo "email" é obrigatório', async () => {
    await frisby
      .post(`${url}/login/`,
        {
          password: '12345678',
        })
      .expect('status', 401)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('All fields must be filled');
      });
  });

  it('Será validado que o campo "password" é obrigatório', async () => {
    await frisby
      .post(`${url}/login/`,
        {
          email: 'hugo@test.com',
        })
      .expect('status', 401)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('All fields must be filled');
      });
  });

  it('Será validado que não é possível fazer login com um email inválido', async () => {
    await frisby
      .post(`${url}/login`,
        {
          email: 'hugo@3.com',
          password: '12345678',
        })
      .expect('status', 401)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('Incorrect username or password');
      });
  });

  it('Será validado que não é possível fazer login com uma senha inválida', async () => {
    await frisby
      .post(`${url}/login`,
        {
          email: 'hugo@gmail.com',
          password: '123456',
        })
      .expect('status', 401)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('Incorrect username or password');
      });
  });

  it('Será validado que é possível fazer login com sucesso', async () => {
    await frisby
      .post(`${url}/users/`,
        {
          name: 'Hugo Costa',
          email: 'hugo@gmail.com',
          password: '12345678',
        })
      .expect('status', 201)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        return frisby
          .post(`${url}/login`,
            {
              email: result.user.email,
              password: '12345678',
            })
          .expect('status', 200)
          .then((responseLogin) => {
            const { json } = responseLogin;
            expect(json.token).not.toBeNull();
          });
      });
  });
});
