const { ObjectID } = require('mongodb');

const getAllPosts = async (req, res) => {
  const posts = await req.db.postsCollection.find({}).toArray();
  res.json({ posts });
};

const getPostById = async (req, res) => {
  const id = req.params.id;
  const post = await req.db.postsCollection.findOne({ _id: ObjectID(id) });
  if (!post) {
    return res
      .status(400)
      .json({ status: `failure, no user with id ${id} not found` });
  }
  res.json({ post, status: 'success' });
};

const addPost = async (req, res) => {
  const { topic, text } = req.body;
  await req.db.postsCollection.insert({ topic, text });
  res.json({ status: 'success' });
};

const changePost = async (req, res) => {
  const id = req.params.id;
  const { topic, text } = req.body;
  await req.db.postsCollection.updateOne(
    { _id: ObjectID(id) },
    { $set: { topic, text } }
  );
  res.json({ status: 'success' });
};

const removePost = async (req, res) => {
  const id = req.params.id;
  await req.db.postsCollection.deleteOne({ _id: ObjectID(id) });
  res.json({ status: 'success' });
};

module.exports = {
  getAllPosts,
  getPostById,
  addPost,
  changePost,
  removePost,
};
