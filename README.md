# HackOverFlow Documentation

**HackOverflow** is a simple forum to post your question over the world and gettin answer by other user. HackOverFlow makes it easy for us to solve problems. HackOverflow is designed by express, Mongoose, Vue, and other packages. If you use this API then run `npm install` to install everything server need.

## Base URL

Base URL of HackOverFlow is :

`http://localhost:<port>`

The port can be added to the .env file, we use port 3000 as the default.

## ENV Template

| Variable   | Data Type |
| ---------- | --------- |
| PORT       | number    |
| SECRET_KEY | string    |

## Sign Up User

**Endpoint** : `/signup`

**Method** : `POST`

**Request** :

- Data Parameters

| Parameters |         Data Type         |
| :--------: | :-----------------------: |
|    name    |     string [required]     |
|  username  | string [unique, required] |
|   email    | string [unique, required] |
|  password  |     string [required]     |

**Response**

- Success

  ```javascript
  {
      "message" : "Sign up success",
      "token": <token : string>,
      "id": <id : string>,
      "username" : <username : string>
  }
  ```

- Error

  1. ValidationError / `400`

     ```javascript
     {
         "errors": {
             "email": {
                 "message": "Email is unavailable",
                 "name": "ValidatorError",
                 "properties": {
                     "msg": "Email is unavailable",
                     "message": "Email is unavailable",
                     "type": "user defined",
                     "path": "email",
                     "value": "example@mail.com"
                 },
                 "kind": "user defined",
                 "path": "email",
                 "value": "example@mail.com"
             }
         },
         "_message": "User validation failed",
         "message": "User validation failed: email: Email is unavailable",
         "name": "ValidationError"
     }
     ```

## Sign In User

**Endpoint** : `/signin`

**Method** : `POST`

**Request** :

- Data Parameters

|  Parameters   |     Data Type     |
| :-----------: | :---------------: |
| emailUsername | string [required] |
|   password    | string [required] |

**Response**

- Success

  ```javascript
  {
      "message": "Sign in success",
      "token": <token : string>,
      "id": <id : string>,
      "username" : <username : string>
  }
  ```

- Error

  1. User not found/Email field empty / `400`

     ```javascript
     {
         "message": "User not found"
     }
     ```

  2. Wrong Password / `400`

     ```javascript
     {
         "message": "Wrong password"
     }
     ```

## Create Question

**Questions can only be made after logging in**

**Endpoint** : `/questions`

**Method** : `POST`

**Request** :

- Data Parameters

| Parameters  | Data Type |
| :---------: | :-------: |
|    title    |  string   |
| description |  string   |

- Headers

|  Parameters  | Data Type |
| :----------: | :-------: |
| access_token |  string   |

- Response

  - Success

    ```javascript
    {
        "message": "Question successfully created",
        "question": {
            "upvotes": [],
            "downvotes": [],
            "_id": <objectId>,
            "title": "Your question",
            "description": "description of question",
            "author": <objectId>,
            "createdAt": "2019-12-18T05:26:03.961Z",
            "updatedAt": "2019-12-18T05:26:03.961Z",
            "__v": 0
        }
    }
    ```

  ```

  ```

- Error

  1. JsonWebTokenError / `401`

     ```javascript
     {
     	"name": "JsonWebTokenError",
     	"message": "jwt must be provided"
     }
     ```

  2. ValidationError /`400`

     ```javascript
     {
     	"message": "ValidationError"
     }
     ```

## Fetch All Question

**Endpoint** : `/question`

**Method** : `GET`

**Request** :

- Headers

|  Parameters  | Data Type |
| :----------: | :-------: |
| access_token |  string   |

- Response

  - Success / `200`

    ```javascript
    {
        "message": "Fetching question success",
        "question": [
            // Questions
        ]
    }
    ```

    \*if question does not exist it will return an empty array.

  - Error

    1. JsonWebTokenError / `401`

       ```javascript
       {
           "name": "JsonWebTokenError",
           "message": "jwt must be provided"
       }
       ```

