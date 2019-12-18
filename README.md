# Hacktiv Overflow



| Success Response | Message |
| :--------------- | ------- |
| 201              | Created |
| 200              | OK      |

| Error Response | Message               |
| -------------- | --------------------- |
| 400            | Bad Request           |
| 401            | Unauthorized          |
| 404            | Not Found             |
| 409            | Conflict              |
| 422            | Unprocessable Entity  |
| 500            | Internal Server Error |



#### Register User

* **URL**
  <_/users/register_>

* **Method:**
  `POST` 

* **Data Params:**

  * Required

    > name=[string]
    >
    > email=[string]
    >
    > password=[string]

    

* **Success Response**

  * 201 Created

    ```javascript
    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZGI3ZmYyMzljNzhjMGY5ZTA1ZDBmZSIsImVtYWlsIjoiYW5nZWxhQG1haWwuY29tIiwiaWF0IjoxNTc0NjY4MDgxfQ.aKFh1WzcLFt8sWc11_lIi1FsQNXvv80Cpxrqy5L5xNM",
        "name": "Angela Vanessa",
        "email": "angela@mail.com"
    }
    ```

* **Error Response**

  * 422 Unprocessable Entity

    ```javascript
    {
        "message": [
            "Name can not be empty",
            "Email can not be empty",
            "Password can not be empty"
        ]
    }
    ```

  * 400 Bad Request

    ```javascript
    {
        "message": "Email address is taken."
    }
    ```

#### Login User

* **URL**
  <_/users/login_>

* **Method:**
  `POST` 

* **Data Params:**

  * Required

    > email=[string]
    >
    > password=[string]

  

* **Success Response**

  * 200 OK

    ```javascript
    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZGI3ZmYyMzljNzhjMGY5ZTA1ZDBmZSIsImVtYWlsIjoiYW5nZWxhQG1haWwuY29tIiwiaWF0IjoxNTc0NjY4MDgxfQ.aKFh1WzcLFt8sWc11_lIi1FsQNXvv80Cpxrqy5L5xNM",
        "name": "Angela Vanessa",
        "email": "angela@mail.com"
    }
    ```

#### **Forgot Password Email**

* **URL**
  <_/password-reset_>

* **Method:**
  `POST` 

* **Data Params** 

* **Required:**

  `email=[string]` 

* **Success Response:**

  * **Code:** 200  

#### Reset Password Email

* **URL**
  <_/reset-password_>

* **Method:**
  `POST` 

* **Data Params:**

  * Required

    > token=[string]
    >
    > password=[string]

  

* **Success Response**

  * 200 OK

    ```javascript
    {
      tags: [ 'javascript', 'ruby', 'marlboro' ],
      _id: 5df99e7cfd1214a7ed5fe10c,
      name: 'Angela',
      email: 'angela@mail.com',
      password: '$2a$10$al113tmTMoBQO36TleZD/.WARm9xr1BUaJOwBcRqeTMM2ZY9Fb3Ji',
      createdAt: 2019-12-18T03:35:24.606Z,
      updatedAt: 2019-12-18T22:26:55.719Z,
      __v: 0
    }
    ```

#### Upload Image

* **URL**
  <_/imageUploader_>

* **Method:**
  `POST` 

* **Data Params:**

  * Required

    > image=[file]

  

* **Success Response**

  * 200 OK

    ```javascript
    {
      image: 'https://storage.googleapis.com/hoverflowmedia/1576708127185-asd.png'
    }
    ```

#### Get User Tags

* **URL**
  <_/tags>

* **Method:**
  `GET` 

* **Data Params:**

  None

* **Success Response**

  * 200 OK

    ```javascript
     tags: [ 'javascript', 'ruby', 'marlboro' ] }
    ```

#### Add User Tag

* **URL**
  <_/tags>

* **Method:**
  `PUT` 

* **Data Params:**

  None

* **Success Response**

  * 200 OK

    ```javascript
    {
      tags: [ 'javascript', 'ruby', 'marlboro', 'terbaique', 'benci api doc' ]
    }
    ```

#### Remove User Tag

* **URL**
  <_/tags>

* **Method:**
  `PATCH` 

* **Data Params:**

  None

* **Success Response**

  * 200 OK

    ```javascript
    { tags: [ 'javascript', 'ruby', 'marlboro', 'terbaique' ] }
    ```



Get All Questions**

* **URL**
  <_/questions_>

* **Method:**
  `GET` 

