# Getting started

## Server

### API endpoints
"auth: token" expects that jsonwebtoken is in requests "authorization" header.

#### User
##### Login:
auth: NO
path: /api/user/login
type: POST
parameters: email, password
response: 200 OK, email. 

##### Register:
auth: NO
path: /api/user/register
type: POST
parameters: email, password
response: 200 OK, {success: true, token: <token>}

#### Posts
##### Get all posts:
auth: NO
path: /api/post
type: GET
parameters:
response: [{_id, user, post, [comments], timestamp, lastedit}]

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
##### Get comment:
auth: NO
path: /api/comment/:id
type: GET
parameters:
response: {comment}

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

## Client

