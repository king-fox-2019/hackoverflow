# hackoverflow

**BASE URL**

```javascript
http://localhost:3003/
```

**DEPLOY**

```tex
http://hackoverflow.sukmabrahmantya.com/
```



## USER REGISTER

- **URL's**

  ```json
  /users/register
  ```

- **URL Params**

  - Require : `none`
  - Optional : `none`

- **Data Params**

  - Require : `username: [string]` , `email: [string]` , `password: [string]`

- **Headers**

  - Require : `none`

- **HTTP Method**

  `POST`

- **Success Response**

  - Code	: 201 OK

  - Content :

    ```json
    {
        "id": "5df9aefc59bfa22110cc49f1",
        "username": "testing",
        "email": "testing@mail.com",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZjlhZWZjNTliZmEyMjExMGNjNDlmMSIsImlhdCI6MTU3NjY0NDM0OH0.U5SfTTyJNUGTWjTRwFWAB-uBwVXzERC2ISZ-HLpyIZU"
    }
    ```

- **Error Response**

  - Validation Username

    - Code	: 422 Unprocessable Entity

    - Content :

      ```json
      {
          "message": "User validation failed: username: User Name cannot be empty!"
      }
      ```

  - Validation Password

    - Code	: 422 Unprocessable Entity

    - Content :

      ```json
      {
          "message": "User validation failed: password: Password cannot be empty!"
      }
      ```

  - Validation Email

    - Code	: 422 Unprocessable Entity

    - Content :

      ```json
      {
          "message": "User validation failed: email: Email cannot be empty!"
      }
      ```

  - Validation Unique Email

    - Code	: 422 Unprocessable Entity

    - Content :

      ```json
      {
          "message": "User validation failed: email: Email already taken!"
      }
      ```

  - Validation Username, Password, and Email

    - Code	: 422 Unprocessable Entity

    - Content :

      ```json
      {
          "message": "User validation failed: email: Email cannot be empty!, password: Password cannot be empty!, username: Username cannot be empty!"
      }
      ```

  - **Sample Call**

  ```javascript
  return axios.post('users/register', payload)
  ```



## USER LOGIN

- **URL's**

  ```json
  /users/login
  ```

- **URL Params**

  - Require : `none`
  - Optional : `none`

- **Data Params**

  - Require : `email: [string]` , `password: [string]`
  - Optional : `none`

- **Headers**

  - Require : `none`

- **HTTP Method**

  `POST`

- **Success Response**

  - Code	: 200 OK

  - Content :

    ```json
    {
        "id": "5df9aefc59bfa22110cc49f1",
        "username": "testing",
        "email": "testing@mail.com",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZjlhZWZjNTliZmEyMjExMGNjNDlmMSIsImlhdCI6MTU3NjY0NDM3Mn0.P2QdI9CYqiuPvO1q18xlgp7C9VIjLuVjZB8DsVLlW-U"
    }
    ```

- **Error Response**

  - Validation Email Not Register

    - Code	: 400 Bad Request

    - Content :

      ```json
      {
          "message": "Your email is not registered"
      }
      ```

  - Validation Passwords and Users do not Match

    - Code	: 400 Bad Request

    - Content :

      ```json
      {
          "message": "Your password is wrong"
      }
      ```

  - **Sample Call**

  ```javascript
  return axios.post('users/login', payload)
  ```



## QUESTION CREATE

- **URL's**

  ```json
  /question/
  ```

- **URL Params**

  - Require : `none`
  - Optional : `none`

- **Data Params**

  - Require : `title: [string]` ,   `description: [number]` 

- **Headers**

  - Require : `token: [string]`

- **HTTP Method**

  `POST`

- **Success Response**

  - Code	: 201 Created

  - Content :

    ```json
    {
        "answers": [],
        "upVotes": [],
        "downVotes": [],
        "_id": "5df9afdc6995c922df3f022a",
        "title": "testing Question",
        "description": "testing Beta",
        "userId": "5df9aefc59bfa22110cc49f1",
        "__v": 0
    }
    ```

- **Error Response**

  - Validation Title

    - Code	: 422 Unprocessable Entity

    - Content :

      ```json
      {
          "message": "Question validation failed: title: Title cannot be empty"
      }
      ```

  - Validation Description

    - Code	: 422 Unprocessable Entity

    - Content :

      ```json
      {
          "message": "Question validation failed: description: Description cannot be empty"
      }
      ```

  - Validation Title and Description

    - Code	: 422 Unprocessable Entity

    - Content :

      ```json
      {
          "message": "Question validation failed: title: Title cannot be empty, description: Description cannot be empty"
      }
      ```

  - Authentication User

    - Code	: 401 Unauthorized

    - Content :

      ```json
      {
          "message": "Invalid Access Token"
      }
      ```

