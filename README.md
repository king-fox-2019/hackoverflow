# Stunoverflow

## Base URL

Default localhost

```http
http://localhost:3000
```



## Errors

### Response Format

```json
{
  "message": ["...", "..."]
}
```



### 404: Not Found

- `Endpoint not found`: Happens when you mistyped the routes endpoint. Check if you set it correctly.
- `Question not found`: Happens when you try to access question that's not available (possibly deleted by the author), oftenly happens when you hit endpoint with question id (Get One Question, Upvote Question) or when you try to Post Answer to deleted question. If that's not the case, then maybe you mistyped the id.
- `Answer not found`: Happens when you try to access answer that's not available (possibly deleted by the author), especially when you hit endpoint with answer id. If that's not the case, then maybe you mistyped the id.

### 401: Unauthorized

- `Valid access_token required`: This means you didn't send the required access_token, or your access_token is invalid or broken. If the latter happens to be the case, you can get another access_token from Sign In endpoint.
- `User banned`: This means your access_token is valid, but your account has been revoked/banned from the server. The only thing you can do is to register yourself again.

### 422: Unprocessable Entity

- User validation error: Typically this happens when you try to Sign Up with invalid data. Please check again the requirement for each field. Example error: `Invalid email format`, `Password required`.
- `Wrong email or password`: This happens when you enter invalid email or password during Sign In. Please check again.
- Question validation error: This happens when you try to post a question without all the required data. Example error: `Question title required`, `Question description required`.
- `Answer content required`: This happens when you try to post an answer without sending answer's content.

### 403: Forbidden

- `You don't have authorization to this question`: Happens when you try to manipulate (edit, delete) a question that's not posted by you. If that's not the case, then try to check whether you typed the id correctly.
- `You don't have authorization to this answer`: Happens when you try to manipulate (edit, delete) an answer that's not posted by you. If that's not the case, then try to check whether you typed the id correctly.



## User Routes

### Sign Up

##### Endpoint

```http
POST /signup
```

##### Body

- email **Required** must be a valid email format
- password **Required** must have at least 6 characters

##### Response

Status 201: Created

```json
{
  "message": "Sign up success",
  "data": {
    "user": {
      "watchedTags": [],
      "_id": "5df78131eca931762cde32ff",
      "email": "dummy@mail.com",
      "password": "123456"
    },
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGY3ODEzMWVjYTkzMTc2MmNkZTMyZmYiLCJlbWFpbCI6ImR1bW15QG1haWwuY29tIiwiaWF0IjoxNTc2NTAxNTUzfQ.h-M0XNO4qa3yAJI3KyMeZcDjtGNoOF3wceGDNOmGUc8"
  }
}
```



### Sign In

##### Endpoint

```http
POST /signin
```

##### Body

- email **Required**
- password **Required**

##### Response

Status 200:OK

```json
{
  "message": "Sign in success",
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGY3ODEzMWVjYTkzMTc2MmNkZTMyZmYiLCJlbWFpbCI6ImR1bW15QG1haWwuY29tIiwiaWF0IjoxNTc2NTAyMDA3fQ.BthQDAH6PoYg5H6pqHeY1SbNURjEplVJhMX3WOapqUI"
  }
}
```



### Check Session

##### Endpoint

```http
GET /user/checksession
```

##### Header

- access_token **Required**

##### Response

Status 200:OK

```json
{
  "message": "User authenticated",
  "data": {
    "watchedTags": [],
    "_id": "5df78131eca931762cde32ff",
    "email": "dummy@mail.com"
  }
}
```



### Edit Watched Tags

##### Endpoint

```http
PATCH /user/watchedtags
```

##### Header

- access_token **Required**

##### Body

- watchedTags **Optional** can be comma-separated string or array of strings.

##### Response

Status 200: OK

```json
{
  "message": "Watched tags updated",
  "data": {
    "watchedTags": [
      "javascript",
      "mongoose"
    ],
    "_id": "5df78131eca931762cde32ff",
    "email": "dummy@mail.com"
  }
}
```