## Fetch Question By Id

**Endpoint** : `/question/:id`

**Method** : `GET`

**Request** :

- URL Parameters

| Parameters | Data Type |
| :--------: | :-------: |
|     id     |  string   |

- Headers

|  Parameters  | Data Type |
| :----------: | :-------: |
| access_token |  string   |

- Response

  - Success / `200`

    ```javascript
    {
        "message": "Fetching question success",
        "question": [
            // Questions
        ]
    }
    ```

  - Error

    1. JsonWebTokenError / `401`

       ```javascript
       {
           "name": "JsonWebTokenError",
           "message": "jwt must be provided"
       }
       ```

    2. Question not found /`404`

       ```javascript
       {
         message: "Question not found";
       }
       ```

## Fetch Question By Author Id

**Endpoint** : `user/question`

**Method** : `GET`

**Request** :

- Headers

|  Parameters  | Data Type |
| :----------: | :-------: |
| access_token |  string   |

- Response

  - Success / `200`

    ```javascript
    {
        "message": "Fetching question success",
        "question": [
            // Questions
        ]
    }
    ```

    \*if question does not exist it will return an empty array.

  - Error

    1. JsonWebTokenError / `401`

       ```javascript
       {
           "name": "JsonWebTokenError",
           "message": "jwt must be provided"
       }
       ```

## Update Question

**the question can only be updated by the owner**

**Endpoint** : `/questions/:id`

**Method** : `PUT`

**Request** :

- URL Parameters

| Parameters | Data Type |
| :--------: | :-------: |
|     id     |  string   |

- Data Parameters

| Parameters  |     Data Type     |
| :---------: | :---------------: |
|    title    | string [optional] |
| description | number [optional] |

\*the point of optional is you don't have to enter everything

- Headers

| Parameters   | Data Type |
| ------------ | --------- |
| access_token | string    |

- Response

  - Success / `200`

    ```javascript
    {
        "message": "Question updated",
    }

    ```

- Error

  1. JsonWebTokenError / `401`

     ```javascript
     {
         "name": "JsonWebTokenError",
         "message": "jwt must be provided"
     }
     ```

  2. Unauthorized User / `403`

     ```javascript
     {
     	"message": "Unauthorized User"
     }
     ```

## Delete Question

**the question can only be deleted by the owner**

**Endpoint** : `/questions/:id`

**Method** : `DELETE`

**Request** :

- URL Parameters

| Parameters |     Data Type     |
| :--------: | :---------------: |
|     id     | string / objectId |

- Headers

| Parameters   | Data Type |
| ------------ | --------- |
| access_token | string    |

**Response** :

- Success / `200`

  ```javascript
  {
      "message": "Question deleted"
  }

  ```

- Error

  1. JsonWebTokenError / `401`

     ```javascript
     {
         "name": "JsonWebTokenError",
         "message": "jwt must be provided"
     }
     ```

## Upvote Question

**Endpoint** : `/questions/:id/upvote`

**Method** : `PATCH`

**Request** :

- URL Parameters

| Parameters | Data Type |
| :--------: | :-------: |
|     id     |  string   |

- Headers

| Parameters   | Data Type |
| ------------ | --------- |
| access_token | string    |

- Response

  - Success / `200`

    ```javascript
    {
        "message": "Upvote to question success",
    }

    ```

- Error

  1. JsonWebTokenError / `401`

     ```javascript
     {
         "name": "JsonWebTokenError",
         "message": "jwt must be provided"
     }
     ```

## Downvote Question

**Endpoint** : `/questions/:id/downvote`

**Method** : `PATCH`

**Request** :

- URL Parameters

| Parameters | Data Type |
| :--------: | :-------: |
|     id     |  string   |

- Headers

| Parameters   | Data Type |
| ------------ | --------- |
| access_token | string    |

- Response

  - Success / `200`

    ```javascript
    {
        "message": "Downvote to question success",
    }

    ```

