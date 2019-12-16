# Stunoverflow

## Base URL

Default localhost

```http
http://localhost:3000
```

## Errors

### 404: Not Found

- `Endpoint not found`: Happens when you mistyped the routes endpoint. Check if you set it correctly.

### 401: Unauthorized

- `Valid access_token required`: This means you didn't send the required access_token, or your access_token is invalid or broken. If the latter happens to be the case, you can get another access_token from Sign In endpoint.
- `User banned`: This means your access_token is valid, but your account has been revoked/banned from the server. The only thing you can do is to register yourself again.

### 422: Unprocessable Entity

- User validation error: Typically this happens when you try to Sign Up with invalid data. Please check again the requirement for each field. Example error: `Invalid email format`, `Password required`.
- `Wrong email or password`: This happens when you enter invalid email or password during Sign In. Please check again.
- Question validation error: This happens when you try to post a question without all the required data. Example error: `Question title required`, `Question description required`.

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

##### Body

- title **Required**
- description **Required**

##### Response

Status 201: Created

```json
{
  "message": "Question posted",
  "data": {
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

### Get One Question

##### Endpoint

```http
GET /questions/:id
```

##### Response

Status 200: OK

```json
{
  "data": {
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

##### Body

- description **Optional** will response OK even when no data sent

##### Response

Status 200: OK

```json
{
  "message": "Question updated",
  "data": {
    "upvotes": [],
    "downvotes": [],
    "_id": "5df78f849961c4808aa1a5df",
    "title": "What is?",
    "description": "Why this why became why when why still why with why?",
    "author": "5df78131eca931762cde32ff"
  }
}
```