## Question Routes

### Post Question

##### Endpoint

```http
POST /questions
```

##### Header

- access_token **Required**

##### Body

- title **Required**
- description **Required**
- tags **Optional** can be comma-separated string or array of strings. Will response OK even when nothing changed

##### Response

Status 201: Created

```json
{
  "message": "Question posted",
  "data": {
    "tags": ["javascript", "vue js", "mongoose"],
    "answers": [],
    "upvotes": [],
    "downvotes": [],
    "_id": "5df78f849961c4808aa1a5df",
    "title": "What is?",
    "description": "What is what what? Why what is what? How what be what when what is what?",
    "author": {
      "_id": "5df78131eca931762cde32ff",
      "email": "dummy@mail.com"
    }
  }
}
```



### Get All Questions

##### Endpoint

```http
GET /questions
```

##### Response

Status 200: OK

```json
{
  "data": [
    {
      "tags": ["javascript", "vue js", "mongoose"],
      "answers": [],
      "upvotes": [],
      "downvotes": [],
      "_id": "5df78f849961c4808aa1a5df",
      "title": "What is?",
      "description": "What is what what? Why what is what? How what be what when what is what?",
      "author": {
        "_id": "5df78131eca931762cde32ff",
        "email": "dummy@mail.com"
      }
    }
  ]
}
```



### Get All User Questions

##### Endpoint

```http
GET /user/questions
```

##### Header

- access_token **Required**

##### Response

Status 200: OK

```json
{
  "data": [
    {
      "tags": ["javascript", "vue js", "mongoose"],
      "answers": [],
      "upvotes": [],
      "downvotes": [],
      "_id": "5df78f849961c4808aa1a5df",
      "title": "What is?",
      "description": "What is what what? Why what is what? How what be what when what is what?"
    }
  ]
}
```



### Get One Question

##### Endpoint

```http
GET /questions/:id
```

##### Param

- id **Required** id of the question

##### Response

Status 200: OK

```json
{
  "data": {
    "tags": ["javascript", "vue js", "mongoose"],
    "answers": [],
    "upvotes": [],
    "downvotes": [],
    "_id": "5df78f849961c4808aa1a5df",
    "title": "What is?",
    "description": "What is what what? Why what is what? How what be what when what is what?",
    "author": {
      "_id": "5df78131eca931762cde32ff",
      "email": "dummy@mail.com"
    }
  }
}
```



### Edit Question

##### Endpoint

```http
PATCH /questions/:id
```

##### Header

- access_token **Required**

##### Param

- id **Required** id of the question

##### Body

- description **Optional** will response OK even when nothing changed
- tags **Optional** can be comma-separated string or array of strings. Will response OK even when nothing changed

##### Response

Status 200: OK

```json
{
  "message": "Question updated",
  "data": {
    "tags": ["javascript", "vue js", "mongoose"],
    "answers": [],
    "upvotes": [],
    "downvotes": [],
    "_id": "5df78f849961c4808aa1a5df",
    "title": "What is?",
    "description": "Why this why became why when why still why with why?"
  }
}
```



### Upvote Question

When you already upvoted the question, hitting this endpoint again will remove your vote. When you already downvoted the question, this endpoint will change your downvote to upvote.

##### Endpoint

```http
PATCH /questions/:id/upvote
```

##### Header

- access_token **Required**

##### Param

- id **Required** id of the question

##### Response

Status 200: OK

```json
{
  "message": "[You have upvoted] [Your upvote has been removed]",
  "data": {
    "tags": ["javascript", "vue js", "mongoose"],
    "answers": [],
    "upvotes": ["5df78131eca931762cde32ff"],
    "downvotes": [],
    "_id": "5df7b1b8283e419538efa3b9",
    "title": "What is?",
    "description": "What is what what? Why what is what? How what be what when what is what?",
    "author": {
      "_id": "5df78131eca931762cde32ff",
      "email": "dummy@mail.com"
    }
  }
}
```



### Downvote Question

