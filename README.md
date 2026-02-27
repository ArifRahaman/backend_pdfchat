# PDF Chat Backend

This project provides a backend service for user management, PDF uploads, and authentication. It includes features such as user registration, login, OTP verification, and PDF management.

## Features

- User Registration and Authentication
- OTP-based Login
- PDF Upload and Management
- User Profile Management
- RESTful API for seamless integration

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- Cloudinary for file storage
- Multer for handling file uploads
- JSON Web Tokens (JWT) for authentication
- Nodemailer for sending emails
- Cors and Cookie-Parser for security and session management

## Installation Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ArifRahaman/backend_pdfchat.git
   cd backend_pdfchat
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**  
   Create a `.env` file in the root directory and provide the following variables:

   ```
   JWT_SECRET_KEY=your_jwt_secret_key
   GMAIL_USER=your_gmail_user
   GMAIL_PASSWORD=your_gmail_password
   ```

4. **Start the server:**
   ```bash
   npm start
   ```

## Usage Guide

### User Registration
Register a new user by sending a POST request to `/register` with the following body:

```json
{
  "username": "johndoe",
  "email": "johndoe@example.com",
  "password": "securepassword",
  "dob": "1990-01-01",
  "universityname": "Example University"
}
```

### User Login
Login by sending a POST request to `/login` with the following body:

```json
{
  "email": "johndoe@example.com",
  "password": "securepassword"
}
```

### Upload PDF
Upload a PDF by sending a POST request to `/upload-pdf` with form-data including `userId`, `title`, and the file.

## Environment Variables

- `JWT_SECRET_KEY`: Secret key for JWT token generation.
- `GMAIL_USER`: Gmail user for sending emails.
- `GMAIL_PASSWORD`: Gmail password for sending emails.

## API Reference

- **POST** `/register`: Register a new user.
- **POST** `/login`: Login with email and password.
- **POST** `/verify-otp`: Verify OTP sent to the user's email.
- **POST** `/upload-pdf`: Upload a new PDF.
- **GET** `/user-pdfs/:userId`: Get PDFs uploaded by a user.
- **GET** `/pdfs/:pdfId`: Get a specific PDF by ID.
- **PUT** `/changepassword`: Change user password.
- **PUT** `/user/:id`: Update user information.
- **POST** `/upload-profile-image`: Upload a user profile image.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License.

---
> 🤖 *Last automated update: 2026-02-28 00:30:31*