* **Headers** <br />
  none

* **Data Params** <br />
  none

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 

    ```javascript
    [
        {
            "upvotes": [],
            "downvotes": [
                "5df99e7cfd1214a7ed5fe10c"
            ],
            "answers": [
                {
                    "upvotes": [
                        "5df99e7cfd1214a7ed5fe10c"
                    ],
                    "downvotes": [],
                    "_id": "5dfa453239511012dd2b7398",
                    "description": "<p>test</p>",
                    "question": "5df9d3b4c388dbbe102e1ceb",
                    "user": "5df99e7cfd1214a7ed5fe10c",
                    "createdAt": "2019-12-18T15:26:42.039Z",
                    "updatedAt": "2019-12-18T20:27:34.761Z",
                    "__v": 0
                }
            ],
            "tags": [
                "javascript"
            ],
            "_id": "5df9d3b4c388dbbe102e1ceb",
            "title": "editeddddd222",
            "description": "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec ultricies nisl, egestas pellentesque ante. Nullam et blandit nisi. Donec et suscipit sapien, at tristique diam. Aliquam quis lectus imperdiet, ultricies ante nec, interdum nisl. Nam eu arcu eu tellus feugiat facilisis. Curabitur ultrices laoreet ipsum vel faucibus. In commodo, turpis id porttitor pulvinar, mi risus accumsan ligula, faucibus auctor orci felis quis neque. </p>",
            "user": {
                "tags": [
                    "javascript",
                    "ruby",
                    "marlboro"
                ],
                "_id": "5df99e7cfd1214a7ed5fe10c",
                "name": "Angela",
                "email": "angela@mail.com",
                "password": "$2a$10$al113tmTMoBQO36TleZD/.WARm9xr1BUaJOwBcRqeTMM2ZY9Fb3Ji",
                "createdAt": "2019-12-18T03:35:24.606Z",
                "updatedAt": "2019-12-18T22:26:55.719Z",
                "__v": 0
            },
            "createdAt": "2019-12-18T07:22:28.640Z",
            "updatedAt": "2019-12-18T21:09:27.768Z",
            "__v": 0
        }
    ]
    ```



**Get Question By Id**

* **URL**
  <_/questions/:id_>

* **Method:**
  `GET` 

* **Headers** <br />
  none

* **Data Params** <br />
  none

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 

    ```javascript
    {
        "upvotes": [],
        "downvotes": [],
        "answers": [
            {
                "upvotes": [],
                "downvotes": [],
                "_id": "5dfa72c7aaeb72459ea6dbee",
                "description": "<p>teststtt</p>",
                "question": "5dfa71f7aaeb72459ea6dbed",
                "user": "5df99e7cfd1214a7ed5fe10c",
                "createdAt": "2019-12-18T18:41:11.273Z",
                "updatedAt": "2019-12-18T18:41:11.273Z",
                "__v": 0
            }
        ],
        "tags": [
            "asd"
        ],
        "_id": "5dfa71f7aaeb72459ea6dbed",
        "title": "asd",
        "description": "<p>asddddd</p>",
        "user": {
            "tags": [
                "javascript",
                "ruby",
                "marlboro"
            ],
            "_id": "5df99e7cfd1214a7ed5fe10c",
            "name": "Angela",
            "email": "angela@mail.com",
            "password": "$2a$10$al113tmTMoBQO36TleZD/.WARm9xr1BUaJOwBcRqeTMM2ZY9Fb3Ji",
            "createdAt": "2019-12-18T03:35:24.606Z",
            "updatedAt": "2019-12-18T22:26:55.719Z",
            "__v": 0
        },
        "createdAt": "2019-12-18T18:37:43.148Z",
        "updatedAt": "2019-12-18T18:41:11.278Z",
        "__v": 0
    }
    ```


**Create a Question**

* **URL**
  <_/questions_>

* **Method:**
  `POST` 

* **Headers** <br />
  `Authorization=[string]`

* **Data Params** <br />
  **Required:**

  `title=[string]`

  `description=[string]` 

  `tags=[array]` 

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 

    ```javascript 
    {
      upvotes: [],
      downvotes: [],
      answers: [],
      tags: [ 'javascript', 'nodejs' ],
      _id: 5dfaa927c98a6d7df3c8a07d,
      title: 'Ini adalah title',
      description: '<p>Ini adalah description</p><p><img src="https://storage.googleapis.com/hoverflowmedia/1576708127185-asd.png"></p>',
      user: 5df99e7cfd1214a7ed5fe10c,
      createdAt: 2019-12-18T22:33:11.171Z,
      updatedAt: 2019-12-18T22:33:11.171Z,
      __v: 0
    }
    ```

* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** <br />
        `{
            "name": "JsonWebTokenError",
            "message": "invalid token"
        }` <br />
        `{
            "name": "JsonWebTokenError",
            "message": "jwt must be provided"
        }`

**Update a Question**

* **URL**
  <_/questions/:id_>

* **Method:**
  `PUT` 

* **Headers** <br />
  `Authorization=[string]`

* **Data Params** <br />
  **Required:**

  `title=[string]` 

  `description=[string]`

  `tags=[array]` 

* **Success Response:**

  * **Code:** 201 

  * **Content:** 

    ```javascript 
    {
      upvotes: [],
      downvotes: [],
      answers: [],
      tags: [ 'javascript', 'nodejs', 'update' ],
      _id: 5dfaa927c98a6d7df3c8a07d,
      title: 'Ini adalah title terupdate',
      description: '<p>Ini adalah description updated</p><p><img src="https://storage.googleapis.com/hoverflowmedia/1576708127185-asd.png"></p>',
      user: {
        tags: [ 'javascript', 'ruby', 'marlboro' ],
        _id: 5df99e7cfd1214a7ed5fe10c,
        name: 'Angela',
        email: 'angela@mail.com',
        password: '$2a$10$al113tmTMoBQO36TleZD/.WARm9xr1BUaJOwBcRqeTMM2ZY9Fb3Ji',
        createdAt: 2019-12-18T03:35:24.606Z,
        updatedAt: 2019-12-18T22:26:55.719Z,
        __v: 0
      },
      createdAt: 2019-12-18T22:33:11.171Z,
      updatedAt: 2019-12-18T22:33:57.155Z,
      __v: 0
    }
    ```

* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** <br />
        `{
            "name": "JsonWebTokenError",
            "message": "invalid token"
        }` <br />
        `{
            "name": "JsonWebTokenError",
            "message": "jwt must be provided"
        }` <br />
        `{
            "message": "No access."
        }`


**Upvote a Question**

* **URL**
  <_/questions/:id/upvote_>

* **Method:**
  `PATCH` 

* **Headers** <br />
  `Authorization=[string]`

* **Data Params** <br />
  **Required:**

  none

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 

    ```javascript 
    {
        "upvotes": [
            "5df99e7cfd1214a7ed5fe10c"
        ],
        "downvotes": [],
        "answers": [
            {
                "upvotes": [],
                "downvotes": [],
                "_id": "5dfa72c7aaeb72459ea6dbee",
                "description": "<p>teststtt</p>",
                "question": "5dfa71f7aaeb72459ea6dbed",
                "user": "5df99e7cfd1214a7ed5fe10c",
                "createdAt": "2019-12-18T18:41:11.273Z",
                "updatedAt": "2019-12-18T18:41:11.273Z",
                "__v": 0
            }
        ],
        "tags": [
            "asd"
        ],
        "_id": "5dfa71f7aaeb72459ea6dbed",
        "title": "asd",
        "description": "<p>asddddd</p>",
        "user": {
            "tags": [
                "javascript",
                "ruby",
                "marlboro"
            ],
            "_id": "5df99e7cfd1214a7ed5fe10c",
            "name": "Angela",
            "email": "angela@mail.com",
            "password": "$2a$10$al113tmTMoBQO36TleZD/.WARm9xr1BUaJOwBcRqeTMM2ZY9Fb3Ji",
            "createdAt": "2019-12-18T03:35:24.606Z",
            "updatedAt": "2019-12-18T22:26:55.719Z",
            "__v": 0
        },
        "createdAt": "2019-12-18T18:37:43.148Z",
        "updatedAt": "2019-12-18T22:36:00.217Z",
        "__v": 0
    }
    ```

* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** <br />
        `{
            "name": "JsonWebTokenError",
            "message": "invalid token"
        }` <br />
        `{
            "name": "JsonWebTokenError",
            "message": "jwt must be provided"
        }` <br />
        `{
            "message": "No access."
        }`

**Downvote a Question**

* **URL**
  <_/questions/:id/downvote_>

* **Method:**
  `PATCH` 

* **Headers** <br />
  `Authorization=[string]`

