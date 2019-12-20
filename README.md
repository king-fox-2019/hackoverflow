# hackoverflow

**BASE URL**

```
http://localhost:3000/
```

**DEPLOY**

```
hackoverflow.edwinsatya.online
```

## USER REGISTER

- **URL's**

  ```
  /user/register
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

  - Code : 201 OK

  - Content :

    ```
    {
        "id": "5df9aefc59bfa22110cc49f1",
        "username": "testing",
        "email": "testing@mail.com",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZjlhZWZjNTliZmEyMjExMGNjNDlmMSIsImlhdCI6MTU3NjY0NDM0OH0.U5SfTTyJNUGTWjTRwFWAB-uBwVXzERC2ISZ-HLpyIZU"
    }
    ```

- **Error Response**

  - Validation Username

    - Code : 422 Unprocessable Entity

    - Content :

      ```
      {
          "message": "User validation failed: username: User Name cannot be empty!"
      }
      ```

  - Validation Password

    - Code : 422 Unprocessable Entity

    - Content :

      ```
      {
          "message": "User validation failed: password: Password cannot be empty!"
      }
      ```

  - Validation Email

    - Code : 422 Unprocessable Entity

    - Content :

      ```
      {
          "message": "User validation failed: email: Email cannot be empty!"
      }
      ```

  - Validation Unique Email

    - Code : 422 Unprocessable Entity

    - Content :

      ```
      {
          "message": "User validation failed: email: Email already taken!"
      }
      ```

  - Validation Username, Password, and Email

    - Code : 422 Unprocessable Entity

    - Content :

      ```
      {
          "message": "User validation failed: email: Email cannot be empty!, password: Password cannot be empty!, username: Username cannot be empty!"
      }
      ```

  - **Sample Call**

  ```
  export default axios create({
  	baseUrl: http://localhost:3000
  })
  /user/register
  ```

## USER LOGIN

- **URL's**

  ```
  /user/login
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

  - Code : 200 OK

  - Content :

    ```
    {
        "id": "5df9aefc59bfa22110cc49f1",
        "username": "testing",
        "email": "testing@mail.com",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZjlhZWZjNTliZmEyMjExMGNjNDlmMSIsImlhdCI6MTU3NjY0NDM3Mn0.P2QdI9CYqiuPvO1q18xlgp7C9VIjLuVjZB8DsVLlW-U"
    }
    ```

- **Error Response**

  - Validation Email Not Register

    - Code : 400 Bad Request

    - Content :

      ```
      {
          "message": "Your email is not registered"
      }
      ```

  - Validation Passwords and Users do not Match

    - Code : 400 Bad Request

    - Content :

      ```
      {
          "message": "Your password is wrong"
      }
      ```

  - **Sample Call**

  ```
  export default axios create({
  	baseUrl: http://localhost:3000
  })
  /user/login
  ```

## QUESTION CREATE

- **URL's**

  ```
  /question/
  ```

- **URL Params**

  - Require : `none`
  - Optional : `none`

- **Data Params**

  - Require : `title: [string]` , `desc: [tag html]`, `tag: [string]`,

- **Headers**

  - Require : `token: [string]`

- **HTTP Method**

  `POST`

- **Success Response**

  - Code : 201 Created

  - Content :

    ```
    {
        "answers": [],
        "upVotes": [],
        "downVotes": [],
        "_id": "5df9afdc6995c922df3f022a",
        "title": "testing Question",
        "description": "testing waw",
        "userId": "5df9aefc59bfa22110cc49f1",
        "__v": 0
    }
    ```

- **Error Response**

  - Validation Title

    - Code : 422 Unprocessable Entity

    - Content :

      ```
      {
          "message": "Question validation failed: title: Title cannot be empty"
      }
      ```

  - Validation Description

    - Code : 422 Unprocessable Entity

    - Content :

      ```
      {
          "message": "Question validation failed: description: Description cannot be empty"
      }
      ```

  - Validation Title and Description

    - Code : 422 Unprocessable Entity

    - Content :

      ```
      {
          "message": "Question validation failed: title: Title cannot be empty, description: Description cannot be empty"
      }
      ```

  - Authentication User

    - Code : 401 Unauthorized

    - Content :

      ```
      {
          "message": "Invalid Access Token"
      }
      ```

- **Sample Call**

  ```
  createQuestion({ dispatch }, payload) {
        let token = localStorage.getItem("token");
        return new Promise((resolve, reject) => {
          axios({
            method: "POST",
            url: "/question/",
            data: payload,
            headers: {
              token
            }
          })
            .then(({ data }) => {
              dispatch("FETCH_ALL_QUESTION");
              resolve(data);
            })
            .catch(err => {
              reject(err);
            });
        });
      },
  ```

## QUESTION READ ALL