- Error

  1. JsonWebTokenError / `401`

     ```javascript
     {
         "name": "JsonWebTokenError",
         "message": "jwt must be provided"
     }
     ```

## Create Answer

**Answer can only be made after logging in**

**Endpoint** : `/answers`

**Method** : `POST`

**Request** :

- Data Parameters

| Parameters  | Data Type |
| :---------: | :-------: |
|    title    |  string   |
| description |  string   |

- Headers

|  Parameters  | Data Type |
| :----------: | :-------: |
| access_token |  string   |

- Response

  - Success

    ```javascript
    {
        "message": "Answer successfully created",
        "question": {
            "upvotes": [],
            "downvotes": [],
            "_id": <objectId>,
            "title": "Your answer",
            "description": "description of answer",
            "author": <objectId>,
            "createdAt": "2019-12-18T05:26:03.961Z",
            "updatedAt": "2019-12-18T05:26:03.961Z",
            "__v": 0
        }
    }
    ```

- Error

  1. JsonWebTokenError / `401`

     ```javascript
     {
     	"name": "JsonWebTokenError",
     	"message": "jwt must be provided"
     }
     ```

  2. ValidationError /`400`

     ```javascript
     {
     	"message": "ValidationError"
     }
     ```

## Fetch Answer By Question

**Endpoint** : `/question`

**Method** : `GET`

**Request** :

- Data Parameters

| Parameters | Data Type |
| :--------: | :-------: |
|  question  |  string   |

- Headers

|  Parameters  | Data Type |
| :----------: | :-------: |
| access_token |  string   |

- Response

  - Success / `200`

    ```javascript
    {
        "message": "Fetching answer success",
        "answers": [
            // Answers
        ]
    }
    ```

    \*if answers does not exist it will return an empty array.

  - Error

    1. JsonWebTokenError / `401`

       ```javascript
       {
           "name": "JsonWebTokenError",
           "message": "jwt must be provided"
       }
       ```

## Update Question

**the question can only be updated by the owner**

**Endpoint** : `/answers/:id`

**Method** : `PUT`

**Request** :

- URL Parameters

| Parameters | Data Type |
| :--------: | :-------: |
|     id     |  string   |

- Data Parameters

| Parameters  |     Data Type     |
| :---------: | :---------------: |
|    title    | string [optional] |
| description | number [optional] |

\*the point of optional is you don't have to enter everything

- Headers

| Parameters   | Data Type |
| ------------ | --------- |
| access_token | string    |

- Response

  - Success / `200`

    ```javascript
    {
        "message": "Answer updated",
    }

    ```

- Error

  1. JsonWebTokenError / `401`

     ```javascript
     {
         "name": "JsonWebTokenError",
         "message": "jwt must be provided"
     }
     ```

  2. Unauthorized User / `403`

     ```javascript
     {
     	"message": "Unauthorized User"
     }
     ```

## Upvote Answer

**Endpoint** : `/answers/:id/upvote`

**Method** : `PATCH`

**Request** :

- URL Parameters

| Parameters | Data Type |
| :--------: | :-------: |
|     id     |  string   |

- Headers

| Parameters   | Data Type |
| ------------ | --------- |
| access_token | string    |

- Response

  - Success / `200`

    ```javascript
    {
        "message": "Upvote to answer success",
    }

    ```

- Error

  1. JsonWebTokenError / `401`

     ```javascript
     {
         "name": "JsonWebTokenError",
         "message": "jwt must be provided"
     }
     ```

## Downvote Answer

**Endpoint** : `/answers/:id/downvote`

**Method** : `PATCH`

**Request** :

- URL Parameters

| Parameters | Data Type |
| :--------: | :-------: |
|     id     |  string   |

- Headers

| Parameters   | Data Type |
| ------------ | --------- |
| access_token | string    |

- Response

  - Success / `200`

    ```javascript
    {
        "message": "Downvote to answer success",
    }

    ```

- Error

  1. JsonWebTokenError / `401`

     ```javascript
     {
         "name": "JsonWebTokenError",
         "message": "jwt must be provided"
     }
     ```
