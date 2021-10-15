const posts = require("../model/post");
const uuid = require("uuid");

const getPosts = async (req, res) => {
  res.status(200).json(posts);
};

const addPost = (req, res) => {
  try {
    const { title, relationship_content, author } = req.body;

    if (!title || !author) {
      return res.status(409).json({
        message: "All fields are required!",
      });
    }

    const titleAlreadyExists = posts.find((post) => post.title === title);

    if (titleAlreadyExists) {
      return res.status(409).json({
        message: "Post already exists",
      });
    }

    const id = uuid.v4();

    const newPost = {
      id,
      title,
      relationship_content,
      author,
      created_at: new Date(),
    };

    posts.push(newPost);

    res.status(200).json(newPost);
  } catch (error) {
    res.status(503).json({
      message: "Error create post!",
      error: error.message,
    });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, relationship_content, author } = req.body;

    const postAlreadyExists = posts.find((post) => post.id === id);

    if (postAlreadyExists.id !== id) {
      return res.status(409).json({
        message: "Post already exists",
      });
    }

    const post = posts.find((post) => post.id === id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    const index = posts.indexOf(post);

    posts[index] = {
      id,
      title,
      relationship_content,
      author,
      created_at: new Date(),
    };

    res.status(200).json(posts[index]);
  } catch (error) {
    res.status(503).json({
      message: "Error update post!",
      error: error.message,
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = posts.find((post) => post.id === id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found!",
      });
    }

    const indexPost = posts.indexOf(post);

    posts.splice(indexPost, 1);

    return res.status(200).json({
      ok: true,
    });
  } catch (error) {
    res.status(503).json({
      message: "Error delete post!",
      error: error.message,
    });
  }
};

module.exports = {
  getPosts,
  addPost,
  updatePost,
  deletePost,
};
