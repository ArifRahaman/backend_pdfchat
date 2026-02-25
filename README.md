# PDF Chat Backend

This repository contains the backend implementation for managing and interacting with PDF files and user accounts. It provides functionalities for uploading PDFs, managing user information, and handling authentication and authorization processes.

## Features

- User registration and login with password hashing
- OTP generation and email sending for authentication
- PDF file upload and management
- Cloud storage integration for media files
- Static file serving for uploaded media
- JWT token generation and management for secure authentication
- MongoDB integration for data persistence

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- Multer for file uploads
- Cloudinary for cloud storage
- Nodemailer for sending emails
- JWT for authentication
- dotenv for environment variable management

## Installation Instructions

1. Clone the repository:
   ```
   git clone https://github.com/ArifRahaman/backend_pdfchat.git
   cd backend_pdfchat
   ```

2. Install the dependencies:
   ```
   npm install
   ```

3. Set up the environment variables:
   - Create a `.env` file in the root directory
   - Define the following variables:
     ```
     JWT_SECRET_KEY=your_jwt_secret_key
     GMAIL_USER=your_gmail_user
     GMAIL_PASSWORD=your_gmail_password
     ```

4. Start the server:
   ```
   npm start
   ```

## Usage Guide

### User Registration

- Endpoint: `/register`
- Method: `POST`
- Body: 
  ```json
  {
    "username": "exampleUser",
    "email": "user@example.com",
    "password": "examplePassword",
    "dob": "1995-05-15",
    "universityname": "Example University"
  }
  ```
- Response: 
  ```json
  {
    "message": "User is successfully signed up",
    "employee": { /* user data */ }
  }
  ```

### User Login

- Endpoint: `/login`
- Method: `POST`
- Body: 
  ```json
  {
    "email": "user@example.com",
    "password": "examplePassword"
  }
  ```
- Response: 
  ```json
  {
    "message": "OTP sent to your email"
  }
  ```

### Upload PDF

- Endpoint: `/uploadPdf`
- Method: `POST`
- Form Data: 
  - `title`: PDF title
  - `pdf`: PDF file
- Response: 
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

### Users

#### Register User

- **POST** `/register`
- Registers a new user.

#### Login User

- **POST** `/login`
- Logs in a user and sends an OTP to their email.

### PDFs

#### Upload PDF

- **POST** `/uploadPdf`
- Uploads a PDF file for a user.

#### Delete PDF

- **DELETE** `/deletePdf/:id`
- Deletes a specific PDF.

#### Get PDFs

- **GET** `/getPdf/:userId`
- Retrieves PDFs uploaded by a specific user.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for improvements or bug fixes.

## License

This project is licensed under the MIT License.

---
> 🤖 *Last automated update: 2026-02-25 23:04:59*