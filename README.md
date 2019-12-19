# hackoverflow

---

**Create a User**

- **URL**
  <_/users/register_>

- **Method:**
  `POST`

- **URL Params** <br />
  `None`

- **Data Params**
  **Required:**

  `username=[string]` <br />
  `email=[string]` <br />
  `password=[string]`

- **Success Response:**

  - **Code:** 201 <br />
    **Content:**
    ```javascript
        {
            "_id": "5df5edc025ea7741e11ecf19",
            "username": "john",
            "email": "john@mail.com",
            "password": "$2a$10$AtPx6DnLKlnCkjJPBIH7wuCQHVbgdl.2O3NsmMXcnVszILKOEbf22",
            "createdAt": "2019-12-18T08:24:32.268Z",
            "updatedAt": "2019-12-18T08:24:32.268Z",
            "__v": 0
        }
    ```

- **Error Response:**
  - **Code:** 400 Bad Request <br />
    **Content:** `{ error : "email/username already registered" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`

---

**Log In**

- **URL**
  <_/users/login_>

- **Method:**
  `POST`

- **URL Params** <br />
  `None`

- **Data Params**
  **Required:**

  `email=[string]` <br />
  `password=[string]`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```javascript
    {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZjVlZGMwMjVlYTc3NDFlMTFlY2YxOSIsImVtYWlsIjoiam9obkBtYWlsLmNvbSIsImlhdCI6MTU3NjM5ODM4OCwiZXhwIjoxNTc2Mzk4OTg4fQ.FqgruQlO2zaV2YflLBghYg5PrfqAhkMhbVJX39n9ho0"
    }
    ```

- **Error Response:**
  - **Code:** 400 Bad Request <br />
    **Content:** `{ error : "Email and/or password incorrect" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`

---

**Get all questions**

- **URL**
  <_/questions_>

- **Method:**
  `GET`

- **URL Params** <br />
  `access_token=[string]`

- **Data Params** <br />
  `None`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```javascript
    [
        {
            "category": "Javascript",
            "upvotes": [],
            "downvotes": [],
            "_id": "5dfb4977e10ae2403c158289",
            "title": "How to Add, Delete new Columns in Sequelize CLI",
            "description": "I've just started using Sequelize and Sequelize CLI\n\nSince it's a development time, there are a frequent addition and deletion of columns. What the best the method to add a new column to an existing model?\n\nFor example, I want to a new column 'completed' to Todo model. I'll add this column to models/todo.js. Whats the next step?\n\nI tried sequelize db:migrate\n\nnot working: \"No migrations were executed, database schema was already up to date.\"",
            "UserId": "5dfa34c1e1cab51aa2a4a52c",
            "createdAt": "2019-12-19T09:57:11.295Z",
            "updatedAt": "2019-12-19T09:57:11.295Z",
            "__v": 0
        },
        {
            "category": "Javascript",
            "upvotes": [],
            "downvotes": [],
            "_id": "5dfb49c8e10ae2403c15828a",
            "title": "how to get request path with express req object",
            "description": "I'm using express + node.js and I have a req object, the request in the browser is /account but when I log req.path I get '/' --- not '/account'.",
            "UserId": "5dfa34c1e1cab51aa2a4a52c",
            "createdAt": "2019-12-19T09:58:32.930Z",
            "updatedAt": "2019-12-19T09:58:32.930Z",
            "__v": 0
        }
    ]
    ```

- **Error Response:**
  - **Code:** 401 Unauthorized <br />
    **Content:** `{ error : "You must log in first" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`

---

**Post a question**

- **URL**
  <_/questions_>

- **Method:**
  `POST`

- **URL Params** <br />
  `access_token=[string]`

- **Data Params**
  **Required:**
  `title=[string]` <br />
  `description=[string]` <br />
  `category=[string]`

- **Success Response:**

  - **Code:** 201 <br />
    **Content:**
    ```javascript
        {
            "category": "Javascript",
            "upvotes": [],
            "downvotes": [],
            "_id": "5dfb4977e10ae2403c158289",
            "title": "How to Add, Delete new Columns in Sequelize CLI",
            "description": "I've just started using Sequelize and Sequelize CLI\n\nSince it's a development time, there are a frequent addition and deletion of columns. What the best the method to add a new column to an existing model?\n\nFor example, I want to a new column 'completed' to Todo model. I'll add this column to models/todo.js. Whats the next step?\n\nI tried sequelize db:migrate\n\nnot working: \"No migrations were executed, database schema was already up to date.\"",
            "UserId": "5dfa34c1e1cab51aa2a4a52c",
            "createdAt": "2019-12-19T09:57:11.295Z",
            "updatedAt": "2019-12-19T09:57:11.295Z",
            "__v": 0
        }
    ```

