# IRCTC API ENDPOINTS

## Overview
This project is a railway management system API built using Node.js and PostgreSQL. It allows users to search for trains, check seat availability, and book tickets in real time. It also includes role-based access control for admins and users, ensuring security and proper data management.
Used supabase for the postgresql database.

## Tech Stack
- **Backend:** Node.js with Express.js
- **Database:** PostgreSQL
- **Authentication:** JWT (JSON Web Tokens)
- **Security:** API key protection for admin endpoints
- **Concurrency Handling:** Optimized for race conditions to prevent overbooking

## Features
### User Features
- Register a new user
- Login with authentication token
- Search for available trains between two stations
- Check seat availability on a train
- Book a seat on an available train
- View booking details

### Admin Features
- Add a new train with source, destination, and seat capacity
- Update total seats in a train
- Secure access to admin APIs using an API key

## API Endpoints
### Authentication
- `POST /api/register` - Register a new user
- `POST /api/login` - Login and receive an authentication token

### Booking Operations
- `POST /api/bookings` - Book a seat on a train (requires authentication)
- `GET /api/bookings/:id` - Get booking details (requires authentication)

### Admin Operations (Requires API Key)
- `POST /api/admin/train` - Add a new train (requires API key)
- `GET /api/admin/availability?source=<source>&destination=<destination>` - Get all trains between two stations

## Installation & Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/arpitgoyal878/IRCTC-API-ENDPOINTS/
   cd railway-management-api
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables (`.env` file):
   ```
   PORT=3000
   DATABASE_URL=https://yourdbname.supabase.co
   JWT_SECRET=your_jwt_secret
   ADMIN_API_KEY=your_admin_api_key
   DB_NAME=postgres
   DB_USER=postgres
   DB_PASSWORD=yourdbpassword
   DB_HOST=yourdbname.supabase.co
   DB_PORT=5432
   ```

4. Start the server:
   ```sh
   nodemon server.js
   ```
5. The API will be available at `http://localhost:3000`

## Notes
- Ensure PostgreSQL is running before starting the application.
- Handle concurrent bookings properly to prevent overbooking.
- Admin API endpoints must include the API key in the request headers.

## License
This project is restricted to my repository only: arpitgoyal878

