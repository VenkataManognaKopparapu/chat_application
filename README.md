# Project 2 - JS Chat

* Due by **Sun Nov 10, 11:59pm PT**

## Submission Instructions

* start from the up-to-date main branch (`git checkout main; git pull origin main`)
* Create a feature branch named 'project2' (`git checkout -b project2`)
* Create the files in this directory to have the require features
* Add, commit, and push the branch to github
* Create a PR to merge to main
* Be sure to include the TA(s) and I as reviewers.  

## Goals and Requirements

You will be writing a SPA using JS as shown in class that calls REST services (that you also write).  This SPA will be a simple Chat application.  This chat application is a single chat forum, like #questions in our class Slack - all users see the same list of messages, including messages posted before they logged in.

Your app will be tested for grading by running:
- `npm install`
- `npm run build`
- `npm start`
    - This must start your single express-based server, not `web-dev-server` or other options
- Visiting `http://localhost:3000/` in the browser
- You may include other commands/scripts for development if you wish
  - Note: You may use `node --watch` or `npx webpack --watch` for development, but those should not be the `start` and `build` scripts

### Learning Goals of this assignment:
- Write RESTful services using express, following the 3 Basic Rules of Rest presented in class.  
    - Reminder that these are my personal rules summarizing REST, you won't be able to Google them effectively
- Call RESTful services in front end JS using fetch as demonstrated in class
- Practice maintaining persistent state on the server and using services to load and update client state
- Practice using browser based JS to maintain and update state, and use that state to render updates to the HTML
- Practice using RESTful services for authentication/authorization
- Write a basic polling feature to check the server for updates and update client state
  - Not using websockets or long polling, just a simple time-based loop

### Requirement Overview

- Write an express server that will serve static assets and RESTful services
- Load a static HTML page as the SPA from your express server
  - This means there should be only one single html page!
- The HTML will load a static JS file bundled and transpiled with webpack and babel
- The SPA will require a user to login to view the chat or send messages
  - The SPA will determine (using a service call) on load if the user is already logged in. Users that are already logged in are not required to login again.
- A logged in user will see a list of messages, a list of currently logged in users, and will be able to send messages
    - You decide whether messages and users are part of the same service call or different service calls
- Every displayed message will identify which user sent it
- Every 5 seconds (roughly) the client side will check to see if there are new messages and/or if the list of currently logged in users has changed
  - Do NOT rewrite the HTML for the input form when you get polling results (a user typing a message will be interrupted and the message-in-progress will be lost!)
    - Hint: have a smaller render function that covers the users and the messages, but doesn't rewrite the form that gathers the input
- A user can logout and return to the login screen
  - This removes that session from the list of currently logged in users
  - A given user might be logged in more than once at the same time (using multiple browsers or different browser profiles here, more often on phone/desktop in reality)!  Make sure the username only shows up once in the list of users regardless of how many simultaneous sessions they have, and that the username only leaves the list of currently logged in user when all sessions are logged out of
  - Because we are only counting explicit "logout" actions, this app will consider a user that left the app (closing the tab or navigating to another page) as still "logged in" - that is fine for this assignment
- Multiple users can be logged in at once (use different browsers or different browser profiles to do this yourself) and can send and see messages from one another

### Visual Requirements

You are welcome to use/adapt your HTML/CSS from the `basic-express` assignment, subject to the requirements below and feedback on that assignment

You have wide discretion on the appearance of the chat, but:
- You must have SOME styling provided by CSS
- There must be no horizontal scrolling at normal desktop screen sizes (>800px width) and with usernames of up to 20 characters and normal sized words used in chat
- You may have min- or max-widths for the chat area, but it must not be set to the same fixed width for all users regardless of their window
- The list of users should be visually distinct from the list of messages
- There should be good whitespace, colors, and legibility throughout to promote usability
- The app should strive for usability 
  - Example: It should be convenient to send new messages, the polling should not "interrupt" a message that is in the middle of being typed
- You must have a loading indicator (text, image, and/or CSS) for:
  - When the page is loading and the SPA does not yet know if the user is "logged in" or not
  - When the user logs in and the initial list of users/list of messages are being loaded
- You may have loading indicators for other situations or not, your choice
- Service calls that generated unexpected errors should inform the user
  - Example: GET /session can return 401 if the user is not logged in.  This is expected, and will impact what is shown (login form or chat) but will not trigger a specific message to the user.  However, a 400 response when trying to login is NOT the expected response, and will trigger a message displayed on-screen in the app to the user)
  - Hint: It is MUCH TOO COMMON that students lose points for failing to report errors to the user. Some examples from class have not done this for you, so you can't simply copy code examples, you must demonstrate understanding of what to do to give error messages to the user and do so.
- SPECIAL: There is no requirement about keeping any vertical scroll position when new messages come in, but I encourage you to think about how you could manage that. 

### Security Requirements

- There should not be any password involved at all
- User "dog" will be rejected with a 403 error on login (we use this check instead of checking for password)
- Services that require authorization should respond with the appropriate Status Codes (401) if the request does not have a valid sid cookie value
- You should allowlist to sanitize the username
  - Hint: This MUST be done on the server-side.  Client-side can prevent "bad" usernames or must handle if the server returns an error.
- An empty message will trigger a 400 status code
- There is no requirement to sanitize messages beyond checking for an empty message, BUT you should think about what would be required to prevent injection attacks and how you would do so.
- All service calls that return lists of users or lists of messages require authorization
- All service calls to send messages require authorization
- The services must never trust the user input to decide which user is sending a message (That is, the username will not be input for service calls to send messages - instead, use the sid to find what username that session belongs to and use that).  This is different than with the basic-express assignment (we had not done login at that time)

### Quality Requirements
- You must follow the best practices outlined in the course so far for JS, CSS, HTML, services, and file structures
- The services must follow the REST requirements outlined in class
- The service urls must be in an `/api/` path
- The service urls must have a version in their path
- There is no requirement to paginate the service results on this assignment
- Use Semantic HTML as much as you can
- Use Semantic CSS/HTML class names using kebab-case
  - Semantic BEM-style names are permitted
- Follow any suggestions previously given to you in code reviews

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

