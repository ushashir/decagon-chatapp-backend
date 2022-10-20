INSTALLATION
Open your project root directory. cd backend then run the

yarn install to install all packages on package.json
yarn dev to start development server on port 5000
yarn compile to compile typescript
BackEnd Structure
The BackEnd is structured using the Model - Controller pattern.

DB - SQLITE (for local development till the zccore API endpoints for data manipulation have been finished)

Cloud storage - Cloudinary (for local development till zccore provides an API for file storage)

Folder Structure
For the BackEnd of this project, all you truly need to worry about is the backend folder.

 backend/
  ├── bin
  ├── ├── wwww
  ├── dist/
  │   ├── compiled ts files /
  ├── src
  │   ├── controllers/
  │   │   ├── followerController.ts
  │   │   ├── messageConfrolller.ts
  │   │   ├── postController.ts
  │   │   ├── userController.ts
  │   ├── middlewares/
  │   │   ├── userAuth.ts
  │   ├── models/
  │   │   ├── conversation.ts
  │   │   ├── followers.ts
  │   │   ├── followings.ts
  │   │   ├── message.ts
  │   │   ├── post.ts
  │   │   ├── user.ts
  │   ├── routes/
  │   │   ├── auth.ts
  │   │   ├── index.ts
  │   │   ├── messageRoute.ts
  │   │   ├── postRoute.ts
  │   │   ├── usersRoute.ts
  │   ├── socket
  │   │   ├── infoSocket.ts
  │   ├── utils/
  │   │   ├── utils.ts

Since were using Model-Controller pattern (instead of the usual MVC), we have the models folder & the controllers folder along side three other folders: the middlewares, the routes & the utils folders.

Models
Based on all the features we've planned out for our project

User Model

Autho ROUTES (signUp,login,logout)

sign up user: POST http://localhost:5000/api/auth/register
login user: POST http://localhost:5000/api/auth/login
setAvatar user: POST http://localhost:5000/api/auth/setavatar/:id
allUsers execept currentUser user: GET http://localhost:5000/api/auth/allusers/:id

logout: GET http://localhost:5000/api/auth/logout/:id



POSTS ROUTES

Create Post: POST http://localhost:5000/api/posts
Create Post: GET http://localhost:5000/api/posts

Update Post: PATCH http://localhost:5000/api/posts/:id

Delete Post: DELETE http://localhost:5000/api/posts/:id

Get all user's Post: GET http://localhost:5000/api/posts/profile/:username

Get timeline Posts: GET http://localhost:5000/api/posts/timeline/:userId

Get a single Post: GET http://localhost:5000/api/posts/:id

MESSAGE ROUTES

Create message: POST http://localhost:5000/api/messages

patch message: POST http://localhost:5000/api/messages/

Update message: PATCH http://localhost:5000/api/messages/id

Delete message: DELETE http://localhost:5000/api/messages/id