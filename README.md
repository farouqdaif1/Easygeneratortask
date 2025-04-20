# EasyGenerator Task

A full-stack application with a React frontend and NestJS backend.

## Project Structure

```
EasyGenerator/
├── frontend/        # React application built with Vite
└── backend/         # NestJS application
```

## Prerequisites

- Node.js (v18 or higher recommended)
- npm (v8 or higher)
- MongoDB account (for database)

## Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables:
   - The project uses a `.env` file for configuration
   - Make sure MongoDB connection string and JWT secret are properly set

4. Start the development server:

```bash
# For development with auto-reload
npm run start:dev

# For production build
npm run build
npm run start:prod
```

The backend server will be running on `http://localhost:3000` (default NestJS port).

## Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Build for production:

```bash
npm run build
```

The frontend development server will be running on `http://localhost:5173` (default Vite port).

## Additional Commands

### Backend

```bash
# Run tests
npm test

# Run linting
npm run lint

# Format code
npm run format
```

### Frontend

```bash
# Preview production build
npm run preview

# Run linting
npm run lint
```

## Notes

- Make sure both frontend and backend servers are running simultaneously for the application to work properly
- The frontend is configured to connect to the backend API at the default address