- **Sample Call**

  ```javascript
  createQuestion ({ commit }, payload) {
    return axios({
      method: 'POST',
      url: 'question',
      headers: { token: localStorage.getItem('token') },
      data: payload
    })
  },
  ```



## QUESTION READ ALL

- **URL's**

  ```json
  /question/
  ```

- **URL Params**

  - Require : `none`
  - Optional : `none`

- **Data Params**

  - Require : `none`
  - Optional : `none`

- **Headers**

  - Require : `token: [string]`

- **HTTP Method**

  `GET`

- **Success Response**

  - Code	: 200 OK

  - Content :

    ```json
    [
        {
            "answers": [],
            "upVotes": [],
            "downVotes": [],
            "_id": "5df9afdc6995c922df3f022a",
            "title": "testing Question",
            "description": "testing Beta",
            "userId": {
                "_id": "5df9aefc59bfa22110cc49f1",
                "email": "testing@mail.com",
                "password": "$2a$11$QZTS.ZkvH3kJ9gXRfSfMaewIdzdHKjvNwUeVKappTlp6VHN2FdnZ6",
                "username": "testing",
                "__v": 0
            },
            "__v": 0
        },
        {
            "answers": [],
            "upVotes": [],
            "downVotes": [],
            "_id": "5df9b2a16995c922df3f0231",
            "title": "testing Question v2",
            "description": "testing Beta",
            "userId": {
                "_id": "5df9b28c6995c922df3f0230",
                "email": "testing2@mail.com",
                "password": "$2a$11$GcVH6IdCFZU6vJGeOnAP0Ov3VydSXTkx950kTAn4mkfzL5D4FYblW",
                "username": "testing2",
                "__v": 0
            },
            "__v": 0
        }
    ]
    ```

- **Error Response**

  - Authentication User

    - Code	: 401 Unauthorized

    - Content :

      ```json
      {
          "message": "Invalid Access Token"
      }
      ```

- **Sample Call**

  ```javascript
  axios.get('question', ({ headers: { token: localStorage.getItem('token') } }))
    .then(({ data }) => {
    commit('SET_QUESTION', data)
  })
    .catch((err) => {
    console.log(err.response)
  })
  ```



## QUESTION READ ONE

- **URL's**

  ```json
  /items/:id
  ```

- **URL Params**

  - Require : `id: [string]`
  - Optional : `none`

- **Data Params**

  - Require : `none`
  - Optional : `none`

- **Headers**

  - Require : `token: [string]`

- **HTTP Method**

  `GET`

- **Success Response**

  - Code	: 200 OK

  - Content :

    ```json
    {
        "answers": [],
        "upVotes": [],
        "downVotes": [],
        "_id": "5df9afdc6995c922df3f022a",
        "title": "testing Question",
        "description": "testing Beta",
        "userId": {
            "_id": "5df9aefc59bfa22110cc49f1",
            "email": "testing@mail.com",
            "password": "$2a$11$QZTS.ZkvH3kJ9gXRfSfMaewIdzdHKjvNwUeVKappTlp6VHN2FdnZ6",
            "username": "testing",
            "__v": 0
        },
        "__v": 0
    }
    ```

- **Error Response**

  - Authentication User

    - Code	: 401 Unauthorized

    - Content :

      ```json
      {
          "message": "Invalid Access Token"
      }
      ```

- **Sample Call**

  ```javascript
  return axios.get(`question/${payload}`, ({ headers: { token: localStorage.getItem('token') } }))
    .then(({ data }) => {
    commit('SET_DETAILQUESTION', data)
    return data
  })
    .catch((err) => {
    console.log(err.response)
  })
  ```



## QUESTION UP VOTES

- **URL's**

  ```json
  /question/upvotes/:id
  ```

- **URL Params**

  - Require : `id: [string]`
  - Optional : `none`

- **Data Params**

  - Require : `none`
  - Optional : `none`

- **Headers**

  - Require : `token: [string]`

- **HTTP Method**

  `PATCH`

