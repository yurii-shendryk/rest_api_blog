const { MongoClient } = require('mongodb');

const collections = {};

const getCollections = () => {
  return collections;
};

const connectMongo = async () => {
  // connect our client
  const client = await MongoClient.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db(); // get our db
  collections.postsCollection = db.collection('posts'); // get collection with name 'posts'
};

module.exports = { connectMongo, getCollections };