- **Error Response:**
  - **Code:** 401 <br />
    **Content:** `{ error : "You must log in first" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`

---

**Get a question**

- **URL**
  <_/questions/{id}_>

- **Method:**
  `GET`

- **URL Params** <br />
  `access_token=[string]`

- **Data Params** <br />
  `None`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```javascript
        {
            "category": "Javascript",
            "upvotes": [],
            "downvotes": [],
            "_id": "5dfb4977e10ae2403c158289",
            "title": "How to Add, Delete new Columns in Sequelize CLI",
            "description": "I've just started using Sequelize and Sequelize CLI\n\nSince it's a development time, there are a frequent addition and deletion of columns. What the best the method to add a new column to an existing model?\n\nFor example, I want to a new column 'completed' to Todo model. I'll add this column to models/todo.js. Whats the next step?\n\nI tried sequelize db:migrate\n\nnot working: \"No migrations were executed, database schema was already up to date.\"",
            "UserId": "5dfa34c1e1cab51aa2a4a52c",
            "createdAt": "2019-12-19T09:57:11.295Z",
            "updatedAt": "2019-12-19T09:57:11.295Z",
            "__v": 0
        }
    ```

- **Error Response:**
  - **Code:** 400 Bad Request <br />
    **Content:** `{ error : "Question not found" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`

---

**Delete a question**

- **URL**
  <_/questions/{id}_>

- **Method:**
  `DELETE`

- **URL Params** <br />
  `access_token=[string]`

- **Data Params** <br />
  `None`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```javascript
        {
            "message": "Question successfully deleted."
        }
    ```

- **Error Response:**
  - **Code:** 400 Bad Request <br />
    **Content:** `{ error : "Question not found" }`
  - **Code:** 401 Unauthorized <br />
    **Content:** `{ error : "Unauthorized process" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`

---

**Update a question**

- **URL**
  <_/questions/{id}_>

- **Method:**
  `PATCH`

- **URL Params** <br />
  `access_token=[string]`

- **Data Params** <br />
  **Options:**
  `title=[string]` <br />
  `description=[string]` <br />
  `category=[string]`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```javascript
        {
            "category": "Javascript",
            "upvotes": [],
            "downvotes": [],
            "_id": "5dfb4977e10ae2403c158289",
            "title": "How to Add, Delete new Columns in Sequelize CLI",
            "description": "I've just started using Sequelize and Sequelize CLI\n\nSince it's a development time, there are a frequent addition and deletion of columns. What the best the method to add a new column to an existing model?\n\nFor example, I want to a new column 'completed' to Todo model. I'll add this column to models/todo.js. Whats the next step?\n\nI tried sequelize db:migrate\n\nnot working: \"No migrations were executed, database schema was already up to date.\"",
            "UserId": "5dfa34c1e1cab51aa2a4a52c",
            "createdAt": "2019-12-19T09:57:11.295Z",
            "updatedAt": "2019-12-19T09:57:11.295Z",
            "__v": 0
        }
    ```

- **Error Response:**
  - **Code:** 400 Bad Request <br />
    **Content:** `{ error : "Question not found" }`
  - **Code:** 401 Unauthorized <br />
    **Content:** `{ error : "Unauthorized process" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`

---

**Vote a question**

- **URL**
  <_/questions/vote/{id}_>

- **Method:**
  `PATCH`

- **URL Params** <br />
  `access_token=[string]`

