# PDF Chat Backend

This repository contains the backend implementation for managing and interacting with PDF files and user accounts. It offers functionalities such as user authentication, PDF management, and cloud storage integration. This backend is built using Node.js and Express.js, with MongoDB for data storage.

## Features

- User Registration and Login with password hashing.
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
- **JWT** for authentication
- **dotenv** for environment variable management

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

- **POST** `/register`: Register a new user.
- **POST** `/login`: Login with email and password to receive an OTP.
- **POST** `/upload-pdf`: Upload a PDF file.
- **GET** `/pdfs/:pdfId`: Retrieve a specific PDF by its ID.
- **DELETE** `/delete-pdf/:id`: Delete a PDF by its ID.
- **PUT** `/edit-pdf-title/:id`: Edit the title of a PDF.
- **GET** `/user-pdfs/:userId`: Retrieve all PDFs for a specific user.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.

---
> 🤖 *Last automated update: 2026-02-26 01:43:28*