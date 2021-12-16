# Getting started
Server can be installed using ```npm run preinstall```.  
Client can be installed using ```npm run install```.  

Server can be started using ```npm run dev:server```.  
Client can be started using ```npm run dev:client```.  

## Server

Uses Express framework, MongoDB, and node.js packages: JsonWebToken, Express-Validator, DotEnv, BcryptJS, Cors, Cookie-parser, Debug and Morgan.  
These packages are chosen because of further experience of them.

### API endpoints
"auth: token" expects that jsonwebtoken is in requests "authorization" header.

#### User
##### Login:
auth: NO  
path: /api/user/login  
type: POST  
parameters: email, password  
response: 200 OK, {success: true, token: < token >}    

##### Register:
auth: NO  
path: /api/user/register  
type: POST  
parameters: email, password  
response: 200 OK, {email}  

#### Posts
{post} = {_id, user, post, [comments], timestamp, lastedit}  

##### Get all posts:
auth: NO  
path: /api/post  
type: GET  
parameters:  
response: [{post}]  

##### New post:
auth: token  
path: /api/post  
type: POST  
parameters: user, post  
response: 200 OK, {post}  

##### Edit post:
auth: token  
path: /api/post/:id  
type: POST  
parameters: user, post  
response: 200 OK, {post}  

#### Comments
{comment} = {{_id, user, comment, timestamp, lastedit}}  

##### Get comment:
auth: NO  
path: /api/comment/:id  
type: GET  
parameters:  
response: 200 OK, {comment}  

##### New comment:
auth: token  
path: /api/comment  
type: POST  
parameters: user, comment  
response: 200 OK, {comment}  

##### Edit comment:
auth: token  
path: /api/comment/:id  
type: POST  
parameters: user, comment  
response: 200 OK, {comment}  

#### Author
##### Get author information (not password hash)
auth: none  
path: /api/author  
type: GET  
response: 200 OK, {user}  

## Client
Client is implemented using React with some packages. React is chosen as frontend framework because I wanted to learn it. React-router-dom is used because storing jwt in useState requires no full refreshes. React router is needed when having multiple pages. Highlight is used in highlighting the code blocks.  
Installed packages: react, react-dom, react-router-dom, react-router, react-highlight, react-scripts, web-vitals.  

### Routes
#### "/"             Home
Uses components: Menu, Posts  

#### "/post/:id"     Post
Uses components: Post, AddPost, EditPost, Comment, AddComment, EditComment  

#### "/login"        Login
Uses components: Menu, Login

#### "/register"     Register
Uses components: Menu, Register

#### "/logout"       Logout
Uses components: Menu, Logout

### Components
#### Menu
Renders menu, Links to home, if logged in displays user's email, else displays links to login & register

#### Login
Renders login form, handles login and jwt saving

#### Register
Renders register form

#### Logout
Clears jwt and userdata. Renders logged out page.  

#### Posts
Manages with all posts, renders the main structure.

#### Post
Renders one post and it's structure

#### AddPost
Renders add post -form

#### EditPost
If user logged in, shows edit button and allows user to edit post and submit it

#### Comment
Renders comment and it's structure

#### AddComment
Renders add comment -form

#### EditComment
If user logged in: shows edit button and allows user to edit comment and submit it

## Features and points -table
| Feature           | Points    |
| :---:             | :---:     |
| Basic features    | 25        |
| Using React       | 5         |
| Highlight lib     | 2         |
| Showing timestamps| 2         |
| Editing           | 4         |
| Total             | 38        |