- **Success Response**

  - Code	: 200 OK

  - Content :

    ```json
    {
        "answers": [],
        "upVotes": [
            "5df9aefc59bfa22110cc49f1"
        ],
        "downVotes": [],
        "_id": "5df9afdc6995c922df3f022a",
        "title": "testing Question",
        "description": "testing Beta",
        "userId": {
            "_id": "5df9aefc59bfa22110cc49f1",
            "email": "testing@mail.com",
            "password": "$2a$11$QZTS.ZkvH3kJ9gXRfSfMaewIdzdHKjvNwUeVKappTlp6VHN2FdnZ6",
            "username": "testing",
            "__v": 0
        },
        "__v": 8
    }
    ```

- **Error Response**

  - Authentication User

    - Code	: 401 Unauthorized

    - Content :

      ```json
      {
          "message": "Invalid Access Token"
      }
      ```

- **Sample Call**

  ```javascript
  return axios({
    method: 'PATCH',
    url: `question/upvotes/${payload}`,
    headers: { token: localStorage.getItem('token') }
  })
  ```



## QUESTION DOWN VOTES

- **URL's**

  ```json
  /question/upvotes/:id
  ```

- **URL Params**

  - Require : `id: [string]`
  - Optional : `none`

- **Data Params**

  - Require : `none`
  - Optional : `none`

- **Headers**

  - Require : `token: [string]`

- **HTTP Method**

  `PATCH`

- **Success Response**

  - Code	: 200 OK

  - Content :

    ```json
    {
        "answers": [],
        "upVotes": [],
        "downVotes": [
          "5df9aefc59bfa22110cc49f1"
        ],
        "_id": "5df9afdc6995c922df3f022a",
        "title": "testing Question",
        "description": "testing Beta",
        "userId": {
            "_id": "5df9aefc59bfa22110cc49f1",
            "email": "testing@mail.com",
            "password": "$2a$11$QZTS.ZkvH3kJ9gXRfSfMaewIdzdHKjvNwUeVKappTlp6VHN2FdnZ6",
            "username": "testing",
            "__v": 0
        },
        "__v": 8
    }
    ```

- **Error Response**

  - Authentication User

    - Code	: 401 Unauthorized

    - Content :

      ```json
      {
          "message": "Invalid Access Token"
      }
      ```

- **Sample Call**

  ```javascript
  return axios({
    method: 'PATCH',
    url: `question/downvotes/${payload}`,
    headers: { token: localStorage.getItem('token') }
  })
  ```



## QUESTION UPDATE

- **URL's**

  ```json
  /question/:id
  ```

- **URL Params**

  - Require : `id: [string]`
  - Optional : `none`

- **Data Params**

  - Require : `none`
  - Optional : `title: [string]` ,   `description: [string]` 

- **Headers**

  - Require : `token: [string]`

- **HTTP Method**

  `PUT`

- **Success Response**

  - Code	: 200 OK

  - Content :

    ```json
    {
        "answers": [],
        "upVotes": [
            "5df9aefc59bfa22110cc49f1"
        ],
        "downVotes": [
            "5df9b28c6995c922df3f0230"
        ],
        "_id": "5df9afdc6995c922df3f022a",
        "title": "Update Testing",
        "description": "testing Beta",
        "userId": "5df9aefc59bfa22110cc49f1",
        "__v": 10
    }
    ```

- **Error Response**

  - Authentication User

    - Code	: 401 Unauthorized

    - Content :

      ```json
      {
          "message": "Invalid Access Token"
      }
      ```

  - Authorization User

    - Code	: 401 Unauthorized

    - Content :

      ```json
      {
          "message": "You dont have authorize to do that"
      }
      ```

- **Sample Call**

  ```javascript
  return axios({
    method: 'PUT',
    url: `question/${id}`,
    data: value,
    headers: { token: localStorage.getItem('token') }
  })
  ```



## QUESTION DELETE

- **URL's**

  ```json
  /question/:id
  ```

- **URL Params**

  - Require : `id: [string]`
  - Optional : `none`

- **Data Params**

  - Require : `none`
  - Optional : `none`

- **Headers**

  - Require : `token: [string]`

- **HTTP Method**

  `DELETE`

- **Success Response**

  - Code	: 200 OK

  - Content :

    ```json
    {
        "answers": [],
        "upVotes": [],
        "downVotes": [],
        "_id": "5df9bd29426e442cbef0cf22",
        "title": "Delete Testing",
        "description": "testing Beta",
        "userId": "5df9b28c6995c922df3f0230",
        "__v": 0
    }
    ```