- **URL's**

  ```
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

  - Code : 200 OK

  - Content :

    ```
    [
        {
            "answers": [],
            "upVotes": [],
            "downVotes": [],
            "_id": "5df9afdc6995c922df3f022a",
            "title": "testing Question",
            "description": "testing waw",
            "tag": [],
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
            "tag": [],
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

    - Code : 401 Unauthorized

    - Content :

      ```
      {
          "message": "Invalid Access Token"
      }
      ```

- **Sample Call**

  ```
  fetchAllQuestion({ commit }) {
        axios({
          method: "GET",
          url: "/question/"
        })
          .then(({ data }) => {
            commit("FETCH_ALL_QUESTION", data);
          })
          .catch(err => {
            console.log(err);
          });
      },
  ```

## QUESTION READ ONE

- **URL's**

  ```
  /question/:id
  ```

- **URL Params**

  - Require : `id: [string]`
  - Optional : `none`

- **Data Params**

  - Require : `yes`
  - Optional : `none`

- **Headers**

  - Require : `token: [string]`

- **HTTP Method**

  `GET`

- **Success Response**

  - Code : 200 OK

  - Content :

    ```
    {
        "answers": [],
        "upVotes": [],
        "downVotes": [],
        "_id": "5df9afdc6995c922df3f022a",
        "tag":[],
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

    - Code : 401 Unauthorized

    - Content :

      ```
      {
          "message": "Invalid Access Token"
      }
      ```

- **Sample Call**

  ```
  fetchDetailQuestion({ commit, dispatch }, payload) {
        let token = localStorage.getItem("token");
        return new Promise((resolve, reject) => {
          axios({
            method: "GET",
            url: `/question/${payload}`,
            headers: {
              token
            }
          })
            .then(({ data }) => {
              commit("FETCH_DETAIL_QUESTION", data);
              dispatch("fetchViewsQuestion", payload);
              resolve();
            })
            .catch(err => {
              reject(err);
            });
        });
      },
  ```

## QUESTION UP VOTES

- **URL's**

  ```
  /question/:id/upvote
  ```

- **URL Params**

  - Require : `id: [string]`
  - Optional : `none`

- **Data Params**

  - Require : `yes`
  - Optional : `none`

- **Headers**

  - Require : `token: [string]`

- **HTTP Method**

  `PATCH`

- **Success Response**

  - Code : 200 OK

  - Content :

    ```
    {
        "answers": [],
        "upVotes": [
            "5df9aefc59bfa22110cc49f1"
        ],
        "downVotes": [],
        "_id": "5df9afdc6995c922df3f022a",
        "title": "testing Question",
        "description": "testing Beta",
        "tag":[],
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

    - Code : 401 Unauthorized

    - Content :

      ```
      {
          "message": "Invalid Access Token"
      }
      ```

- **Sample Call**

  ```
  upvote({ dispatch }, payload) {
        let token = localStorage.getItem("token");
        axios({
          method: "PATCH",
          url: `/question/${payload}/upvote`,
          headers: {
            token
          }
        }).then(({ data }) => {
          dispatch("fetchDetailQuestion", payload);
          dispatch("fetchAllQuestion");
        });
      },
  ```

## QUESTION DOWN VOTES

- **URL's**

  ```
  /question/:id/downvote
  ```

- **URL Params**

  - Require : `id: [string]`
  - Optional : `none`

- **Data Params**

  - Require : `yes`
  - Optional : `none`

- **Headers**

  - Require : `token: [string]`

- **HTTP Method**

  `PATCH`

- **Success Response**

  - Code : 200 OK

  - Content :

    ```
    {
        "answers": [],
        "upVotes": [],
        "downVotes": [
          "5df9aefc59bfa22110cc49f1"
        ],
        "_id": "5df9afdc6995c922df3f022a",
        "title": "testing Question",
        "description": "testing Beta",
        "tag": [],
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

    - Code : 401 Unauthorized

    - Content :

      ```
      {
          "message": "Invalid Access Token"
      }
      ```

- **Sample Call**

  ```
   downvote({ dispatch }, payload) {
        let token = localStorage.getItem("token");
        axios({
          method: "PATCH",
          url: `/question/${payload}/downvote`,
          headers: {
            token
          }
        }).then(({ data }) => {
          dispatch("fetchDetailQuestion", payload);
          dispatch("fetchAllQuestion");
        });
      },
  ```

## QUESTION UPDATE

- **URL's**

  ```
  /question/:id
  ```

- **URL Params**

  - Require : `id: [string]`
  - Optional : `none`

- **Data Params**

  - Require : `yes`
  - Optional : `title: [string]` , `description: [string]`

- **Headers**

  - Require : `token: [string]`

- **HTTP Method**

  `PUT`

- **Success Response**

  - Code : 200 OK

  - Content :

    ```
    {
        "answers": [],
        "upVotes": [
            "5df9aefc59bfa22110cc49f1"
        ],
        "downVotes": [
            "5df9b28c6995c922df3f0230"
        ],
        "_id": "5df9afdc6995c922df3f022a",
        "tag": [object id],
        "title": "Update Testing",
        "description": "testing Beta",
        "userId": "5df9aefc59bfa22110cc49f1",
        "__v": 10
    }
    ```

- **Error Response**

  - Authentication User

    - Code : 401 Unauthorized

    - Content :

      ```
      {
          "message": "Invalid Access Token"
      }
      ```

  - Authorization User

    - Code : 401 Unauthorized

    - Content :

      ```
      {
          "message": "You dont have authorize to do that"
      }
      ```

- **Sample Call**

  ```
  editQuestion({ dispatch }, payload) {
        let token = localStorage.getItem("token");
        return new Promise((resolve, reject) => {
          axios({
            method: "PUT",
            url: `/question/${payload.id}`,
            data: payload.data,
            headers: {
              token
            }
          })
            .then(({ data }) => {
              dispatch("fetchDetailQuestion", payload.id);
              resolve(data);
            })
            .catch(err => {
              reject(err);
            });
        });
      },
  ```

## QUESTION DELETE

- **URL's**

  ```
  /question/:id
  ```

- **URL Params**

  - Require : `id: [string]`
  - Optional : `none`

- **Data Params**

  - Require : `yes`
  - Optional : `none`

- **Headers**

  - Require : `token: [string]`

- **HTTP Method**

  `DELETE`

- **Success Response**

  - Code : 200 OK

  - Content :

    ```
    {
     message: 'success delete item'
    }
    ```

- **Error Response**

  - Authentication User

    - Code : 401 Unauthorized

    - Content :

      ```
      {
          "message": "Invalid Access Token"
      }
      ```

  - - Authorization User

      - Code : 401 Unauthorized

      - Content :

        ```
        {
            "message": "You dont have authorize to do that"
        }
        ```

- **Sample Call**

  ```
  return axios({
    method: 'DELETE',
    url: `question/${payload}`,
    headers: { token: localStorage.getItem('token') }
  })
  ```

## ANSWER CREATE

- **URL's**

  ```
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

  - Code : 201 Created

  - Content :

    ```
    {
       id
    :
    5dfc1fc93d428915e0a89652
    upvote
    :
    downvote
    :
    desc
    :
    "sdadsadsa"
    author
    :
    5dfb97fa84f046039ffbe406
    questionId
    :
    5dfb859aa65be4645b682ac6
    __v
    :
    0
    }
    ```

- **Error Response**

  - Validation Description

    - Code : 422 Unprocessable Entity

    - Content :

      ```
      {
          "message": "Answer validation failed: description: Description cannot be empty"
      }
      ```

  - Authentication User

    - Code : 401 Unauthorized

    - Content :

      ```
      {
          "message": "Invalid Access Token"
      }
      ```

- **Sample Call**

  ```
  postAnswer({ dispatch }, payload) {
        let token = localStorage.getItem("token");
        return new Promise((resolve, reject) => {
          axios({
            method: "POST",
            url: `/answer/question/${payload.id}`,
            data: {
              desc: payload.data
            },
            headers: {
              token
            }
          })
            .then(({ data }) => {
              dispatch("fetchAnswer", payload.id);
              resolve(data);
            })
            .reject(err => {
              reject(err);
            });
        });
      },
  ```

## ANSWER UP VOTES

- **URL's**

  ```
  /answer/:id/upvote
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

  - Code : 200 OK

  - Content :

    ```
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

    - Code : 401 Unauthorized

    - Content :

      ```
      {
          "message": "Invalid Access Token"
      }
      ```

- **Sample Call**

  ```
   upvote({ dispatch }, payload) {
        let token = localStorage.getItem("token");
        return new Promise((resolve, reject) => {
          axios({
            method: "PATCH",
            url: `/answer/${payload}/upvote`,
            headers: {
              token
            }
          })
            .then(({ data }) => {
              dispatch("fetchAnswer", payload);
              resolve(data);
            })
            .catch(err => {
              console.log(err);
              reject();
            });
        });
      },
  ```

## ANSWER DOWN VOTES

- **URL's**

  ```
  /answer/:id/downvote
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

  - Code : 200 OK

  - Content :

    ```
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

    - Code : 401 Unauthorized

    - Content :

      ```
      {
          "message": "Invalid Access Token"
      }
      ```

- **Sample Call**

  ```
  return axios({
    method: 'PATCH',
    url: `answer/downvotes/${payload}`,
    headers: { token: localStorage.getItem('token') }
  })
  ```

Usage

Make sure you have node js has been installed in your computer, then run the folder <b>server</b> the commands bellow in your terminal.

```
 $ npm init -y

​    $ npm install

​    $ npm run dev
```

Make sure you have node js has been installed in your computer, then run the folder <b>client</b> the commands bellow in your terminal.

\```

​ \$ npm run serve

\```

or visited

\```

​hackoverflow.edwinsatya.online

\```

\## By : Edwin Satya Yudistira
