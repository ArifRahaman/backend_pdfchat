# PDF Chat Backend

This repository contains the backend implementation for managing and interacting with PDF files and user accounts. It offers functionalities such as user authentication, PDF management, and cloud storage integration. This backend is built using Node.js and Express.js, with MongoDB for data storage.

## Features

- User registration and login with password hashing.
- OTP generation and email sending for authentication.
- PDF file upload and management.
- Cloud storage integration using Cloudinary.
- Static file serving for uploaded media.
- JWT token generation and management for secure authentication.
- MongoDB integration for data persistence.

## Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB with Mongoose**
- **Multer** for file uploads
- **Cloudinary** for cloud storage
- **Nodemailer** for sending emails
- **jsonwebtoken** for authentication
- **dotenv** for environment variable management
- **bcrypt** for password hashing
- **cors** for enabling CORS
- **cookie-parser** for cookie management

## Installation Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/ArifRahaman/backend_pdfchat.git
   cd backend_pdfchat
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Set up the environment variables:
   - Create a `.env` file in the root directory.
   - Define the following variables:
     ```plaintext
     JWT_SECRET_KEY=your_jwt_secret_key
     GMAIL_USER=your_gmail_user
     GMAIL_PASSWORD=your_gmail_password
     ```

4. Start the server:
   ```bash
   npm start
   ```

## Usage Guide

### User Registration

- **Endpoint:** `/register`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "username": "exampleUser",
    "email": "user@example.com",
    "password": "examplePassword",
    "dob": "1995-05-15",
    "universityname": "Example University"
  }
  ```
- **Response:**
  ```json
  {
    "message": "User is successfully signed up",
    "employee": { /* user data */ }
  }
  ```

### User Login

- **Endpoint:** `/login`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "examplePassword"
  }
  ```
- **Response:**
  ```json
  {
    "message": "OTP sent to your email"
  }
  ```

### Upload PDF

- **Endpoint:** `/upload-pdf`
- **Method:** `POST`
- **Form Data:**
  - `title`: PDF title
  - `pdf`: PDF file
- **Response:**
  ```json
  {
    "message": "PDF uploaded successfully",
    "pdf": { /* PDF data */ }
  }
  ```

## Environment Variables

- `JWT_SECRET_KEY`: Secret key for JWT token generation
- `GMAIL_USER`: Gmail user for sending emails
- `GMAIL_PASSWORD`: Gmail password for sending emails

## API Reference

### Endpoints

- **USE** `/uploads`: Serve static files from the uploads directory.
- **POST** `/upload`: Upload a file.
- **GET** `/videos`: Retrieve videos.
- **POST** `/upload-profile-image`: Upload a profile image.
- **GET** `/search`: Search functionality.
- **POST** `/posts/:postId/like`: Like a post.
- **POST** `/posts/:postId/dislike`: Dislike a post.
- **POST** `/posts/:postId/comments`: Comment on a post.
- **PUT** `/changepassword`: Change user password.
- **POST** `/register`: Register a new user.
- **GET** `/pdfs/:pdfId`: Get a specific PDF.
- **POST** `/posts`: Create a new post.
- **GET** `/posts`: Retrieve all posts.
- **POST** `/login`: User login.
- **POST** `/verify-otp`: Verify OTP.
- **GET** `/posts/by-author/:authorId`: Get posts by a specific author.
- **PUT** `/user/:id`: Update user information.
- **POST** `/upload-pdf`: Upload a PDF.
- **GET** `/user-pdfs/:userId`: Retrieve PDFs uploaded by a user.
- **DELETE** `/posts/delete/:id`: Delete a post.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

---
> 🤖 *Last automated update: 2026-02-26 10:57:26*