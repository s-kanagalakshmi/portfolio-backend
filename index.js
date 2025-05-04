const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// const { default: Blog } = require("./Blog"); // Make sure the Blog model is correctly imported
const Blog = require("./Blog");
const blogRoutes = require("./Routes");
const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors())
// app.use(cors({
//   origin: "https://portfolio-frontend-five-khaki.vercel.app/",
// }));

app.use(express.json());
app.use("/api/blogs", blogRoutes);

mongoose.connect("mongodb+srv://kanagalakshmimca16:6Q2rVZ50EoXokz42@my-portfolio.jgqoiiq.mongodb.net/Portfolio?retryWrites=true&w=majority&appName=My-Portfolio")
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
  

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
