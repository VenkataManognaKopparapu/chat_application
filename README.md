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


### Additional Requirements
- All services will return JSON (if they return a body) and receive JSON (if they receive a body)
- Do NOT use localStorage, sessionStorage, IndexedDB, cookies, or other forms of client-side storage, except a cookie to hold a `sid` value
- Do NOT interact with the browser url, including hash fragment
- Do NOT include files in your PR that are outside the assignment (no IDE configs, `node_modules/`, etc)
* Do not use external JS other than express, cookie-parser, and the modules we've used for webpack and babel
  - express-session is NOT allowed!
  - uuid is NOT allowed!
  - Modules that do not require npm install are allowed, but make sure you aren't venturing outside the project goals
* Do not use external CSS libraries
  - Exception: You may use Google fonts
* Use arrays and objects when they each make sense
* Do not use `var`. Use `const` and `let` appropriately
* Do not use `alert`, `prompt` or other blocking JS
* Do not use poor variable and function names
* Do not have functions that are too big/do too much
* Do not have debugging console.log messages
* Do not have commented out code
* You may not use floats to do more than manage flowing text with images
* You may not use `async` or `await` 
    - async/await are good, not bad, but I need to see you understand the underlying promises
* You may not use HTML tables for layout or CSS table layouts
* You may not use CSS preprocessors, minifiers, or other tools to modify your CSS
  * I and the TA(s) must be able to read it easily

## Extra Credit Options

Styling, appearance, or functionality beyond the above minimums that create a pleasant and professional experience can be worth extra credit.  Extra credit is limited, so focus on the needed requirements first.  Not all of these options are required to receive the maximum extra credit, the collection of any of these options are evaluated against the understanding of concepts from the course that are demonstrated.

- This does not change any requirements, make sure those are still fulfilled
- This does not permit using outside libraries, services, etc - this is meant to show your advanced knowledge of the concepts from class.
- Provide a nice and pleasant UI that involves more work than the minimum to provide functionality
- Provide additional chat functionality: DMs between users and/or the option for separate chat "channels"
- Provide some means by which the polling only receives messages that are new to this user (rather than a full list of all messages)

## Grading Rubric

Note: The project is to show your understanding of the material from class.  If you don't do that, you can lose points, even it "it works".  Do NOT copy or generate your work (see "do-not-copy-work.md" at the root of this repo).

This project is graded on a number of categories, each graded on the below scale:
- Missing (0)
- Needs Improvement (1)
- Good (2)
- Excellent (3)

This means a single mistake might cost you 0 points or more than 1 point, depending on how much that mistake changes your demonstration of the skills from class.

The categories for this project are:

### Submission
- Does PR follow submission expectations?  (contains only change from assignment, correct branch name, good commit message(s), reviewers assigned)
- Did you ONLY install permitted modules and use them as expected?
- Does the submission make no use of outside material except as explicitly allowed?
- Does the program run correctly following the required scripts?

### Overall Application Quality
- Does the app work overall, fulfill the goal, and meet all requirements?
- Were all restrictions followed?
- Does the code demonstrated the requested skills and lessons?
- Are you using static and dynamic assets per the requirements? (static CSS, static HTML)
- Would a user understand what to do on each "page"?

### Server Data and Organization
- Are users logged in using a separate session id for each browser login?
- Is server state managed, updated, and reported with separation of concerns?
- Is "dog" treated as a bad password/bad authentication, distinct from a invalid username?
- Is the username validated using an allowlist of valid characters?
- Are only logged in users shown the option to logout?
- Is session data separate from non-session data?
- Does logout remove the sid from both the server side session AND the browser?
- Can a user have multiple simultaneous sessions (using different browsers/profiles) and only be listed once in the user list?
- Are users shown in the displayed user list when they login?
- Are users removed from the displayed user list when they logout?
- Is a user with multiple simultaneous sessions only removed from the displayed user list when all sessions have logged out?
- Can multiple users post messages without interfering with each other (in terms of data, users talking over each other is part of the chat experience)
- Can a user logout and log back in to still see their game in progress?