* **Data Params** <br />
  **Required:**

  none

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 

    ```javascript 
    {
        "upvotes": [],
        "downvotes": [
            "5df99e7cfd1214a7ed5fe10c"
        ],
        "answers": [
            {
                "upvotes": [],
                "downvotes": [],
                "_id": "5dfa72c7aaeb72459ea6dbee",
                "description": "<p>teststtt</p>",
                "question": "5dfa71f7aaeb72459ea6dbed",
                "user": "5df99e7cfd1214a7ed5fe10c",
                "createdAt": "2019-12-18T18:41:11.273Z",
                "updatedAt": "2019-12-18T18:41:11.273Z",
                "__v": 0
            }
        ],
        "tags": [
            "asd"
        ],
        "_id": "5dfa71f7aaeb72459ea6dbed",
        "title": "asd",
        "description": "<p>asddddd</p>",
        "user": {
            "tags": [
                "javascript",
                "ruby",
                "marlboro"
            ],
            "_id": "5df99e7cfd1214a7ed5fe10c",
            "name": "Angela",
            "email": "angela@mail.com",
            "password": "$2a$10$al113tmTMoBQO36TleZD/.WARm9xr1BUaJOwBcRqeTMM2ZY9Fb3Ji",
            "createdAt": "2019-12-18T03:35:24.606Z",
            "updatedAt": "2019-12-18T22:26:55.719Z",
            "__v": 0
        },
        "createdAt": "2019-12-18T18:37:43.148Z",
        "updatedAt": "2019-12-18T22:36:20.555Z",
        "__v": 0
    }
    ```

* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** <br />
        `{
            "name": "JsonWebTokenError",
            "message": "invalid token"
        }` <br />
        `{
            "name": "JsonWebTokenError",
            "message": "jwt must be provided"
        }` <br />
        `{
            "message": "No access."
        }`

**Delete a Question**

* **URL**
  <_/questions/:id_>

* **Method:**
  `DELETE` 

* **Headers** <br />
  `Authorization=[string]`

* **Data Params** <br />
  **Required:** 
  none

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 

    ```javascript 
    {
        "upvotes": [],
        "downvotes": [
            "5df99e7cfd1214a7ed5fe10c"
        ],
        "answers": [
            "5dfa72c7aaeb72459ea6dbee"
        ],
        "tags": [
            "asd"
        ],
        "_id": "5dfa71f7aaeb72459ea6dbed",
        "title": "asd",
        "description": "<p>asddddd</p>",
        "user": "5df99e7cfd1214a7ed5fe10c",
        "createdAt": "2019-12-18T18:37:43.148Z",
        "updatedAt": "2019-12-18T22:36:20.555Z",
        "__v": 0
    }
    ```

* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** <br />
        `{
            "name": "JsonWebTokenError",
            "message": "invalid token"
        }` <br />
        `{
            "name": "JsonWebTokenError",
            "message": "jwt must be provided"
        }` <br />
        `{
            "message": "No access."
        }`



**Get All Answers**

* **URL**
  <_/answers_>

* **Method:**
  `GET` 

* **Headers** <br />
  none

* **Data Params** <br />
  none

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 

    ```javascript
    [
        {
            "upvotes": [
                "5df99e7cfd1214a7ed5fe10c"
            ],
            "downvotes": [
                "5df99e7cfd1214a7ed5fe10c"
            ],
            "_id": "5dfa3ddf39511012dd2b7396",
            "description": "<p>test123</p><p><img src=\"https://storage.googleapis.com/hoverflowmedia/1576680924732-asd.png\"></p>",
            "question": "5df9a3a284e82dacf543eb06",
            "user": "5df99e7cfd1214a7ed5fe10c",
            "createdAt": "2019-12-18T14:55:27.181Z",
            "updatedAt": "2019-12-18T18:05:22.672Z",
            "__v": 0
        }
    ]
    ```

**Get Answer By Id**

* **URL**
  <_/answers/:id_>

* **Method:**
  `GET` 

* **Headers** <br />
  none

* **Data Params** <br />
  none

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 

    ```javascript
    {
        "upvotes": [
            "5df99e7cfd1214a7ed5fe10c"
        ],
        "downvotes": [
            "5df99e7cfd1214a7ed5fe10c"
        ],
        "_id": "5dfa3ddf39511012dd2b7396",
        "description": "<p>test123</p><p><img src=\"https://storage.googleapis.com/hoverflowmedia/1576680924732-asd.png\"></p>",
        "question": "5df9a3a284e82dacf543eb06",
        "user": "5df99e7cfd1214a7ed5fe10c",
        "createdAt": "2019-12-18T14:55:27.181Z",
        "updatedAt": "2019-12-18T18:05:22.672Z",
        "__v": 0
    }
    ```


