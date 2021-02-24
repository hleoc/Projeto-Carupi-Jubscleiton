const { ObjectId } = require('mongodb');

const getCollection = require('./get-connection');

const getByEmail = async ({ email }) =>
  getCollection('users').then((emai) => emai.findOne({ email }));

const create = async (name, email, password) =>
  getCollection('users')
    .then((user) => user.insertOne({ name, email, password }))
    .then((result) => ({ _id: result.insertedId, name, email }));

module.exports = {
  getByEmail,
  create,
  /* getById, */
};
