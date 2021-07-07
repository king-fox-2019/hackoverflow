# LetItFlow

LetItFlow is a simple stack overflow like website to ask and answer questions.

Fitur:

1. Ask question by authentication user.
2. Edit and delete question by authorized user.
3. Add answer to the question by authentication user.
4. Edit and delete answer by authorized user.
5. Add watched tag
6. Search by watched tag
7. Send email to the registered user every Friday at 10.00 am GMT+6

 Here's the documentation:

## User

- **/users/signup**

  Register user

| Method | Header | Params | Data                                                         |
| ------ | ------ | ------ | ------------------------------------------------------------ |
| `POST` | `none` | `none` | name: `string`<br>email: `string` <br>password: `string`<br> |

| Success Response                                             | Error Response                                               |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Status: `201` <br> Content: `{ payload: {_id,name,email}, token`} | Status: `400` <br> Content: `{"errors": ["Email already used", "Password min 6 characters","Name is required","Email is required",   "Password is required"]}` |


- **/users/signin**

  Login user

| Method | Header | Params | Data                                    |
| ------ | ------ | ------ | --------------------------------------- |
| `POST` | `none` | `none` | email: `string` <br> password: `string` |

| Success Response                                             | Error Response                                               |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Status: `200` <br> Content: `{ payload: {_id,name,email}, token`} | Status: `400` <br> Content: `{"errors": ["invalid email/password"]}` |

- **/users/tag**

  Add watched tag

| Method | Header          | Params | Data               |
| ------ | --------------- | ------ | ------------------ |
| `PUT`  | `token: String` | `none` | tag: `string` <br> |

| Success Response                               | Error Response                                               |
| ---------------------------------------------- | ------------------------------------------------------------ |
| Status: `200` <br> Content: `{message, token}` | Status: `400` <br> Content: `{"errors": ["You must login first!","tag already choose"]}` |

- **/users/tag**

  get all user's tag

| Method | Header | Params          | Data                                       |
| ------ | ------ | --------------- | ------------------------------------------ |
| `GET`  | `none` | `token: String` | identity: `string` <br> password: `string` |

| Success Response                            | Error Response                                               |
| ------------------------------------------- | ------------------------------------------------------------ |
| Status: `200` <br> Content: `[watched tag]` | Status: `400` <br> Content: `{"error": ["You must login first!"}` |



## Question

- **/questions**
  Get all question.

| Method | Header | Params | Data   |
| ------ | ------ | ------ | ------ |
| `GET`  | `none` | `none` | `none` |

| Success Response                                             | Error Response                                               |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Status: `200` <br> Content: `[{tags, upvotes, downvotes, answer, _id, title, description, user, createdAt, updatedAt}]` | Status: `500` <br> Content: `{"errors": ["Internal server error"]}` |

- **/questions/my**
  Get user's questions.

| Method | Header          | Params | Data   |
| ------ | --------------- | ------ | ------ |
| `GET`  | `token: String` | `none` | `none` |

| Success Response                                             | Error Response                                               |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Status: `200` <br>Content: `[{tags, upvotes, downvotes, answer, _id, title, description, user, createdAt, updatedAt}]` | Status: `400` <br> Content: `{errors: ["You must login first!"]}` |

- **/questions/:id**
  Get one question with specific item`id`. 

| Method | Header | Params | Data   |
| ------ | ------ | ------ | ------ |
| `GET`  | `none` | `none` | `none` |

| Success Response                                             | Error Response                                               |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Status: `200` <br> Content: `{tags, upvotes, downvotes, answer, _id, title, description, user, createdAt, updatedAt}` | Status: `500` <br> Content: `{errors: ["Interal server error"]}` |

- **/questions/tag/:tag**
  Get questions with particular tag.

| Method | Header | Params        | Data   |
| ------ | ------ | ------------- | ------ |
| `GET`  | `none` | tag: `string` | `none` |

| Success Response                                             | Error Response                                               |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Status: `200` <br> Content: `[{tags, upvotes, downvotes, answer, _id, title, description, user, createdAt, updatedAt}]` | Status: `400`<br> Content: `{error: ["Internal server error"]}` |


- **/questions/**
  Add question by authenticated user.

| Method | Header          | Params | Data                                                    |
| ------ | --------------- | ------ | ------------------------------------------------------- |
| `POST` | `token: String` | `none` | title:`String`<br>description:`String`<br>tags:`String` |

| Success Response                                             | Error Response                                               |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Status: `200` <br> Content: `{question: {_id, title, description, user, tags, upvotes, downvotes, answer, createdAt, updatedAt}, message: "Question added succesfully"}` | Status: `400` <br> Content: `{errors:["You must login first!", "Title is required",    "Description is required","Tags must be filled min 1"] ` |

- **/questions/:id**
  Update question by authorized user.

| Method | Header          | Params      | Data                                                    |
| ------ | --------------- | ----------- | ------------------------------------------------------- |
| `PUT`  | `token: String` | id:`String` | title:`String`<br>description:`String`<br>tags:`String` |

