# Hacktiflow API Documentation

## **A. User Routes**
- - -
|No.| Routes         | HTTP | Headers | Body | Description |
|---|----------------|------|---------|------|---|
|1.| /users/register | POST | None | name: string, email: string, password: string | Register as a user |
|2.| /users/login    | POST | None | email: string, password: string | Log in as an existing user |
|3.| /users/user | POST | access_token: string | None | Fetch currently logged in user's data |
|4.| /users/tags | POST | access_token: string | None | Watch tag(s) |
|5.| /users/tags/:tag | DELETE | access_token: string | None | Remove a tag from watched tags |


**1. Register**
----
  Returns an access token.

* **URL**

  /users/register

* **Method:**

  `POST`
  
*  **URL Params**

   None

*  **Header Params**

   None

* **Data Params**

  name: string; email: string; password: string

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{ "message": "Successfully registered!", "access_token": "bar" }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{
    "messages": [
        "Email address has already been used!"
    ]
    }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```js
    {
    "messages": [
        "Please input your name!",
        "Please input your email address!",
        "Please input your password!"
      ]  
    }

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```js
    {
      "messages": [
        "Your password must contains both number and letters!"
      ]
    }

**2. Log in**
----
  Returns an access token.

* **URL**

  /users/login

* **Method:**

  `POST`
  
*  **URL Params**

   None

* **Data Params**

  None

* **Data Params**

  email: string; password: string;

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ "message": "Successfully logged in!", "access_token": "bar" }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{
    "messages": [
        "Wrong email/password!"
    ]
}`

**3. Fetch currently logged in user's data**
----

* **URL**

  /users/user

* **Method:**

  `GET`

* **Headers**

  access_token: string

* **Body**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```js
    {
    "user": {
        "reputation": 0,
        "watchedTags": [],
        "_id": "5df9d626a5b49868a7fa3ab8",
        "name": "risan",
        "email": "risan@mail.com",
        "password": "$2a$09$r5Tbwt.OKNQrt3YSzlsC8OdzU1y9kiH97c08BHMs1Lv3euuzfXJLW",
        "createdAt": "2019-12-18T07:32:54.884Z",
        "updatedAt": "2019-12-18T07:32:54.884Z",
        "__v": 0
        }
    }
    ```
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{
    "messages": [
        "unauthorized access!"
    ]
}`

**4. Watch tag(s)**
----

* **URL**

  /tags

* **Method:**

  `POST`

* **Headers**

  access_token: string

* **Body**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```js
    {
      "message": "Added 'python' to watched tags."
    }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:**
    ```js
    {
      "messages": [
          "Tag 'laravel, raspberry' do not exist on this site."
        ]
    }
    ```
}`

**5. Unwatch a tag**
----

* **URL**

  /tags/:tag

* **Method:**

  `DELETE`

* **Headers**

  access_token: string

* **Body**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```js
    {
      "message": "Added 'python' to watched tags."
    }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:**
    ```js
    {
      "messages": [
          "Please input a tag that you want to unwatch!"
      ]
    }
    ```
    OR 

  * **Code:** 400 BAD REQUEST <br />
    **Content:**
    ```js
    {
      "messages": [
          "You are not watching this tag!"
      ]
    }
    ```
}`

- - -

