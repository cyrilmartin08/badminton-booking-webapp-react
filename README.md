# Badminton Booking

A web application for booking badminton courts. Built with React, TypeScript, and Vite.

## Project Structure

- `src/components` - React components
- `src/routes` - App routes
- `src/context` - React context providers
- `src/data` - Static data (courts, config, holidays)
- `src/styles` - Global and CSS module styles
- `src/utils` - Utility functions
- `tests` - Test files

## Getting Started

1. Install dependencies: `npm install`
2. Start the dev server: `npm run dev`
3. Run tests: `npm test`


## Install backend dependencies:

1. Open a terminal in src/server
        Run: npm install express

2. Start the backend server:
        In src/server, 
        run: cd src\server  
        run: node bookings.cjs

3. Start the frontend (Vite) dev server:
        In your project root, 
        run: npm run dev
        
------------------------------------------------------------------------

First, start the backened (Step 2.) 
Then, start the frontend (command in a new terminal).

-------
1. Introduction

Badminton court booking web application
Built using React (TypeScript) for frontend
Vite as build tool for fast development
CSS Modules for component-level styling
Node.js (CommonJS) for server-side booking logic
JSON files for data storage (courts, bookings, holidays, config)
2. Tech Stack

Frontend: React, TypeScript, Vite
Styling: CSS Modules
Backend: Node.js (CommonJS modules)
Data: JSON files (no database)
Testing: React Testing Library, Jest

3. Design and Development

Modular component-based architecture (NavBar, BookingForm, CourtList, etc.)
Context API for global state management (BookingContext)
Responsive UI for desktop and mobile
Custom hooks and utility functions for date handling and storage
Separation of concerns: UI, logic, and data
4. Testing and Deployment

Unit and integration tests using React Testing Library and Jest
Test cases for booking flow, double booking prevention, dynamic class assignment
Local development with Vite dev server
Production build with Vite
Deployment-ready static assets

5. Project Deliverables

Complete source code (frontend and backend)
Modular React components
Booking logic and data files
Test suite with coverage
Documentation (README, setup instructions)
6. Skill-set Used

React and TypeScript development
State management with Context API
CSS Modules for scoped styling
Node.js scripting and server logic
Writing and running automated tests

7. Skill-set Acquired

Advanced React patterns (context, hooks, modularization)
End-to-end testing with React Testing Library
Efficient project structuring with Vite
Handling data persistence with JSON files
Debugging and optimizing React apps
8. Conclusion

Successfully built a full-featured badminton booking app
Gained hands-on experience in modern web development
Learned best practices in component design, testing, and deployment
Ready to extend or adapt the project for real-world use