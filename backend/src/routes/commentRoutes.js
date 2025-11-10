const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const Comment = require("../models/Comment");

// Create comment
router.post("/:postId", auth, async (req, res) => {
  try {
    const comment = await Comment.create({
      postId: req.params.postId,
      userId: req.userId,
      text: req.body.text,
    });
    const populated = await comment.populate("userId", "name");
    res.json(populated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get comments for a post
router.get("/:postId", async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId })
      .populate("userId", "name")
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
