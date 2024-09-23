const router = require("express").Router();
const User = require("../models/User");
const Blog = require("../models/Blog");
const upload = require("../middlewares/multer");
const uplaodToCloudinary = require("../utils/upload-to-cloudinary");

//UPDATE
router.put("/:id", upload.single('file'), async (req, res) => {
  try {
    console.log('req.body ', req.body);
    console.log('req.params.id ', req.params.id);
    console.log('req.file ', req.file);

    if(req.file){
      const file = req.file;
      const uploadResponse = await uplaodToCloudinary(file);
      console.log('uploadResponse ', uploadResponse);
      const downloadURL = uploadResponse.secure_url;
      req.body.profilePic = downloadURL;
    }

    console.log('req.body ', req.body);

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    const { password, ...others } = updatedUser._doc;
    res.status(200).json(others);
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).json({ error: 'Username or email already in use' });
    } else {
      console.log('err updating: ', err);
      res.status(500).json(err);
    }
  }
});

//DELETE
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      try {
        await Blog.deleteMany({ username: user.username });
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {
      res.status(404).json("User not found!");
    }
  } else {
    res.status(401).json("You can delete only your account!");
  }
});

//GET USER
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
