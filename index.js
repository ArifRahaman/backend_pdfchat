const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
require("dotenv").config();
const http = require("http");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const authController = require("./controllers/Users/user");
const PostModel = require("./models/Post");
const authControllerPdf = require("./controllers/Pdf/Pdf");
const app = express();
const server = http.createServer(app);

app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve static files
// Middleware
app.use(cookieParser());
app.use(express.json());
const allowedOrigins = [
  // process.env.FRONTEND_URL || 
"https://frontend-pdfchat-2.onrender.com"
];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

mongoose
  .connect(
    "mongodb+srv://arifrahaman2606:NTambC6dzWTscSn1@mernstack.emb8nvx.mongodb.net/PDF",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });



  
app.use("/uploads", express.static("uploads"));
// Models
const EmployeeModel = require("./models/employee");
const PdfModel = require("./models/pdf");

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/pdfs"); // Specify the folder to save uploaded PDFs
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

const storageed = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Specify the destination directory for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Specify the file name format
  },
});

const uploaded = multer({ storageed });
const fileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/profileimage"); // Save uploaded files to the 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    ); // Generate unique filenames
  },
});

// Multer upload instance
const fileUpload = multer({ storage: fileStorage });

cloudinary.config({
  cloud_name: 'dzakqudwe',   // Replace with your Cloudinary cloud name
  api_key: '596374822562713',         // Replace with your Cloudinary API key
  api_secret: 'BDFaucGZXOOybNDG8LJcqDuxkNA',   // Replace with your Cloudinary API secret
});

// MongoDB connection URI
mongoose.connect('mongodb+srv://arifrahaman2606:NTambC6dzWTscSn1@mernstack.emb8nvx.mongodb.net/PDF', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
});

// Define a MongoDB schema for storing video URLs
const VideoSchema = new mongoose.Schema({
  videoUrl: { type: String, required: true },
  name: { type: String, required: true }, // Add name field
});
const Video = mongoose.model('Video', VideoSchema);

// Set up Cloudinary storage for multer
const storages = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'videos',               // Cloudinary folder where videos will be stored
    resource_type: 'video',         // Ensure that Cloudinary treats the file as a video
  },
});

const uploads = multer({ storages });

// Set up Express app


