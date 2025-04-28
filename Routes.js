const express=require("express")
const Blog = require("./Blog");
const router = express.Router();
module.exports = router;

router.get("/", async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.json(blogs);
});

router.post("/", async (req, res) => {
  const { title, content } = req.body;
  const newBlog = new Blog({ title, content });
  await newBlog.save();
  res.status(201).json(newBlog);
});

router.post("/:id/like", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  blog.likes += 1;
  await blog.save();
  res.json(blog);
});

router.post("/:id/comment", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  blog.comments.push({ text: req.body.text });
  await blog.save();
  res.json(blog);
});

// export default router;
