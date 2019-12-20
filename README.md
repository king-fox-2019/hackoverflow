# hackoverflow

## Register User**

Returns json data about newly registered user.

- **URL**

  /user/register

- **Method:**

  `POST`

- **Data Params**

  &nbsp; name: STRING
  &nbsp; email: STRING
  &nbsp; password: STRING

- **Success Response:**

  - **Code:** 201 <br />

    ```javascript
        {
        "_id": "5de401e04ff47e7e7d539435",
        "name": "Username",
        "email": "user@email.com",
        "password": "$2a$10$8S4ZHyFYKZmiO4enOcYpKOBnl5EY.utDcrdlSLTTs3zG5QdFMDcVS",
        "watchedTags": [],
        "__v": 0
    }
    ```

- **Error Response:**

  - **Code:** 400 Bad Request <br />

    ```javascript
    {
        "error": "ValidationError",
        "message": "User validation failed: name: Path `name` is required., email: Path `email` is      required."
    }
    ```

- **Sample Call:**

  ```javascript
    $.ajax({
        url: `http://localhost:3000/user/register`,
        method: `post`,
        data: {
            name: Username,
            email: user@email.com,
            password: `password`
        }
    })
    .done(result => {
        console.log(result)
    })
    .fail(err => {
        console.log(err)
    })
  ```

## **Login User**

Returns json data about a single user.

- **URL**

  /users/login

- **Method:**

  `POST`

- **Data Params**

  email: STRING
  password: STRING

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

    ```javascript 
    {   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzUyMjM5Nzl9.YbHSsgEs84-KLr9sVH-ZAWhkwvlZ5BUEm8-EpMpZmso",
        "username": "username" }
    ```

- **Error Response:**

  - **Code:** 403 Forbidden <br />
    **Content:**

    ```javascript
    {
        "error": "TypeError",
        "message": "Cannot read property '_id' of null"
    }
    ```

- **Sample Call:**

  ```javascript
    $.ajax({
        url: `<baseURL>/user/login`,
        method: `post`,
        data: {
            email: mail@mail.com
            password: secret
        }
    })
  ```

## 

## Get Questions**

Returns json data of questions.

- **URL**

  /question

- **Method:**

  `GET`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

    ```javascript 
    [
    {
        "answers": [],
        "tags": [
            "asdf"
        ],
        "_id": "5dfc14a3613ffe60fab711de",
        "title": "asdf",
        "description": "asdf",
        "votes": [],
        "author": {
            "watchedTags": [
                "javascript",
                "Python",
                "php",
                "python",
                "php"
            ],
            "_id": "5dfb75ef14e9fd13b987715b",
            "name": "richard",
            "password": "123456",
            "email": "richard@mail.com",
            "__v": 0
        },
        "__v": 0
    },
    {
        "answers": [],
        "tags": [
            "python"
        ],
        "_id": "5dfc40d919fcf32c05e92c6c",
        "title": "How to python?",
        "description": "Just python",
        "votes": [],
        "author": {
            "watchedTags": [
                "javascript",
                "Python",
                "php",
                "python",
                "php"
            ],
            "_id": "5dfb75ef14e9fd13b987715b",
            "name": "richard",
            "password": "123456",
            "email": "richard@mail.com",
            "__v": 0
        },
        "__v": 0
        }
    ]
    ```

- **Sample Call:**

  ```javascript
    $.ajax({
        url: `http://localhost:3000/question`,
        method: `get`
    })
  ```

  ## 

  - ## Create Question**

Add a question.

- **URL**

  /question

- **Method:**

  `POST`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

    ```javascript 
    [
        {
        "answers": [],
        "tags": [
            "python"
        ],
        "_id": "5dfc40d919fcf32c05e92c6c",
        "title": "How to python?",
        "description": "Just python",
        "votes": [],
        "author": {
            "watchedTags": [
                "javascript",
                "Python",
                "php",
                "python",
                "php"
            ],
            "_id": "5dfb75ef14e9fd13b987715b",
            "name": "richard",
            "password": "123456",
            "email": "richard@mail.com",
            "__v": 0
        },
        "__v": 0
        }
    ]
    ```

     **Error Response:**

  - **Code:** 403 Forbidden <br />
    **Content:**

    ```javascript
    {
        "error": "CastError",
        "message": "Cast to ObjectId failed for value \"5de29ccf6c5dfb4b6c492af\" at path \"_id\" for model     \"Question\""
    }
    ```

- **Sample Call:**

  ```javascript
    $.ajax({
        url: `http://localhost:3000/question`,
        method: `post`,
        data:{
            title,description,tags
        }
    })
  ```

  ## 

  - ## **Update question**

Update a question and return JSON data.

- **URL**

  /question

- **Method:**

  `PUT`

- **Success Response:**

  - **Code:** 201<br />
    **Content:**

    ```javascript 
    {
        "n": 1,
        "nModified": 1,
        "ok": 1
    }
    
    ```

     **Error Response:**

  - **Code:** 403 Forbidden <br />
    **Content:**

  ```javascript
  {
        "n": 0,
        "ok": 1,
        "deletedCount": 0
    }
  ```

- **Sample Call:**

  ```javascript
    $.ajax({
          method:"put",
          url:"http://localhost:3000/question",
          data:{
              title,description
          }
      })
  ```

    ## 

    -   ## Delete Question**

Delete a question and return JSON data.

- **URL**

  /question

- **Method:**

  `DELETE`

- **Success Response:**

  - **Code:** 201<br />
    **Content:**

    ```javascript 
    {
        "n": 1,
        "ok": 1,
        "deletedCount": 1
    }
    
    ```

     **Error Response:**

  - **Code:** 403 Forbidden <br />
    **Content:**

  ```javascript
  {
        "n": 0,
        "ok": 1,
        "deletedCount": 0
    }
  ```

- **Sample Call:**

  ```javascript
    $.ajax({
          method:"delete",
          url:"http://localhost:3000/question",
          data:{
              id
          }
      })
  ```

    ## 

    ## 

## Get Answers**

Returns json data of answers.

- **URL**

  /answer

- **Method:**

  `GET`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

    ```javascript 
    [
    {
    {
        "answers": [],
        "tags": [
            "python"
        ],
        "_id": "5dfc40d919fcf32c05e92c6c",
        "description": "Just python",
        "question": "5dfc40d919fcf32c05e92c6c",
        "author": {
            "watchedTags": [
                "javascript",
                "Python",
                "php",
                "python",
                "php"
            ],
            "_id": "5dfb75ef14e9fd13b987715b",
            "name": "richard",
            "password": "123456",
            "email": "richard@mail.com",
            "__v": 0
        },
        "votes": []
        "__v": 0
        }
    ]
    ```

- **Sample Call:**

  ```javascript
    $.ajax({
        url: `http://localhost:3000/question`,
        method: `get`
    })
  ```

  ## 

  - ## Create Answer**

Add a answer.

- **URL**

  /answer

- **Method:**

  `POST`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

    ```javascript 
    [
        {
        "answers": [],
        "tags": [
            "python"
        ],
        "_id": "5dfc40d919fcf32c05e92c6c",
        "description": "Just python",
        "question": "5dfc40d919fcf32c05e92c6c",
        "author": {
            "watchedTags": [
                "javascript",
                "Python",
                "php",
                "python",
                "php"
            ],
            "_id": "5dfb75ef14e9fd13b987715b",
            "name": "richard",
            "password": "123456",
            "email": "richard@mail.com",
            "__v": 0
        },
        "votes": []
        "__v": 0
        }   
    ]
    ```

     **Error Response:**

  - **Code:** 403 Forbidden <br />
    **Content:**

    ```javascript
    {
        "error": "CastError",
        "message": "Cast to ObjectId failed for value \"5de29ccf6c5dfb4b6c492af\" at path \"_id\" for model     \"Question\""
    }
    ```

- **Sample Call:**

  ```javascript
    $.ajax({
        url: `http://localhost:3000/answer`,
        method: `post`,
        data:{
            description
        }
    })
  ```

  ## 

  - ## **Update answer**

Update an answer and return JSON data.

- **URL**

  /answer

- **Method:**

  `PUT`

- **Success Response:**

  - **Code:** 201<br />
    **Content:**

    ```javascript 
    {
        "n": 1,
        "nModified": 1,
        "ok": 1
    }
    
    ```

     **Error Response:**

  - **Code:** 403 Forbidden <br />
    **Content:**

  ```javascript
  {
        "n": 0,
        "ok": 1,
        "deletedCount": 0
    }
  ```

- **Sample Call:**

  ```javascript
    $.ajax({
          method:"put",
          url:"http://localhost:3000/answer",
          data:{
              description
          }
      })
  ```

    ## 

    -   ## Delete answer**

Delete a answer and return JSON data.

- **URL**

  /answer

- **Method:**

  `DELETE`

- **Success Response:**

  - **Code:** 201<br />
    **Content:**

    ```javascript 
    {
        "n": 1,
        "ok": 1,
        "deletedCount": 1
    }
    
    ```

     **Error Response:**

  - **Code:** 403 Forbidden <br />
    **Content:**

  ```javascript
  {
        "n": 0,
        "ok": 1,
        "deletedCount": 0
    }
  ```

- **Sample Call:**

  ```javascript
    $.ajax({
          method:"delete",
          url:"http://localhost:3000/answer",
          data:{
              id
          }
      })
  ```

    ## 

      - ## **Vote answer**

Update an answer and return JSON data.

- **URL**

  /answer

- **Method:**

  `PUT`

- **Success Response:**

  - **Code:** 201<br />
    **Content:**

    ```javascript 
    {
        "n": 1,
        "nModified": 1,
        "ok": 1
    }
    
    ```

     **Error Response:**

  - **Code:** 403 Forbidden <br />
    **Content:**

  ```javascript
  {
        "n": 0,
        "ok": 1,
        "deletedCount": 0
    }
  ```

- **Sample Call:**

  ```javascript
    $.ajax({
          method:"put",
          url:"http://localhost:3000/answer",
          data:{
              vote
          }
      })
  ```

    ##