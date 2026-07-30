# Setup and Running (Local)

This branch contains a backend and an Expo mobile skeleton. Follow the steps below to run locally.

Prerequisites:
- Docker & Docker Compose
- Node.js & npm (for mobile app)
- Expo CLI (for mobile app): npm install -g expo-cli

1) Start services with Docker Compose

  docker-compose up --build

This will start Postgres and the backend on port 4000.

2) Seed the database

  docker exec -it <backend_container> npm run seed

Or run the seed script locally:

  cd backend
  npm install
  npm run seed

3) Start Expo app

  cd mobile-app
  npm install
  expo start

Notes:
- Default seeded accounts:
  - admin: admin@example.com / Password123!
  - vendor1: vendor1@example.com / VendorPass1!
  - vendor2: vendor2@example.com / VendorPass1!
  - students: student1@example.com..student10@example.com / StudentPass1!

- Backend API: http://localhost:4000/api