- **Error Response**

  - Authentication User

    - Code	: 401 Unauthorized

    - Content :

      ```json
      {
          "message": "Invalid Access Token"
      }
      ```

  - - Authorization User

      - Code	: 401 Unauthorized

      - Content :

        ```json
        {
            "message": "You dont have authorize to do that"
        }
        ```

- **Sample Call**

  ```javascript
  return axios({
    method: 'DELETE',
    url: `question/${payload}`,
    headers: { token: localStorage.getItem('token') }
  })
  ```



## ANSWER CREATE

- **URL's**

  ```json
  /answer/:id
  ```

- **URL Params**

  - Require : `none`
  - Optional : `none`

- **Data Params**

  - Require : `description: [string]` 

- **Headers**

  - Require : `token: [string]`

- **HTTP Method**

  `POST`

- **Success Response**

  - Code	: 201 Created

  - Content :

    ```json
    {
        "answers": [
            "5df9c8384c34353495a014b9"
        ],
        "upVotes": [],
        "downVotes": [],
        "_id": "5df9b2a16995c922df3f0231",
        "title": "testing Question v2",
        "description": "testing Beta",
        "userId": "5df9b28c6995c922df3f0230",
        "__v": 0
    }
    ```

- **Error Response**

  - Validation Description

    - Code	: 422 Unprocessable Entity

    - Content :

      ```json
      {
          "message": "Answer validation failed: description: Description cannot be empty"
      }
      ```

  - Authentication User

    - Code	: 401 Unauthorized

    - Content :

      ```json
      {
          "message": "Invalid Access Token"
      }
      ```

- **Sample Call**

  ```javascript
  return axios({
    method: 'POST',
    url: `answer/${id}`,
    data: value,
    headers: { token: localStorage.getItem('token') }
  })
  ```



## ANSWER UP VOTES

- **URL's**

  ```json
  /answer/upvotes/:id
  ```

- **URL Params**

  - Require : `id: [string]`
  - Optional : `none`

- **Data Params**

  - Require : `none`
  - Optional : `none`

- **Headers**

  - Require : `token: [string]`

- **HTTP Method**

  `PATCH`

- **Success Response**

  - Code	: 200 OK

  - Content :

    ```json
    {
        "answers": [],
        "upVotes": [
            "5df9aefc59bfa22110cc49f1"
        ],
        "downVotes": [],
        "_id": "5df9afdc6995c922df3f022a",
        "title": "testing Question",
        "description": "testing Beta",
        "userId": {
            "_id": "5df9aefc59bfa22110cc49f1",
            "email": "testing@mail.com",
            "password": "$2a$11$QZTS.ZkvH3kJ9gXRfSfMaewIdzdHKjvNwUeVKappTlp6VHN2FdnZ6",
            "username": "testing",
            "__v": 0
        },
        "__v": 8
    }
    ```

- **Error Response**

  - Authentication User

    - Code	: 401 Unauthorized

    - Content :

      ```json
      {
          "message": "Invalid Access Token"
      }
      ```

- **Sample Call**

  ```javascript
  return axios({
    method: 'PATCH',
    url: `answer/upvotes/${payload}`,
    headers: { token: localStorage.getItem('token') }
  })
  ```



## ANSWER DOWN VOTES

- **URL's**

  ```json
  /answer/downvotes/:id
  ```

- **URL Params**

  - Require : `id: [string]`
  - Optional : `none`

- **Data Params**

  - Require : `none`
  - Optional : `none`

- **Headers**

  - Require : `token: [string]`

- **HTTP Method**

  `PATCH`

- **Success Response**

  - Code	: 200 OK

  - Content :

    ```json
    {
        "answers": [],
        "upVotes": [],
        "downVotes": [
          "5df9aefc59bfa22110cc49f1"
        ],
        "_id": "5df9afdc6995c922df3f022a",
        "title": "testing Question",
        "description": "testing Beta",
        "userId": {
            "_id": "5df9aefc59bfa22110cc49f1",
            "email": "testing@mail.com",
            "password": "$2a$11$QZTS.ZkvH3kJ9gXRfSfMaewIdzdHKjvNwUeVKappTlp6VHN2FdnZ6",
            "username": "testing",
            "__v": 0
        },
        "__v": 8
    }
    ```

- **Error Response**

  - Authentication User

    - Code	: 401 Unauthorized

    - Content :

      ```json
      {
          "message": "Invalid Access Token"
      }
      ```

- **Sample Call**

  ```javascript
  return axios({
    method: 'PATCH',
    url: `answer/downvotes/${payload}`,
    headers: { token: localStorage.getItem('token') }
  })
  ```

