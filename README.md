## Simple Chat SPA (Express + REST)
This project is a Single Page Application (SPA) chat system built with vanilla JavaScript, Express, and RESTful services.
All users share a single chat forum where messages persist across sessions and users.

The project demonstrates core concepts from the course, including RESTful service design, client-side state management, authentication using session IDs, and polling for updates.
### Features:
- Single-page chat application (one HTML page).
-  Express server serving:
    - Static assets (HTML, CSS, bundled JS)
    - RESTful API endpoints
- Login system using session IDs stored in cookies
- No passwords (username-only login)
- User "dog" is explicitly rejected with a 403 response
- Persistent server-side chat messages
  
- Displays:
  - List of all chat messages
  - List of currently logged-in users
    
- Users can:
  - Log in
  - Send messages
  - Log out

- Polling every ~5 seconds for:
  - New messages
  - Updated logged-in user list
 
- Supports multiple simultaneous sessions per user
- Usernames appear only once in the user list regardless of session count
- Messages are always attributed to the correct user

- Loading indicators for:
  - Initial session check
  - Login + initial data load
 
- Graceful error handling with user-visible messages


### Technology Stack

- Node.js
- Express
- cookie-parser
- Webpack (bundling)
- Babel (transpilation)
- Vanilla JavaScript (no frameworks)
- HTML5 / CSS3

No external frontend libraries or CSS frameworks are used.

### Authentication & Security Notes

- Authentication is handled via a session ID stored in a cookie
- No passwords are used
- Username validation is performed server-side using an allowlist
- Username "dog" is rejected with status 403
- Empty messages return 400
- Unauthorized access returns 401
- The server never trusts client input to identify message authors

### REST API Overview


All backend services are built using REST principles: 


- All endpoints are prefixed with /api
- All endpoints include a version identifier (e.g. /v1)
- Requests and responses use JSON
- Standard HTTP status codes are used to indicate success and errors
- Endpoints that access protected data require a valid authenticated session


### Available Endpoints
- GET /api/v1/session — Check whether a user is currently logged in
- POST /api/v1/session — Create a new login session
- DELETE /api/v1/session — Log out and remove the current session
- GET /api/v1/messages — Retrieve the list of chat messages
- POST /api/v1/messages — Post a new chat message
- GET /api/v1/users — Retrieve the list of currently logged-in users


### Running the Application


- Install dependencies : npm install
 
- Build the client bundle : npm run build

- Start the server :  npm start
 
- Access the app : Open your browser and navigate to:
  - http://localhost:3000/


## Development Notes


- The app uses polling, not WebSockets or long polling
- Polling stops when the user logs out
- Client state updates do not interrupt message typing
- No client-side storage is used other than the session cookie
- async / await are intentionally not used to demonstrate Promise handling