**Create an Answer**

* **URL**
  <_/answers_>

* **Method:**
  `POST` 

* **Headers** <br />
  `Authorization=[string]`

* **Data Params** <br />
  **Required:**

  `description=[string]` <br />
  `QuestionId=[string]` <br />

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 

    ```javascript 
    {
      upvotes: [],
      downvotes: [],
      answers: [
        {
          upvotes: [],
          downvotes: [],
          _id: 5dfaaacc03488d7f2ae54ade,
          description: '<p>ini adalah sebuah jawaban</p>',
          question: 5dfaa927c98a6d7df3c8a07d,
          user: 5df99e7cfd1214a7ed5fe10c,
          createdAt: 2019-12-18T22:40:12.840Z,
          updatedAt: 2019-12-18T22:40:12.840Z,
          __v: 0
        }
      ],
      tags: [ 'javascript', 'nodejs', 'update' ],
      _id: 5dfaa927c98a6d7df3c8a07d,
      title: 'Ini adalah title terupdate',
      description: '<p>Ini adalah description updated</p><p><img src="https://storage.googleapis.com/hoverflowmedia/1576708127185-asd.png"></p>',
      user: 5df99e7cfd1214a7ed5fe10c,
      createdAt: 2019-12-18T22:33:11.171Z,
      updatedAt: 2019-12-18T22:40:12.859Z,
      __v: 0
    }
    ```

* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** <br />
        `{
            "name": "JsonWebTokenError",
            "message": "invalid token"
        }` <br />
        `{
            "name": "JsonWebTokenError",
            "message": "jwt must be provided"
        }`


**Update an Answer**

* **URL**
  <_/answers/:id_>

* **Method:**
  `PUT` 

* **Headers** <br />
  `Authorization=[string]`

* **Data Params** <br />
  **Required:**

  `description=[string]` <br />

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 

    ```javascript 
    {
      upvotes: [],
      downvotes: [],
      answers: [
        {
          upvotes: [],
          downvotes: [],
          _id: 5dfaaacc03488d7f2ae54ade,
          description: '<p>ini adalah sebuah jawaban yang sudah di update</p>',
          question: 5dfaa927c98a6d7df3c8a07d,
          user: 5df99e7cfd1214a7ed5fe10c,
          createdAt: 2019-12-18T22:40:12.840Z,
          updatedAt: 2019-12-18T22:40:12.840Z,
          __v: 0
        }
      ],
      tags: [ 'javascript', 'nodejs', 'update' ],
      _id: 5dfaa927c98a6d7df3c8a07d,
      title: 'Ini adalah title terupdate',
      description: '<p>Ini adalah description updated</p><p><img src="https://storage.googleapis.com/hoverflowmedia/1576708127185-asd.png"></p>',
      user: 5df99e7cfd1214a7ed5fe10c,
      createdAt: 2019-12-18T22:33:11.171Z,
      updatedAt: 2019-12-18T22:40:12.859Z,
      __v: 0
    }
    ```

* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** <br />
        `{
            "name": "JsonWebTokenError",
            "message": "invalid token"
        }` <br />
        `{
            "name": "JsonWebTokenError",
            "message": "jwt must be provided"
        }` <br />
        `{
            "message": "No access."
        }`


**Upvote an Answer**

* **URL**
  <_/answers/:id/upvote_>

* **Method:**
  `PATCH` 

* **Headers** <br />
  `Authorization=[string]`