- **Data Params** <br />
  **Required:**
  `type=[string(upvotes/downvotes)]`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```javascript
        {
            "category": "Javascript",
            "upvotes": ["oqr91wdwe78casv61r1"],
            "downvotes": [],
            "_id": "5dfb4977e10ae2403c158289",
            "title": "How to Add, Delete new Columns in Sequelize CLI",
            "description": "I've just started using Sequelize and Sequelize CLI\n\nSince it's a development time, there are a frequent addition and deletion of columns. What the best the method to add a new column to an existing model?\n\nFor example, I want to a new column 'completed' to Todo model. I'll add this column to models/todo.js. Whats the next step?\n\nI tried sequelize db:migrate\n\nnot working: \"No migrations were executed, database schema was already up to date.\"",
            "UserId": "5dfa34c1e1cab51aa2a4a52c",
            "createdAt": "2019-12-19T09:57:11.295Z",
            "updatedAt": "2019-12-19T09:57:11.295Z",
            "__v": 0
        }
    ```

- **Error Response:**
  - **Code:** 400 Bad Request <br />
    **Content:** `{ error : "Question not found" }`
  - **Code:** 401 Unauthorized <br />
    **Content:** `{ error : "Unauthorized process" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`

---

**Filter questions**

- **URL**
  <_/questions/filter/{category}_>

- **Method:**
  `GET`

- **URL Params** <br />
  `access_token=[string]`

- **Data Params** <br />
  `None`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```javascript
        {
            "category": "Javascript",
            "upvotes": [],
            "downvotes": [],
            "_id": "5dfb4977e10ae2403c158289",
            "title": "How to Add, Delete new Columns in Sequelize CLI",
            "description": "I've just started using Sequelize and Sequelize CLI\n\nSince it's a development time, there are a frequent addition and deletion of columns. What the best the method to add a new column to an existing model?\n\nFor example, I want to a new column 'completed' to Todo model. I'll add this column to models/todo.js. Whats the next step?\n\nI tried sequelize db:migrate\n\nnot working: \"No migrations were executed, database schema was already up to date.\"",
            "UserId": "5dfa34c1e1cab51aa2a4a52c",
            "createdAt": "2019-12-19T09:57:11.295Z",
            "updatedAt": "2019-12-19T09:57:11.295Z",
            "__v": 0
        },
        {
            "category": "Javascript",
            "upvotes": [],
            "downvotes": [],
            "_id": "5dfb49c8e10ae2403c15828a",
            "title": "how to get request path with express req object",
            "description": "I'm using express + node.js and I have a req object, the request in the browser is /account but when I log req.path I get '/' --- not '/account'.",
            "UserId": "5dfa34c1e1cab51aa2a4a52c",
            "createdAt": "2019-12-19T09:58:32.930Z",
            "updatedAt": "2019-12-19T09:58:32.930Z",
            "__v": 0
        }
    ```

- **Error Response:**
  - **Code:** 400 Bad Request <br />
    **Content:** `{ error : "Category not found" }`
  - **Code:** 401 Unauthorized <br />
    **Content:** `{ error : "Unauthorized process" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`

---

**Get all answers with question ID**

- **URL**
  <_/answers/{id}_>

- **Method:**
  `GET`

- **URL Params** <br />
  `access_token=[string]`

- **Data Params** <br />
  `None`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```javascript
    [
        {
            "upvotes": [],
            "downvotes": [],
            "_id": "5dfb47ava9oc7g8158289",
            "title": "Sequelize",
            "description": "After having a bit of a play myself, you should use:console.log(req.originalUrl)",
            "UserId": "5dfa34c1e1cab51aa2a4a52c",
            "QuestionId": "5dfb4977e10ae2403c158289",
            "createdAt": "2019-12-19T09:57:11.295Z",
            "updatedAt": "2019-12-19T09:57:11.295Z",
            "__v": 0
        },
        {
            "upvotes": [],
            "downvotes": [],
            "_id": "5dfb47ava9oc7g8158289",
            "title": "Sequelize",
            "description": "After having a bit of a play myself, you should use:console.log(req.originalUrl)",
            "UserId": "5dfa34c1e1cab51aa2a4a52c",
            "QuestionId": "5dfb4977e10ae2403c158289",
            "createdAt": "2019-12-19T09:57:11.295Z",
            "updatedAt": "2019-12-19T09:57:11.295Z",
            "__v": 0
        }
    ]
    ```

- **Error Response:**
  - **Code:** 401 Unauthorized <br />
    **Content:** `{ error : "You must log in first" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`

---

**Post an answer**

- **URL**
  <_/answers_>

- **Method:**
  `POST`

- **URL Params** <br />
  `access_token=[string]`

- **Data Params**
  **Required:**
  `title=[string]` <br />
  `description=[string]` <br />
  `QuestionId=[string]`

