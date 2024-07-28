const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const upload = require('../middlewares/multer');
const uplaodToCloudinary = require('../utils/upload-to-cloudinary');


//CREATE POST
router.post("/", upload.single('file'), async (req, res) => {
  console.log('req.body : ', req.body);
  console.log('req.file : ', req.file);
  try {
    const file = req.file;
    const uploadResponse = await uplaodToCloudinary(file);
    const downloadURL = uploadResponse.secure_url;
    const categories = req.body.categories ? JSON.parse(req.body.categories) : [];

    const newPost = new Post({
      username: req.body.username,
      title: req.body.title,
      desc: req.body.desc,
      photo: downloadURL,
      categories: categories
    });
    
    await newPost.save();
    res.status(200).json(newPost);
  } catch (err) {
    console.log('err posting: ', err);
    res.status(500).json(err);
  }
});

//UPDATE POST
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE POST
router.delete("/:id", async (req, res) => {
  try {
    console.log('DELETE POST');
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json("Post has been deleted...");
      } catch (err) {
        console.log('err deleting: post', err);
        res.status(500).json(err);
      }
    } else {
      console.log('err deleting: post');
      res.status(401).json("You can delete only your post!");
    }
  } catch (err) {
    console.log('err deleting: post', err);
    res.status(500).json(err);
  }
});

//GET POST
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL POSTS
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