* **Data Params** <br />
  **Required:** 
  none

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 

    ```javascript 
    {
      upvotes: [],
      downvotes: [],
      answers: [
        {
          upvotes: [Array],
          downvotes: [],
          _id: 5dfaaacc03488d7f2ae54ade,
          description: '<p>ini adalah sebuah jawaban</p>',
          question: 5dfaa927c98a6d7df3c8a07d,
          user: 5df99e7cfd1214a7ed5fe10c,
          createdAt: 2019-12-18T22:40:12.840Z,
          updatedAt: 2019-12-18T22:40:59.773Z,
          __v: 0
        }
      ],
      tags: [ 'javascript', 'nodejs', 'update' ],
      _id: 5dfaa927c98a6d7df3c8a07d,
      title: 'Ini adalah title terupdate',
      description: '<p>Ini adalah description updated</p><p><img src="https://storage.googleapis.com/hoverflowmedia/1576708127185-asd.png"></p>',
      user: {
        tags: [ 'javascript', 'ruby', 'marlboro' ],
        _id: 5df99e7cfd1214a7ed5fe10c,
        name: 'Angela',
        email: 'angela@mail.com',
        password: '$2a$10$al113tmTMoBQO36TleZD/.WARm9xr1BUaJOwBcRqeTMM2ZY9Fb3Ji',
        createdAt: 2019-12-18T03:35:24.606Z,
        updatedAt: 2019-12-18T22:26:55.719Z,
        __v: 0
      },
      createdAt: 2019-12-18T22:33:11.171Z,
      updatedAt: 2019-12-18T22:40:12.859Z,
      __v: 0
    }
    ```

* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** <br />
        `{
            "name": "JsonWebTokenError",
            "message": "invalid token"
        }` <br />
        `{
            "name": "JsonWebTokenError",
            "message": "jwt must be provided"
        }` <br />
        `{
            "message": "No access."
        }`

**Downvote an Answer**

* **URL**
  <_/answers/:id/downvote_>

* **Method:**
  `PATCH` 

* **Headers** <br />
  `Authorization=[string]`

* **Data Params** <br />
  **Required:** 
  none

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 

    ```javascript 
    {
      upvotes: [],
      downvotes: [],
      answers: [
        {
          upvotes: [],
          downvotes: [Array],
          _id: 5dfaaacc03488d7f2ae54ade,
          description: '<p>ini adalah sebuah jawaban</p>',
          question: 5dfaa927c98a6d7df3c8a07d,
          user: 5df99e7cfd1214a7ed5fe10c,
          createdAt: 2019-12-18T22:40:12.840Z,
          updatedAt: 2019-12-18T22:41:24.597Z,
          __v: 0
        }
      ],
      tags: [ 'javascript', 'nodejs', 'update' ],
      _id: 5dfaa927c98a6d7df3c8a07d,
      title: 'Ini adalah title terupdate',
      description: '<p>Ini adalah description updated</p><p><img src="https://storage.googleapis.com/hoverflowmedia/1576708127185-asd.png"></p>',
      user: {
        tags: [ 'javascript', 'ruby', 'marlboro' ],
        _id: 5df99e7cfd1214a7ed5fe10c,
        name: 'Angela',
        email: 'angela@mail.com',
        password: '$2a$10$al113tmTMoBQO36TleZD/.WARm9xr1BUaJOwBcRqeTMM2ZY9Fb3Ji',
        createdAt: 2019-12-18T03:35:24.606Z,
        updatedAt: 2019-12-18T22:26:55.719Z,
        __v: 0
      },
      createdAt: 2019-12-18T22:33:11.171Z,
      updatedAt: 2019-12-18T22:40:12.859Z,
      __v: 0
    }
    ```

* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** <br />
        `{
            "name": "JsonWebTokenError",
            "message": "invalid token"
        }` <br />
        `{
            "name": "JsonWebTokenError",
            "message": "jwt must be provided"
        }` <br />
        `{
            "message": "No access."
        }`


**Delete an Answer**

* **URL**
  <_/answers/:id_>

* **Method:**
  `DELETE` 

* **Headers** <br />
  `Authorization=[string]`

* **Data Params** <br />
  **Required:** 
  none

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 

    ```javascript 
    {
      upvotes: [],
      downvotes: [],
      answers: [],
      tags: [ 'javascript', 'nodejs', 'update' ],
      _id: 5dfaa927c98a6d7df3c8a07d,
      title: 'Ini adalah title terupdate',
      description: '<p>Ini adalah description updated</p><p><img src="https://storage.googleapis.com/hoverflowmedia/1576708127185-asd.png"></p>',
      user: 5df99e7cfd1214a7ed5fe10c,
      createdAt: 2019-12-18T22:33:11.171Z,
      updatedAt: 2019-12-18T22:40:12.859Z,
      __v: 0
    }
    ```

* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** <br />
        `{
            "name": "JsonWebTokenError",
            "message": "invalid token"
        }` <br />
        `{
            "name": "JsonWebTokenError",
            "message": "jwt must be provided"
        }` <br />
        `{
            "message": "No access."
        }`