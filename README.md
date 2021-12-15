# Getting started
Under development  
Server can be started using ```npm run dev:server```.  
Client can be started using ```npm run dev:client```.  

## Server

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
### Routes
#### "/"             Home
Uses components: Menu, Posts, Post, AddPost, Comment, AddComment  

#### "/login"        Login
Uses components: Menu, Login

#### "/register"     Register
Uses components: Menu, Register

### Components
#### Menu
Renders menu, Links to home, if logged in displays user's email, else displays links to login & register

#### Login
Renders login form, handles login and jwt saving

#### Register
Renders register form

#### Posts
Manages with all posts, renders the main structure.

#### Post
Renders one post and it's structure

#### AddPost
Renders add post -form

#### Comment
Renders comment and it's structure

#### AddComment
Renders add comment -form