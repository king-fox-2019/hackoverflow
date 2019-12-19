# Hacktiv Belowflow

------

## User Routes:

| **ROUTE**       | METHOD | Description      | required             |
| --------------- | ------ | ---------------- | -------------------- |
| /users/login    | POST   | Sign in user     |                      |
| /users/register | POST   | Sign up user     |                      |
| /users/         | GET    | Get all users    |                      |
| /users/:id      | PATCH  | Update user data | token, authorizating |

## Questions Routes:

| ********ROUTE********   | METHOD | Description                                | required             |
| ----------------------- | ------ | ------------------------------------------ | -------------------- |
| /questions/             | GET    | Get all questions                          |                      |
| /questions/             | POST   | Create/Add a new question                  | token                |
| /questions/:id          | DELETE | Delete question (owner's only)             | token, authorizating |
| /questions/:id          | PATCH  | Update question information (owner's only) | token, authorizating |
| /questions/:id          | GET    | Get single questions                       |                      |
| /questions/mine         | GET    | Get owner(login user) questions            | token                |
| /questions/upvote/:id   | PATCH  | Like a post                                | token                |
| /questions/downvote/:id | PATCH  | Dislike a post                             | token                |

## Answers Routes:

| *****\*\******ROUTE****\**** | METHOD | Description                                | required             |      |
| ---------------------------- | ------ | ------------------------------------------ | -------------------- | ---- |
| /answers                     | GET    | Get all answer                             |                      |      |
| /answers/:id                 | GET    | Show answer forspecific question           |                      |      |
| /answers/:id                 | POST   | Create answer                              | token                |      |
| /answers/:id                 | PATCH  | Update question information (owner's only) | token, authorizating |      |
| /answers/upvote/:id          | PATCH  | Like a post                                | token                |      |
| /answers/downvote/:id        | PATCH  | Dislike a post                             | token                |      |

## Errors:

| Code | Name                  | Description                        |
| ---- | --------------------- | ---------------------------------- |
| 400  | Bad request           | Invalid submitted data             |
| 403  | Forbidden             | Unauthorized                       |
| 404  | Not Found             | Resource could not found           |
| 401  | Unathorized           | Dont have permission to do a thing |
| 500  | Internal Server Error | Something went wrong in our server |