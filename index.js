const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// const { default: Blog } = require("./Blog"); // Make sure the Blog model is correctly imported
const Blog = require("./Blog");
const blogRoutes = require("./Routes");

const app = express();


app.use(cors({
  origin: "http://localhost:5173",
}));

app.use(express.json());
app.use("/api/blogs", blogRoutes);

mongoose.connect("mongodb://127.0.0.1:27017/portfolio")
  .then(() => {
    console.log("DB connected");
  })
  .catch(() => {
    console.log("Database not connected");
  });

// Define routes for /api/blogs
app.get("/api/blogs", async (req, res) => {
    try {
      const blogs = await Blog.find(); // Fetch all blogs from the database
      res.json(blogs); // Return the blogs as JSON
    } catch (error) {
      console.error("Error fetching blogs:", error); // Log the error for debugging
      res.status(500).json({ message: "Error fetching blogs" });
    }
  });
  

app.post("/api/blogs", async (req, res) => {
    try {
      const { title, content } = req.body;
      if (!title || !content) {
        return res.status(400).json({ message: "Title and content are required" });
      }
      const newBlog = new Blog({ title, content });
      await newBlog.save();
      res.status(201).json(newBlog);
    } catch (error) {
      console.error("Error creating blog:", error); // Log the error for debugging
      res.status(500).json({ message: "Error creating blog" });
    }
  });
  

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