| Success Response                                             | Error Response                                               |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Status: `200` <br> Content: `{message: "Question updated succesfully"}` | Status: `400`<br> Content: `{errors:["You must login first!", "Title is required", "Description is required", "Tags must be filled min 1"] ` |

- **/questions/:id**
  Delete question by authorized user.

| Method   | Header          | Params      | Data   |
| -------- | --------------- | ----------- | ------ |
| `DELETE` | `token: String` | id:`String` | `none` |

| Success Response                                             | Error Response                                               |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Status: `200` <br> Content: `{message: "Question deleted succesfully"}` | Status: `400` <br> Content: `{errors:["You must login first!"] ` |

- **/questions/:id/upvote**
  Upvote question by authenticate user.

| Method | Header          | Params      | Data   |
| ------ | --------------- | ----------- | ------ |
| `POST` | `token: String` | id:`String` | `none` |

| Success Response                                             | Error Response                                               |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Status: `200` <br> Content: `{message: "Update upvote succes", question: {tags, upvotes, downvotes, answers, _id, title, description, user, cretaedAt, updatedAt}}` | Status: `400`, <br> Content: `{errors:["You must login first!"] ` |

- **/questions/:id/downvote**
  Downvote question by authenticate user.

| Method | Header          | Params      | Data   |
| ------ | --------------- | ----------- | ------ |
| `POST` | `token: String` | id:`String` | `none` |

| Success Response                                             | Error Response                                               |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Status: `200` <br> Content: `{message: "Update downvote succes", question: {tags, upvotes, downvotes, answers, _id, title, description, user, cretaedAt, updatedAt}}` | Status: `400`, <br> Content: `{errors:["You must login first!"] ` |

## Answer

- **/answers/:questionId**
  Get all answer of particular question.

| Method | Header | Params              | Data   |
| ------ | ------ | ------------------- | ------ |
| `GET`  | `none` | questionId:`String` | `none` |

| Success Response                                             | Error Response                                               |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Status: `200` <br> Content: `[{upvotes, downvotes, _id, title, description, user, createdAt, updatedAt}]` | Status: `500` <br> Content: `{"errors": ["Internal server error"]}` |

- **/answers/:answerId**
  Get an answer with specific answer id.

| Method | Header          | Params           | Data   |
| ------ | --------------- | ---------------- | ------ |
| `GET`  | `token: String` | answerId: `none` | `none` |

| Success Response                                             | Error Response                                               |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Status: `200` <br>Content: `{upvotes, downvotes, _id, title, description, user, createdAt, updatedAt}` | Status: `400` <br> Content: `{errors: ["You must login first!"]}` |

- **answers/:questionsId**
  Create an answer of particular question id.

| Method | Header          | Params              | Data   |
| ------ | --------------- | ------------------- | ------ |
| `POST` | `token: String` | questionId:`String` | `none` |

| Success Response                                             | Error Response                                               |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Status: `200` <br> Content: `{message: "Answer added succesfully"}` | Status: `400` <br> Content: `{errors: ["You must login first!","Description is required"]}` |

- **/answers/:id**
  updated specific answer.

| Method  | Header | Params       | Data                 |
| ------- | ------ | ------------ | -------------------- |
| `PATCH` | `none` | id: `string` | description:`String` |

| Success Response                                             | Error Response                                               |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Status: `200` <br>Content: `{message: "Answer updated succesfully"}` | Status: `400`<br> Content: `{error: ["You must login first!"]}` |


- **/answers/:id**
  Delete answer by authorized user.

| Method   | Header          | Params      | Data   |
| -------- | --------------- | ----------- | ------ |
| `DELETE` | `token: String` | id:`String` | `none` |

| Success Response                                             | Error Response                                               |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Status: `200` <br> Content: `{message: "Answer deleted succesfully"}` | Status: `400` <br> Content: `{errors:["You must login first!"] ` |

- **/answers/:id/upvote**
  Upvote question by authenticate user.

| Method | Header          | Params      | Data   |
| ------ | --------------- | ----------- | ------ |
| `POST` | `token: String` | id:`String` | `none` |

| Success Response                                             | Error Response                                               |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Status: `200` <br> Content: `{message: "Update upvote succes", answer: { upvotes, downvotes, _id, description, user, cretaedAt, updatedAt}}` | Status: `400`, <br> Content: `{errors:["You must login first!"] ` |

- **/questions/:id/downvote**
  Downvote question by authenticate user.

| Method | Header          | Params      | Data   |
| ------ | --------------- | ----------- | ------ |
| `POST` | `token: String` | id:`String` | `none` |

| Success Response                                             | Error Response                                               |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Status: `200` <br/> Content: `{message: "Update downvote succes", answer: { upvotes, downvotes, _id, description, user, cretaedAt, updatedAt}}` | Status: `400`, <br> Content: `{errors:["You must login first!"] ` |



## Usage

Make sure you have Node.js and npm installed in your computer, and then run these commands:

```
$ npm install
$ npm run dev
```

## 