## **B. Question Routes**
- - -
|No.| Routes         | HTTP | Headers | Query | Body | Description |
|---|----------------|------|---------|---|------|---|
|1.| /questions    | GET | None | None | None | Fetch all questions |
|2.| /questions/search | GET | None | [,q: string [,tag: string | None | Filter questions |
|3.| /questions | POST | access_token: string | None | title: string, description: string, upvotes: number, downvotes: number | Add a question |
|4.| /questions/:id | GET | None | None | None | Fetch a question by id |
|5.| /questions/:id | PATCH | access_token: string | None | _id: string, title: string, description: string, upvotes: number, downvotes: number | Update a question
|6.| /questions/:id | DELETE | access_token: string | None | Delete a question |
|7.| /questions/:id/upvote | PATCH | access_token: string | None | Upvote a question |
|8.| /questions/:id/downvote | PATCH | access_token: string | None | Downvote a question | 


**1. Fetch all questions**
----
  Returns all questions from the database.

* **URL**

  /questions

* **Method:**

  `GET`
  
*  **Headers**

   None

*  **Query**

   None

* **Body**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```js
    {
      "questions": [
        {
            "upvotes": 0,
            "downvotes": 0,
            "answers": [],
            "_id": "5dd26662d1ee2369587f11bb",
            "title": "Boostrap - Align text and icons on sidebar",
            "description": "As we can see in the sidebar the icons is aligned, but the text not,the text are a little to left.\n\nSo the question is: How can i align the icons and the text?",
            "asker": "5dd25de1d97b34578a1db900",
            "createdAt": "2019-11-18T09:37:38.969Z",
            "updatedAt": "2019-11-18T09:37:38.969Z",
            "__v": 0
        }
      ]
    }
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{
    "messages": [
        "Failed to fetch questions. Please refresh the browser!"
    ]
}`

**2. Filter questions**
----

* **URL**

  /questions/search

* **Method:**

  `GET`
  
*  **Headers**

   None

*  **Query**

   - q=string -> a general filter for questions where the title or description include the query
   - tag=string -> query to filter for questions with a specific tag

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```js
    {
      "questions": [
        {
            "upvotes": 0,
            "downvotes": 0,
            "answers": [],
            "_id": "5dd26662d1ee2369587f11bb",
            "title": "Boostrap - Align text and icons on sidebar",
            "description": "As we can see in the sidebar the icons is aligned, but the text not,the text are a little to left.\n\nSo the question is: How can i align the icons and the text?",
            "asker": "5dd25de1d97b34578a1db900",
            "createdAt": "2019-11-18T09:37:38.969Z",
            "updatedAt": "2019-11-18T09:37:38.969Z",
            "__v": 0
        }
      ]
    }
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{
    "messages": [
        "Failed to fetch questions. Please refresh the browser!"
    ]
}`

**3. Add a question**
----
  Create a new question.

* **URL**

  /questions

* **Method:**

  `POST`
  
*  **URL Params**

   None

*  **Header Params**

   access_token: string

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```js
    {
      "message": "Successfully posted a question!",
      "question": {
        "upvotes": 0,
        "downvotes": 0,
        "answers": [],
        "_id": "5dd26662d1ee2369587f11bb",
        "title": "Boostrap - Align text and icons on sidebar",
        "description": "As we can see in the sidebar the icons is aligned, but the text not,the text are a little to left.\n\nSo the question is: How can i align the icons and the text?",
        "asker": "5dd25de1d97b34578a1db900",
        "createdAt": "2019-11-18T09:37:38.969Z",
        "updatedAt": "2019-11-18T09:37:38.969Z",
        "__v": 0
    }
  }
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{
    "messages": [
        "Failed to submit the question. Please try again!"
    ]
  }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:**
    ```js
    {
      "messages": [
        "Title is missing.",
        "Description is missing."
      ]
    }

**4. Fetch a question by id**
----
  Fetch a specific question.

* **URL**

  /questions/:id

* **Method:**

  `GET`
  
*  **URL Params**

   None

*  **Header Params**

   None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```js
    {
      "question": [
          {
            "upvotes": 0,
            "downvotes": 0,
            "answers": [],
            "_id": "5dd26662d1ee2369587f11bb",
            "title": "Boostrap - Align text and icons on sidebar",
            "description": "As we can see in the sidebar the icons is aligned, but the text not,the text are a little to left.\n\nSo the question is: How can i align the icons and the text?",
            "asker": "5dd25de1d97b34578a1db900",
            "createdAt": "2019-11-18T09:37:38.969Z",
            "updatedAt": "2019-11-18T09:37:38.969Z",
            "__v": 0
          }
      ]
    }
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{
    "messages": [
        "Failed to fetch the question. Please try again!"
    ]
}`

**5. Update a question**
----
  Update a specific question.

* **URL**

  /questions/:id

* **Method:**

  `PUT`
  
*  **URL Params**

   None

*  **Header Params**

   access_token: string

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```js
    {
      "message": "Successfully updated a question!",
      "question": {
        "upvotes": 0,
        "downvotes": 0,
        "answers": [],
        "_id": "5dd26662d1ee2369587f11bb",
        "title": "A new question title",
        "description": "As we can see in the sidebar the icons is aligned, but the text not,the text are a little to left.\n\nSo the question is: How can i align the icons and the text?",
        "asker": "5dd25de1d97b34578a1db900",
        "createdAt": "2019-11-18T09:37:38.969Z",
        "updatedAt": "2019-11-18T12:29:09.711Z",
        "__v": 0
      }
    }
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{
    "messages": [
        "Failed to update the question. Please try again!"
    ]
  }`

  OR

    * **Code:** 401 UNAUTHORIZED <br />
      **Content:** `{
      "messages": [
          "Unauthorized access!"
      ]
    }`

**6.Delete a question**
----
  DElete a specific question.

* **URL**

  /questions/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

   None

*  **Header Params**

   access_token: string

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```js
    {
      "message": "Successfully deleted a question!",
      "question": {
        "upvotes": 0,
        "downvotes": 0,
        "answers": [],
        "_id": "5dd26662d1ee2369587f11bb",
        "title": "A new question title",
        "description": "As we can see in the sidebar the icons is aligned, but the text not,the text are a little to left.\n\nSo the question is: How can i align the icons and the text?",
        "asker": "5dd25de1d97b34578a1db900",
        "createdAt": "2019-11-18T09:37:38.969Z",
        "updatedAt": "2019-11-18T12:29:09.711Z",
        "__v": 0
      }
    }
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{
    "messages": [
        "Failed to delete the question. Please try again!"
    ]
  }`

  OR

    * **Code:** 401 UNAUTHORIZED <br />
      **Content:** `{
      "messages": [
          "Unauthorized access!"
      ]
    }`

**7. Upvote a question**
----
  Upvote a question.

* **URL**

  /questions/:id/upvote

* **Method:**

  `PATCH`
  
*  **URL Params**

   None

*  **Header Params**

   access_token: string

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```js
    {
    "message": "Successfully upvoted a question!",
    "question": {
        "upvotes": 1,
        "downvotes": 0,
        "answers": [],
        "_id": "5dd296529bdac623e988f74c",
        "title": "azure custom vision model precision",
        "description": "I want to know the best way to optimize my custom vision.\n\nIn using Image classification, will...",
        "asker": "5dd25de1d97b34578a1db900",
        "createdAt": "2019-11-18T13:02:10.952Z",
        "updatedAt": "2019-11-18T13:16:54.625Z",
        "__v": 0
    }
}
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{
    "messages": [
        "Failed to upvote the question. Please try again!"
    ]
  }`

  OR

    * **Code:** 401 UNAUTHORIZED <br />
      **Content:** `{
      "messages": [
          "Unauthorized access!"
      ]
    }`

**8. Downvote a question**
----
  Downvote a specific question.

* **URL**

  /questions/:id/downvote

* **Method:**

  `PATCH`
  
*  **URL Params**

   None

*  **Header Params**

   access_token: string

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```js
    {
    "message": "Successfully downvoted a question!",
    "question": {
        "upvotes": 1,
        "downvotes": 1,
        "answers": [],
        "_id": "5dd296529bdac623e988f74c",
        "title": "azure custom vision model precision",
        "description": "I want to know the best way to optimize my custom vision.\n\nIn using Image classification, will...",
        "asker": "5dd25de1d97b34578a1db900",
        "createdAt": "2019-11-18T13:02:10.952Z",
        "updatedAt": "2019-11-18T13:16:54.625Z",
        "__v": 0
    }
}
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{
    "messages": [
        "Failed to downvote the question. Please try again!"
    ]
  }`

  OR

    * **Code:** 401 UNAUTHORIZED <br />
      **Content:** `{
      "messages": [
          "Unauthorized access!"
      ]
    }`
- - -

## **C. Answer Routes**
- - -
| Routes         | HTTP | Headers | Body |
|----------------|------|---------|------|
| /answers    | GET | access_token: string | None |
| /answers | POST | access_token: string | description: string, upvotes: number, downvotes: number |
| /answers/:id | GET | access_token: string | None |
| /answers/:id | PATCH | access_token: string | _id: string, description: string, upvotes: number, downvotes: number |
| /answers/:id | DELETE | access_token: string | None |

**1. Fetch all answers**
----
  Returns all answers from the database.

* **URL**

  /answers

* **Method:**

  `GET`
  
*  **URL Params**

   None

*  **Header Params**

   access_token: string

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ "answers": [{"foo": "bar"}] }`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{
    "messages": [
        "Failed to fetch answers. Please refresh the browser!"
    ]
}`

**2. Add an answer**
----
  Create a new answer.

* **URL**

  /answers

* **Method:**

  `POST`
  
*  **URL Params**

   None

*  **Header Params**

   access_token: string

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ "message": "Successfully published an answer!" }`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{
    "messages": [
        "Failed to submit the answer. Please try again!"
    ]
}`

**3. Fetch an answer**
----
  Fetch a specific answer.

* **URL**

  /answers/:id

* **Method:**

  `GET`
  
*  **URL Params**

   None

*  **Header Params**

   access_token: string

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ "answer": {"foo": "bar"} }`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{
    "messages": [
        "Failed to fetch the answer. Please try again!"
    ]
}`

**4. Update an answer**
----
  Update a specific answer.

* **URL**

  /answers/:id

* **Method:**

  `PATCH`
  
*  **URL Params**

   None

*  **Header Params**

   access_token: string

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ "answer": {"foo": "bar"} }`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{
    "messages": [
        "Failed to update the answer. Please try again!"
    ]
}`

**5.Delete an answer**
----
  DElete a specific answer.

* **URL**

  /answers/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

   None

*  **Header Params**

   access_token: string

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ "message": "Successfully deleted an answer!"} }`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{
    "messages": [
        "Failed to delete the answer. Please try again!"
    ]
}`