When you already downvoted the question, hitting this endpoint again will remove your vote. When you already upvoted the question, this endpoint will change your upvote to downvote.

##### Endpoint

```http
PATCH /questions/:id/downvote
```

##### Header

- access_token **Required**

##### Param

- id **Required** id of the question

##### Response

Status 200: OK

```json
{
  "message": "[You have downvoted] [Your downvote has been removed]",
  "data": {
    "tags": ["javascript", "vue js", "mongoose"],
    "answers": [],
    "upvotes": [],
    "downvotes": ["5df78131eca931762cde32ff"],
    "_id": "5df7b1b8283e419538efa3b9",
    "title": "What is?",
    "description": "What is what what? Why what is what? How what be what when what is what?",
    "author": {
      "_id": "5df78131eca931762cde32ff",
      "email": "dummy@mail.com"
    }
  }
}
```



### Delete Question

##### Endpoint

```http
DELETE /questions/:id
```

##### Header

- access_token **Required**

##### Param

- id **Required** id of the question

##### Response

Status 200: OK

```json
{
  "message": "Question deleted"
}
```



## Answer Routes

### Post Answer

##### Endpoint

```http
POST /questions/:id/answers
```

##### Header

- access_token **Required**

##### Param

- id **Required** id of the question

##### Response

Status 201: Created

```json
{
  "message": "Answer posted",
  "data": {
    "upvotes": [],
    "downvotes": [],
    "_id": "5df99a617b5ccd72f984530e",
    "author": {
      "_id": "5df78131eca931762cde32ff",
      "email": "dummy@mail.com"
    },
    "question": {
      "tags": [],
      "answers": ["5dfa4085ae45ead040553298"],
      "upvotes": [],
      "downvotes": [],
      "_id": "5df7b1b8283e419538efa3b9",
      "title": "What is?",
      "description": "What is what what? Why what is what? How what be what when what is what?",
      "author": {
        "_id": "5df78131eca931762cde32ff",
        "email": "dummy@mail.com"
      }
    },
    "content": "This is the answer of the what that's still what for the what of what"
  }
}
```



### Get All Question's Answers

##### Endpoint

```http
GET /questions/:id/answers
```

##### Param

- id **Required** id of the question

##### Response

Status 200: OK

```json
{
  "data": [
    {
      "upvotes": [],
      "downvotes": [],
      "_id": "5df99a617b5ccd72f984530e",
      "author": {
        "_id": "5df78131eca931762cde32ff",
        "email": "dummy@mail.com"
      },
      "content": "This is the answer of the what that's still what for the what of what"
    }
  ]
}
```



### Get All User's Answers

##### Endpoint

```http
GET /user/answers
```

##### Header

- access_token **Required**

##### Response

Status 200: OK

```json
{
  "data": [
    {
      "upvotes": [],
      "downvotes": [],
      "_id": "5df9a01a470cc574ea2f5d11",
      "question": {
        "tags": [],
        "upvotes": [],
        "downvotes": [],
        "_id": "5df7b1b8283e419538efa3b9",
        "title": "What is?",
        "description": "What is what what? Why what is what? How what be what when what is what?",
        "author": {
          "_id": "5df78131eca931762cde32ff",
          "email": "dummy@mail.com"
        }
      },
      "content": "This is the answer of the what that's still what for the what of what"
    }
  ]
}
```



### Get One Answer

##### Endpoint

```http
GET /answers/:id
```

##### Param

- id **Required** id of the answer

##### Response

Status 200: OK

```json
{
  "data": {
    "upvotes": [],
    "downvotes": [],
    "_id": "5df9b36096c55281e32eb386",
    "author": {
      "_id": "5df9acb9bb060d7ed12882af",
      "email": "dummy@mail.com"
    },
    "question": {
      "tags": ["javascript", "vue js", "mongoose"],
      "answers": ["5dfa4085ae45ead040553298"],
      "upvotes": [],
      "downvotes": [],
      "_id": "5df9b32a96c55281e32eb384",
      "title": "What is?",
      "description": "What is what what? Why what is what? How what be what when what is what?",
      "author": {
        "_id": "5df9acb9bb060d7ed12882af",
        "email": "dummy@mail.com"
      }
    },
    "content": "This is the answer of the what that's still what for the what of what"
  }
}
```