// Upload video to Cloudinary and save video URL to MongoDB
app.post('/upload', uploads.single('file'), async (req, res) => {
  try {
    const { name } = req.body; // Get video name from the request body
    const videoUrl = req.file.path; // Get video URL from Cloudinary response

    const newVideo = new Video({ videoUrl, name }); // Save both name and URL
    await newVideo.save();

    res.json({ videoUrl, name });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fetch stored video URLs and names from MongoDB
app.get('/videos', async (req, res) => {
  try {
    const videos = await Video.find(); // Fetch all video URLs and names from MongoDB
    res.json(videos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});






app.post(
  "/upload-profile-image",
  fileUpload.single("profileImage"),
  async (req, res) => {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    const { email } = req.body;
    const filePath = req.file.path;
    // const imageUrl = `http://localhost:3001/${filePath}`;
    const imageUrl = `http://your-backend-domain/uploads/${filePath}`; // Construct URL from backend
    try {
      const updatedUser = await EmployeeModel.findOneAndUpdate(
        { email },
        { profileImage: imageUrl },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).send("User not found.");
      }

      res.json({ user: updatedUser });
    } catch (error) {
      console.error("Error updating user profile image:", error);
      res.status(500).send("Internal Server Error");
    }
  }
);

app.get("/search", async (req, res) => {
  const { query } = req.query;
  try {
    const users = await EmployeeModel.find({
      $or: [
        { username: { $regex: query, $options: "i" } }, // Case-insensitive search for username
        { email: { $regex: query, $options: "i" } }, // Case-insensitive search for email
        { universityname: { $regex: query, $options: "i" } }, // Case-insensitive search for university name
      ],
    });
    res.json(users);
  } catch (error) {
    console.error("Error searching users:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/posts/:postId/like", async (req, res) => {
  const postId = req.params.postId;

  try {
    // Find the post by postId
    const post = await PostModel.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Update the likes and reset dislikes if necessary
    if (post.likes === 0) {
      post.likes = 1;
      if (post.dislikes !== 0) {
        post.dislikes = 0;
      }
      await post.save();
    }

    res
      .status(200)
      .json({ message: "Post liked successfully", likes: post.likes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/posts/:postId/dislike", async (req, res) => {
  const postId = req.params.postId;

  try {
    // Find the post by postId
    const post = await PostModel.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Update the dislikes and reset likes if necessary
    if (post.dislikes === 0) {
      post.dislikes = 1;
      if (post.likes !== 0) {
        post.likes = 0;
      }
      await post.save();
      res
        .status(200)
        .json({
          message: "Post disliked successfully",
          dislikes: post.dislikes,
        });
    }

    res
      .status(200)
      .json({ message: "Post disliked successfully", dislikes: post.dislikes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/posts/:postId/comments", async (req, res) => {
  const postId = req.params.postId;
  const { text } = req.body;
  try {
    // Find the post by postId
    const post = await PostModel.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    // Add the new comment to the post
    post.comments.push({ text });
    await post.save();

    res.status(200).json({
      message: "Comment added successfully",
      comment: post.comments[post.comments.length - 1],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.put("/changepassword", async (req, res) => {
  const { password, id } = req.body;

  try {
    // Find the user by ID
    const user = await EmployeeModel.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while changing the password" });
  }
});
app.post("/register", authController.register);

app.get("/pdfs/:pdfId", async (req, res) => {
  try {
    const { pdfId } = req.params;
    const pdf = await PdfModel.findById(pdfId);
    if (!pdf) {
      return res.status(404).json({ message: "PDF not found" });
    }

    // Send the PDF file as a download
    const filePath = path.join(__dirname, pdf.pdfPath);
    res.download(filePath);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

app.post("/posts", upload.single("cover"), async (req, res) => {
  const { title, summary, content, author, authorname, authorprofilepicture } =
    req.body; // Add author to destructuring
  const cover = req.file ? req.file.path : null;

  try {
    const post = new PostModel({
      title,
      summary,
      content,
      cover,
      author,
      authorname,
      authorprofilepicture,
    }); // Include author in the post creation
    await post.save();
    res.status(201).send(post);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});

app.get("/posts", async (req, res) => {
  try {
    const posts = await PostModel.find();
    const fullUrl = req.protocol + "://" + req.get("host");
    const postsWithFullUrl = posts.map((post) => {
      if (post.cover) {
        post.cover = `${fullUrl}/${post.cover}`;
      }
      return post;
    });
    res.status(200).send(postsWithFullUrl);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});

app.post("/login", authController.login);
app.post("/verify-otp", authController.verifyotp);

app.get("/posts/by-author/:authorId", async (req, res) => {
  try {
    const authorId = req.params.authorId;
    const posts = await PostModel.find({ author: authorId }).populate(
      "author comments.author"
    );
    res.json(posts); // Ensure this returns an array
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.put("/user/:id", async (req, res) => {
  try {
    const updatedUser = await EmployeeModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.post("/upload-pdf", upload.single("pdf"), authControllerPdf.uploadPdf);

app.get("/user-pdfs/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const userPdfs = await PdfModel.find({ userId });
    res.status(200).json(userPdfs);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching PDFs", error: error.message });
  }
});

app.get("/user-pdfs/:userId", authControllerPdf.getPdf);


app.delete("/posts/delete/:id", async (req, res) => {
  try {
    const deletesuccess = await PostModel.findByIdAndDelete(req.params.id);
    if (deletesuccess) {
      return res.json(success);
    }
  } catch (err) {
    console.log(err);
  }
});
app.delete("/delete-pdf/:id", authControllerPdf.deletedPdf);
// Edit PDF title
app.put("/edit-pdf-title/:id", async (req, res) => {
  try {
    const { title } = req.body;
    const pdf = await PdfModel.findByIdAndUpdate(
      req.params.id,
      { title },
      { new: true }
    );
    if (!pdf) {
      return res.status(404).send({ message: "PDF not found" });
    }
    res.send({ message: "PDF title updated successfully", pdf });
  } catch (error) {
    res.status(500).send({ message: "Error updating PDF title" });
  }
});

// const upload = multer({ dest: "uploads/" });

// Load Deepgram API key from environment variables

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// server.listen(3001, () => {
//   console.log("Server is running on port 3001");
// });
