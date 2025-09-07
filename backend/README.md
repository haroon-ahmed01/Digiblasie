# DigiBlaise Backend Setup

## Prerequisites
- Node.js installed
- MongoDB installed and running
- Gmail account with App Password

## Gmail Setup
1. Go to your Google Account settings
2. Navigate to Security > 2-Step Verification
3. Generate an App Password for this application
4. Use the App Password in your .env file (not your regular Gmail password)

## Installation
1. Navigate to the backend directory: `cd backend`
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env` and fill in your credentials
4. Start MongoDB service
5. Run the server: `npm run dev`

## Environment Variables
- `MONGODB_URI`: Your MongoDB connection string
- `GMAIL_USER`: Your Gmail address
- `GMAIL_APP_PASSWORD`: Your Gmail App Password (not regular password)
- `PORT`: Server port (default: 5000)

## API Endpoints
- `POST /api/contact`: Submit contact form
- `GET /api/health`: Health check

## Features
- Saves contact submissions to MongoDB
- Sends thank you email to client
- Sends notification email to DigiBlaise team
- CORS enabled for frontend integration