### Edit Answer

##### Endpoint

```http
PATCH /answers/:id
```

##### Header

- access_token **Required**

##### Param

- id **Required** id of the answer

##### Body

- content **Optional** will response OK even when nothing changed

##### Response

Status 200: OK

```json
{
  "message": "Answer updated",
  "data": {
    "upvotes": [],
    "downvotes": [],
    "_id": "5df9b36096c55281e32eb386",
    "question": {
      "tags": ["javascript", "vue js", "mongoose"],
      "answers": ["5dfa4085ae45ead040553298"],
      "upvotes": [],
      "downvotes": [],
      "_id": "5df9b32a96c55281e32eb384",
      "title": "What is?",
      "description": "What is what what? Why what is what? How what be what when what is what?",
      "author": {
        "_id": "5df9acb9bb060d7ed12882af",
        "email": "dummy@mail.com"
      }
    },
    "content": "This is the true answer of truthy the truth that truely trust true the truthy"
  }
}
```



### Upvote Answer

When you already upvoted the answer, hitting this endpoint again will remove your vote. When you already downvoted the answer, this endpoint will change your downvote to upvote.

##### Endpoint

```http
PATCH /answers/:id/upvote
```

##### Header

- access_token **Required**

##### Param

- id **Required** id of the answer

##### Response

Status 200: OK

```json
{
  "message": "[You have upvoted] [Your upvote has been removed]",
  "data": {
    "upvotes": ["5df9acb9bb060d7ed12882af"],
    "downvotes": [],
    "_id": "5df9b36096c55281e32eb386",
    "author": {
      "_id": "5df9acb9bb060d7ed12882af",
      "email": "dummy@mail.com"
    },
    "question": {
      "tags": ["javascript", "vue js", "mongoose"],
      "answers": ["5dfa4085ae45ead040553298"],
      "upvotes": [],
      "downvotes": [],
      "_id": "5df9b32a96c55281e32eb384",
      "title": "What is?",
      "description": "What is what what? Why what is what? How what be what when what is what?",
      "author": {
        "_id": "5df9acb9bb060d7ed12882af",
        "email": "dummy@mail.com"
      }
    },
    "content": "This is the answer of the what that's still what for the what of what"
  }
}
```



### Downvote Answer

When you already downvoted the answer, hitting this endpoint again will remove your vote. When you already upvoted the answer, this endpoint will change your upvote to downvote.

##### Endpoint

```http
PATCH /answers/:id/downvote
```

##### Header

- access_token **Required**

##### Param

- id **Required** id of the answer

##### Response

Status 200: OK

```json
{
  "message": "[You have downvote] [Your downvote has been removed]",
  "data": {
    "upvotes": [],
    "downvotes": ["5df9acb9bb060d7ed12882af"],
    "_id": "5df9b36096c55281e32eb386",
    "author": {
      "_id": "5df9acb9bb060d7ed12882af",
      "email": "dummy@mail.com"
    },
    "question": {
      "tags": ["javascript", "vue js", "mongoose"],
      "answers": ["5dfa4085ae45ead040553298"],
      "upvotes": [],
      "downvotes": [],
      "_id": "5df9b32a96c55281e32eb384",
      "title": "What is?",
      "description": "What is what what? Why what is what? How what be what when what is what?",
      "author": {
        "_id": "5df9acb9bb060d7ed12882af",
        "email": "dummy@mail.com"
      }
    },
    "content": "This is the answer of the what that's still what for the what of what"
  }
}
```



### Delete Answer

##### Endpoint

```http
DELETE /answers/:id
```

##### Header

- access_token **Required**

##### Param

- id **Required** id of the answer

##### Response

Status 200: OK

```json
{
  "message": "Answer deleted"
}
```