### Security
- Does every backend endpoint that is meant to be used only by logged in users check the validity of the session id and respond as required?
- Do the backend endpoints that receive user data validate using an allowlist respond as required to invalid data?
    - Note: Though insecure, this project does not require santization of message data, only that empty messages are rejected
- Is "dog" denied access differently than a username of invalid characters?

### RESTful Web Services and Calls
- Does the SPA check for an existing session (using RESTful service) on load?
- Does the SPA display and allow login using a RESTful service if there is no session?
- If a user is logged in, does the SPA allow logout using a RESTful service?
- After logout is the user able to login?
- Are all endpoints using RESTful methods and paths?
- Do all endpoints paths include /api/ and a version number?
- Are all endpoints sending and receiving JSON data?
- Do endpoints return these status codes with their responses when appropriate?
    - 400 (empty message; invalid username on login)
    - 401 (calling a service with missing/invalid sid)
    - 403 (attempting a login as username "dog")
- No endpoint should result in a redirect
- Are loading indicators used for the required service calls?
- Are users informed of or given the ability to correct any error status
    - Hint: Those are two different options.  Putting a message in the HTML is "informing" the user. Having the front end display a login form is "giving the ability to correct".  Each error should result in one of those options.
    - Are displayed error messages understandable to the user?
    - Are displayed error messages specific enough ("something is wrong" is not a specific error message)?
- Does a logged in user have new messages/users updated using ~5s polling?
- Is polling stopped when a user logs out?
- Did you avoid the use of `async` and `await` as required?
    - `async` and `await` are not bad, but you must demonstrate your understanding of asynchronous behavior and promises

### Visual Presentation
- Is all text legible? Of sufficient size, clarity, and contrast?
- Are different parts of the page content visually distinct?
- Is it clear what the user should do?
- Is it clear what the user can do?
- Is it clear what the information on screen means?
- Does the page handle most reasonable desktop sizes without jumbled presentation or horizontal scrolling?
- Is it clear which messages came from which users?
- Are messages from users that are currently logged out still listed as from those users?
- Can a message be typed without the polling removing a message in progress?

### Client JS Organizational Quality
- Is client state managed, updated, and reported with separation of concerns?
- Is client state distinct in structure (even if similar) from server state?
- Does client state only reflect the material for this user?
- Is the client HTML updated based on the current state, not the recent event?
- Are service calls separated from the code that triggers them?
- Are service calls separated from the changes they result in?

### JS Code Quality 
- Is the JS following the best practices given in the course?
- Are functions and variables named meaningfully?
- Are functions doing too many different things?
- Is code visually broken up into "paragraphs" with different purposes?
- Are comments helpful?  Not just repeating what the code says, and providing context or reasoning?
- Is code indented and formatted consistently and according to the best practices provided in the course?
- Do you understand what the code is doing and how it is doing it?
    - In enough detail to explain to your team?

### HTML & CSS Quality
- Is the HTML complete and valid?
- Are all form fields properly associated with a text label?
    - Quick test: click on the text of the label, the field should be selected
- Are the HTML and CSS formatted and indented per the standards given in the course?
- Does the content work at various reasonable "desktop" sizes of a browser window?
- Are HTML elements used in semanatically appropriate ways?
- Are Semantic HTML elements used when available and appropriate?
- Are all class names semantic and kebab-case (or BEM) style?
- Does the page work when there are enough guesses to require scrolling?

### Extra Credit
Not all of these are required to receive credit.  The total impression of the below is ranked on the 3 point rubric considering what is _beyond the requirements_ but still part of the course material.
- Provide a nice and pleasant UI that involves more work than the minimum to provide functionality
- Provide additional chat functionality: 
    - DMs between users and/or the option for separate chat "channels"
- Provide some means by which the polling only receives messages that are new to this user (rather than a full list of all messages)