- **Success Response:**

  - **Code:** 201 <br />
    **Content:**
    ```javascript
        {
            "upvotes": [],
            "downvotes": [],
            "_id": "5dfb47ava9oc7g8158289",
            "title": "Sequelize",
            "description": "After having a bit of a play myself, you should use:console.log(req.originalUrl)",
            "UserId": "5dfa34c1e1cab51aa2a4a52c",
            "QuestionId": "5dfb4977e10ae2403c158289",
            "createdAt": "2019-12-19T09:57:11.295Z",
            "updatedAt": "2019-12-19T09:57:11.295Z",
            "__v": 0
        }
    ```

- **Error Response:**
  - **Code:** 401 <br />
    **Content:** `{ error : "You must log in first" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`

---

**Get an answer**

- **URL**
  <_/answers/answer/{id}_>

- **Method:**
  `GET`

- **URL Params** <br />
  `access_token=[string]`

- **Data Params** <br />
  `None`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```javascript
        {
            "upvotes": [],
            "downvotes": [],
            "_id": "5dfb47ava9oc7g8158289",
            "title": "Sequelize",
            "description": "After having a bit of a play myself, you should use:console.log(req.originalUrl)",
            "UserId": "5dfa34c1e1cab51aa2a4a52c",
            "QuestionId": "5dfb4977e10ae2403c158289",
            "createdAt": "2019-12-19T09:57:11.295Z",
            "updatedAt": "2019-12-19T09:57:11.295Z",
            "__v": 0
        }
    ```

- **Error Response:**
  - **Code:** 400 Bad Request <br />
    **Content:** `{ error : "Answer not found" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`

---

**Delete an answer**

- **URL**
  <_/answers/{id}_>

- **Method:**
  `DELETE`

- **URL Params** <br />
  `access_token=[string]`

- **Data Params** <br />
  `None`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```javascript
        {
            "message": "Answer successfully deleted."
        }
    ```

- **Error Response:**
  - **Code:** 400 Bad Request <br />
    **Content:** `{ error : "Answer not found" }`
  - **Code:** 401 Unauthorized <br />
    **Content:** `{ error : "Unauthorized process" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`

---

**Update an answer**

- **URL**
  <_/answers/{id}_>

- **Method:**
  `PATCH`

- **URL Params** <br />
  `access_token=[string]`

- **Data Params** <br />
  **Options:**
  `title=[string]` <br />
  `description=[string]`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```javascript
        {
            "upvotes": [],
            "downvotes": [],
            "_id": "5dfb47ava9oc7g8158289",
            "title": "Sequelize",
            "description": "After having a bit of a play myself, you should use:console.log(req.originalUrl)",
            "UserId": "5dfa34c1e1cab51aa2a4a52c",
            "QuestionId": "5dfb4977e10ae2403c158289",
            "createdAt": "2019-12-19T09:57:11.295Z",
            "updatedAt": "2019-12-19T09:57:11.295Z",
            "__v": 0
        }
    ```

- **Error Response:**
  - **Code:** 400 Bad Request <br />
    **Content:** `{ error : "Answer not found" }`
  - **Code:** 401 Unauthorized <br />
    **Content:** `{ error : "Unauthorized process" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`

---

**Vote an answer**

- **URL**
  <_/answers/vote/{id}_>

- **Method:**
  `PATCH`

- **URL Params** <br />
  `access_token=[string]`

- **Data Params** <br />
  **Required:**
  `type=[string(upvotes/downvotes)]`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```javascript
        {
            "upvotes": [],
            "downvotes": ["oqr91wdwe78casv61r1"],
            "_id": "5dfb47ava9oc7g8158289",
            "title": "Sequelize",
            "description": "After having a bit of a play myself, you should use:console.log(req.originalUrl)",
            "UserId": "5dfa34c1e1cab51aa2a4a52c",
            "QuestionId": "5dfb4977e10ae2403c158289",
            "createdAt": "2019-12-19T09:57:11.295Z",
            "updatedAt": "2019-12-19T09:57:11.295Z",
            "__v": 0
        }
    ```

- **Error Response:**
  - **Code:** 400 Bad Request <br />
    **Content:** `{ error : "Answer not found" }`
  - **Code:** 401 Unauthorized <br />
    **Content:** `{ error : "Unauthorized process" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`