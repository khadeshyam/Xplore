const router = require("express").Router();
const Blog = require("../models/Blog");
const upload = require('../middlewares/multer');
const uplaodToCloudinary = require('../utils/upload-to-cloudinary');


//CREATE BLOG
router.post("/", upload.single('file'), async (req, res) => {
  console.log('req.body : ', req.body);
  console.log('req.file : ', req.file);
  try {
    const file = req.file;
    const uploadResponse = await uplaodToCloudinary(file);
    const downloadURL = uploadResponse.secure_url;
    const categories = req.body.categories ? JSON.parse(req.body.categories) : [];

    const newBlog = new Blog({
      username: req.body.username,
      title: req.body.title,
      desc: req.body.desc,
      photo: downloadURL,
      categories: categories
    });
    
    await newBlog.save();
    res.status(200).json(newBlog);
  } catch (err) {
    console.log('err posting: ', err);
    res.status(500).json(err);
  }
});

//UPDATE BLOG
router.put("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog.username === req.body.username) {
      try {
        const updatedBlog = await Blog.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedBlog);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your blog!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE BLOG
router.delete("/:id", async (req, res) => {
  try {
    console.log('DELETE BLOG');
    const blog = await Blog.findById(req.params.id);
    if (blog.username === req.body.username) {
      try {
        await Blog.findByIdAndDelete(req.params.id);
        res.status(200).json("Blog has been deleted...");
      } catch (err) {
        console.log('err deleting: blog', err);
        res.status(500).json(err);
      }
    } else {
      console.log('err deleting: blog');
      res.status(401).json("You can delete only your blog!");
    }
  } catch (err) {
    console.log('err deleting: blog', err);
    res.status(500).json(err);
  }
});

//GET BLOG
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL BLOGS
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  console.log('GET ALL users blogs');
  try {
    let blogs;
    if (username) {
      blogs = await Blog.find({ username });
    } else if (catName) {
      blogs = await Blog.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      blogs = await Blog.find();
    }
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
