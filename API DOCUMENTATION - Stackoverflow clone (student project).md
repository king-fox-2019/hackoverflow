# API DOCUMENTATION - Stackoverflow clone (student project)

<hr>
Trying to clone stackoverflow website with upvote and downvote logic



> Base url : <http://nike-store.dwitama-alfred.xyz/>





<h2>User Routes </h2>
<hr>


## Register [post]

> <BASEUrl/users/register>

- Request (application/json)

```
{
	"name" : "username"
	"email" : "user@mail.com",
	"password" : "123456",
	"profilePicture" : "http//link-to-your-images",
}
```

- Response 200 (application/json)

```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGVkNThkYzllYmJmZjE5OGVlY2QwYWEiLCJmdWxsbmFtZSI6ImFkbWluaXN0cmF0b3IyIiwiZW1haWwiOiJhZG1pbmlzdHJhdG9yMkBtYWlsLmNvbSIsImlhdCI6MTU3NTgzNTg2OH0.9W3VS260F6DWOtUGYU1oN3Nn15zteQtjfuVJq6FhHW8"
}
```

- Response 400 (application/json)

```
{
      "message": "Email user is already registered!"
 }
```



## Login [post]

> <BASEUrl//users/login>

- Request (application/json)

```
{
	"email" : "user@mail.com",
	"password" : "123456"
}
```

- Response 200 (application/json)

```
{
      "token": 			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZTM3OTljYjI4ZTY1MDkwYmRmMDc4MyIsImVtYWlsIjoickBtYWlsLmNvbSIsImlhdCI6MTU3NTE4ODg5Mn0.hAccVbxWBHFeU8IvMM4AGHnPyuU_Q1i1Bhjo6kvC8Fg"
}
```

- Response 401 (application/json)

```
{
      "message": "Wrong email/password"
 }
```



## Find all user [get]

> <BASEUrl//users/>

- Response 200 (application/json)

```
[
    {
        "tags": [
            "javascript",
            "css",
            "html",
            "vue-cli",
            "mongoose",
            "",
            "vue",
            "front-end"
        ],
        "_id": "5dfaaf1415b97a4e5564464b",
        "name": "Kim Tae Yeon",
        "email": "taeyeon@mail.com",
        "password": "$2a$10$PdKAXU8OgElan4tpEFlL3uMHX385btAhwgh5cxNEgUIY3pbFWRh3y",
        "profilePicture": "https://storage.googleapis.com/bucket-alfred/1576709906864-taeyeon pp.jpeg",
        "profile": "Kpop Idol that starting to love coding",
        "createdAt": "2019-12-18T22:58:29.056Z",
        "updatedAt": "2019-12-19T06:39:33.801Z"
    },
    {
        "tags": [
            "html",
            "css",
            "vue",
            "vue-cli"
        ],
        "_id": "5dfab0df6f25534eb01e09ae",
        "name": "Dwitama Alfred",
        "email": "dwitama.alfred@gmail.com",
        "password": "$2a$10$IKHFck5E/SwsXx0NFqbTNOcOXPwvmqrdURWs1mKookAD0TQJlLku.",
        "profilePicture": "https://storage.googleapis.com/bucket-alfred/1576710365336-pp.jpg",
        "profile": "Full stack developers student at Hacktiv8",
        "createdAt": "2019-12-18T23:06:07.519Z",
        "updatedAt": "2019-12-19T00:24:29.366Z"
    },
    {
        "tags": [],
        "_id": "5dfab18e6f25534eb01e09b0",
        "name": "Nadiem Makarim",
        "email": "nadiem@mail.com",
        "password": "$2a$10$cQaa1fechcLaYWHU5vH9seKFxKQaYN8utYynLKBj4vRJkn6yjXf12",
        "profilePicture": "https://storage.googleapis.com/bucket-alfred/1576710540122-nadiem pp.jpg",
        "profile": "tech enthusiast & Man Behind Gojek Indonesia",
        "createdAt": "2019-12-18T23:09:02.346Z",
        "updatedAt": "2019-12-18T23:09:02.346Z"
    },
    {
        "tags": [
            "mongoose",
            "java"
        ],
        "_id": "5dfaccf2ec9c035b660c0d0e",
        "name": "Dimitri Wahyudiputra",
        "email": "dmw@mail.com",
        "password": "$2a$10$T0A94AqeBBJIM2fFPvDAl.p3PhXyN2BPf06KSFDwL0Uf6TrqIZSLS",
        "profilePicture": "https://storage.googleapis.com/bucket-alfred/1576717552882-Screen Shot 2019-12-19 at 08.00.06.png",
        "profile": "Lead of Immersive Program at Hacktiv8 Indonesia",
        "createdAt": "2019-12-19T01:05:54.863Z",
        "updatedAt": "2019-12-19T02:04:27.234Z"
    },
    {
        "tags": [],
        "_id": "5dfb30663ea64f1144e73e5d",
        "name": "Wan Yiren",
        "email": "yiren@mail.com",
        "password": "$2a$10$GO6poKp.NCc96GYbhOulJOEe8WWV4aQVPrpIeu9c36ezp2qaybjum",
        "profilePicture": "https://storage.googleapis.com/bucket-alfred/1576743012185-Screen Shot 2019-12-19 at 15.03.32.png",
        "profile": "kpop idol into programmer",
        "createdAt": "2019-12-19T08:10:14.212Z",
        "updatedAt": "2019-12-19T08:10:14.212Z"
    },
 ]
```

- Response 500 (application/json)

```
{
    "message": "internal server error"
}
```



## Add user Tag [post]

> <BASEUrl//users/tags>

- Request (application/json)

```
{
	"tag" : "javascript",
}
```

- Response 200 (application/json)

```
 {
        "tags": ["javascript"],
        "_id": "5dfb30663ea64f1144e73e5d",
        "name": "Wan Yiren",
        "email": "yiren@mail.com",
        "password": "$2a$10$GO6poKp.NCc96GYbhOulJOEe8WWV4aQVPrpIeu9c36ezp2qaybjum",
        "profilePicture": "https://storage.googleapis.com/bucket-alfred/1576743012185-Screen Shot 2019-12-19 at 15.03.32.png",
        "profile": "kpop idol into programmer",
        "createdAt": "2019-12-19T08:10:14.212Z",
        "updatedAt": "2019-12-19T08:10:14.212Z"
    },
```

- Response 500 (application/json)

```
{
    "message": "internal server error"
}
```







<h2>Questions Routes </h2>
<hr>





## Question Show All[get]

> <BASEUrl/questions/>

- Request (application/json)

  Headers :   token  

  Params:  id ( product id )

  > "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZGNjNWNjOTY4NzcyMDlmYjIxNWUzMCIsImVtYWlsIjoiYUBtYWlsLmNvbSIsImlhdCI6MTU3NTE4OTI2Nn0.vKKYVixOvjwKIigw7c7Xzni0j0qZh_j8VzuFQF0J7g0"

  

  

  Response 200 (application/json)

```
[
    {
        "tags": [
            "test",
            "html"
        ],
        "answers": [],
        "upVotes": [
            "5dfaaf1415b97a4e5564464b"
        ],
        "downVotes": [],
        "_id": "5dfb87b7e0eac63f089ef71d",
        "userId": {
            "tags": [
                "react",
                "vuetify",
                "mongoose"
            ],
            "_id": "5dfb8746e0eac63f089ef71c",
            "name": "Fiqi Fitransyah ",
            "email": "fiqi@mail.com",
            "password": "$2a$10$Uyye0JFSmVzWqgXmAYQYReywBovyf4xoalWUsj1HBi/PlsBdi0B1i",
            "profilePicture": "https://storage.googleapis.com/bucket-alfred/1576765251025-Screen Shot 2019-12-19 at 07.58.59.png",
            "profile": "Instructor Hacktiv8",
            "createdAt": "2019-12-19T14:20:54.308Z",
            "updatedAt": "2019-12-19T14:21:38.435Z"
        },
        "title": "Weird padding issue encoutered in sticky left column of a HTML table that uses Freeze Table jQuery plugin",
        "question": "<p style=\"margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding: 0px; border: 0px; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-stretch: inherit; line-height: inherit; font-family: Arial, &quot;Helvetica Neue&quot;, Helvetica, sans-serif; font-size: 15px; vertical-align: baseline; box-sizing: inherit; clear: both; color: rgb(36, 39, 41);\">The answers here are all extremely helpful, what worked for me was configuring my Webpack server to expect the routes.</p><pre class=\"lang-js prettyprint prettyprinted\" style=\"margin-bottom: 1em; padding: 12px 8px; border: 0px; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-stretch: inherit; line-height: inherit; font-family: Consolas, Menlo, Monaco, &quot;Lucida Console&quot;, &quot;Liberation Mono&quot;, &quot;DejaVu Sans Mono&quot;, &quot;Bitstream Vera Sans Mono&quot;, &quot;Courier New&quot;, monospace, sans-serif; font-size: 13px; vertical-align: baseline; box-sizing: inherit; width: auto; max-height: 600px; background-color: rgb(239, 240, 241); border-radius: 3px; color: rgb(57, 51, 24); overflow-wrap: normal;\"><code style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: Consolas, Menlo, Monaco, &quot;Lucida Console&quot;, &quot;Liberation Mono&quot;, &quot;DejaVu Sans Mono&quot;, &quot;Bitstream Vera Sans Mono&quot;, &quot;Courier New&quot;, monospace, sans-serif; font-size: 13px; vertical-align: baseline; box-sizing: inherit; white-space: inherit;\"><span class=\"pln\" style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; vertical-align: baseline; box-sizing: inherit; color: rgb(48, 51, 54);\">devServer</span><span class=\"pun\" style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; vertical-align: baseline; box-sizing: inherit; color: rgb(48, 51, 54);\">:</span><span class=\"pln\" style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; vertical-align: baseline; box-sizing: inherit; color: rgb(48, 51, 54);\">",
        "createdAt": "2019-12-19T14:22:47.428Z",
        "updatedAt": "2019-12-19T14:53:27.069Z"
    },
  ]
```

- Response 400 (application/json)

```
{
    "message": "authentication failed"
}
```



## Question Show All[get]

> <BASEUrl/questions/>

- Request (application/json)

  Headers :   token  

  Params:  id ( question id )

  > "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZGNjNWNjOTY4NzcyMDlmYjIxNWUzMCIsImVtYWlsIjoiYUBtYWlsLmNvbSIsImlhdCI6MTU3NTE4OTI2Nn0.vKKYVixOvjwKIigw7c7Xzni0j0qZh_j8VzuFQF0J7g0"

  

  

  Response 200 (application/json)

```

    {
        "tags": [
            "test",
            "html"
        ],
        "answers": [],
        "upVotes": [
            "5dfaaf1415b97a4e5564464b"
        ],
        "downVotes": [],
        "_id": "5dfb87b7e0eac63f089ef71d",
        "userId": {
            "tags": [
                "react",
                "vuetify",
                "mongoose"
            ],
            "_id": "5dfb8746e0eac63f089ef71c",
            "name": "Fiqi Fitransyah ",
            "email": "fiqi@mail.com",
            "password": "$2a$10$Uyye0JFSmVzWqgXmAYQYReywBovyf4xoalWUsj1HBi/PlsBdi0B1i",
            "profilePicture": "https://storage.googleapis.com/bucket-alfred/1576765251025-Screen Shot 2019-12-19 at 07.58.59.png",
            "profile": "Instructor Hacktiv8",
            "createdAt": "2019-12-19T14:20:54.308Z",
            "updatedAt": "2019-12-19T14:21:38.435Z"
        },
        "title": "Weird padding issue encoutered in sticky left column of a HTML table that uses Freeze Table jQuery plugin",
        "question": "<p style=\"margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding: 0px; border: 0px; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-stretch: inherit; line-height: inherit; font-family: Arial, &quot;Helvetica Neue&quot;, Helvetica, sans-serif; font-size: 15px; vertical-align: baseline; box-sizing: inherit; clear: both; color: rgb(36, 39, 41);\">The answers here are all extremely helpful, what worked for me was configuring my Webpack server to expect the routes.</p><pre class=\"lang-js prettyprint prettyprinted\" style=\"margin-bottom: 1em; padding: 12px 8px; border: 0px; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-stretch: inherit; line-height: inherit; font-family: Consolas, Menlo, Monaco, &quot;Lucida Console&quot;, &quot;Liberation Mono&quot;, &quot;DejaVu Sans Mono&quot;, &quot;Bitstream Vera Sans Mono&quot;, &quot;Courier New&quot;, monospace, sans-serif; font-size: 13px; vertical-align: baseline; box-sizing: inherit; width: auto; max-height: 600px; background-color: rgb(239, 240, 241); border-radius: 3px; color: rgb(57, 51, 24); overflow-wrap: normal;\"><code style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: Consolas, Menlo, Monaco, &quot;Lucida Console&quot;, &quot;Liberation Mono&quot;, &quot;DejaVu Sans Mono&quot;, &quot;Bitstream Vera Sans Mono&quot;, &quot;Courier New&quot;, monospace, sans-serif; font-size: 13px; vertical-align: baseline; box-sizing: inherit; white-space: inherit;\"><span class=\"pln\" style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; vertical-align: baseline; box-sizing: inherit; color: rgb(48, 51, 54);\">devServer</span><span class=\"pun\" style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; vertical-align: baseline; box-sizing: inherit; color: rgb(48, 51, 54);\">:</span><span class=\"pln\" style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; vertical-align: baseline; box-sizing: inherit; color: rgb(48, 51, 54);\">",
        "createdAt": "2019-12-19T14:22:47.428Z",
        "updatedAt": "2019-12-19T14:53:27.069Z"
    },
    
```

- Response 400 (application/json)

```
{
    "message": "authentication failed"
}
```



## Question Create  [post]

> <BASEUrl/questions>

- Request (application/json)

  Headers :   token ( authorized user : admin ) 

  > "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZGNjNWNjOTY4NzcyMDlmYjIxNWUzMCIsImVtYWlsIjoiYUBtYWlsLmNvbSIsImlhdCI6MTU3NTE4OTI2Nn0.vKKYVixOvjwKIigw7c7Xzni0j0qZh_j8VzuFQF0J7g0"

- 

```
{
        "title": "How to deploy Vue app",
        "question": "What should i do after deploying",
        "tags": ["vue","javascript","angular"]
        
 }
```

- Response 200 (application/json)

```
{
        "name": "Basketball Shoe - LeBron 17",
        "description": "The LeBron 17 harnesses LeBron's strength and speed with containment and support for all-court domination. It features a lightweight mix of knit and heat-moulded yarns that gives each one a durable look and feel. Combined cushioning provides LeBron with the impact support and responsive energy return he needs to power through the long season."
        "price": "2909000",
        "images": ["url","url","url","url"],
        
    }
```

- Response 400 (application/json)

```
{
    "message": "authentication failed"
}
```

- Response 404 (application/json)

```
{
    "message": "you are not authorized to perform this action"
}
```



## Question Delete  [delete]

> <BASEUrl/products/:id>

- Request (application/json)

  Params:  id ( product id )

  Headers :   token ( authorized user )  

  > "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZGNjNWNjOTY4NzcyMDlmYjIxNWUzMCIsImVtYWlsIjoiYUBtYWlsLmNvbSIsImlhdCI6MTU3NTE4OTI2Nn0.vKKYVixOvjwKIigw7c7Xzni0j0qZh_j8VzuFQF0J7g0"

  

- Response 201 (application/json)

```
{
    "message": "product successfully deleted"
}
```

- Response 401 (application/json)

```
{
    "message": "authentication failed"
}
```

- Response 404 (application/json)

```
{
    "message": "you are not authorized to perform this action"
}
```



## Update Question  [put]

> <BASEUrl/products/:id>

- Request (application/json)

  Params:  id ( product id )

  Headers :   token 

  > "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZGNjNWNjOTY4NzcyMDlmYjIxNWUzMCIsImVtYWlsIjoiYUBtYWlsLmNvbSIsImlhdCI6MTU3NTE4OTI2Nn0.vKKYVixOvjwKIigw7c7Xzni0j0qZh_j8VzuFQF0J7g0"

  


```
{
        "title": "How to deploy Vue app",
        "question": "What should i do after deploying",
        "tags": ["vue","javascript","angular"]
 }
```

- Response 200 (application/json)

```
{
        "name": "Basketball Shoe - LeBron 17 EDITED",
        "description": "The LeBron 17 harnesses LeBron's strength and speed with containment and support for all-court domination. It features a lightweight mix of knit and heat-moulded yarns that gives each one a durable look and feel. Combined cushioning provides LeBron with the impact support and responsive energy return he needs to power through the long season."
        "price": "2909000",
        "images": ["url","url","url","url"],
        
    }
```

- Response 400 (application/json)

```
{
    "message": "authentication failed"
}
```

- Response 404 (application/json)

```
{
    "message": "you are not authorized to perform this action"
}
```



## Add Product to Cart  [post]

> <BASEUrl/products/:id>

- Request (application/json)

  Params:  id ( product id )

  Headers :   token 

  > "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZGNjNWNjOTY4NzcyMDlmYjIxNWUzMCIsImVtYWlsIjoiYUBtYWlsLmNvbSIsImlhdCI6MTU3NTE4OTI2Nn0.vKKYVixOvjwKIigw7c7Xzni0j0qZh_j8VzuFQF0J7g0"

  


```
{
        "size": "12",
        "count": "1",
        "total_payment": "2909000",
    }
```

- Response 200 (application/json)

```

 {
        "tags": [
            "test",
            "html"
        ],
        "answers": [],
        "upVotes": [
            "5dfaaf1415b97a4e5564464b"
        ],
        "downVotes": [],
        "_id": "5dfb87b7e0eac63f089ef71d",
        "userId": {
            "tags": [
                "react",
                "vuetify",
                "mongoose"
            ],
            "_id": "5dfb8746e0eac63f089ef71c",
            "name": "Fiqi Fitransyah ",
            "email": "fiqi@mail.com",
            "password": "$2a$10$Uyye0JFSmVzWqgXmAYQYReywBovyf4xoalWUsj1HBi/PlsBdi0B1i",
            "profilePicture": "https://storage.googleapis.com/bucket-alfred/1576765251025-Screen Shot 2019-12-19 at 07.58.59.png",
            "profile": "Instructor Hacktiv8",
            "createdAt": "2019-12-19T14:20:54.308Z",
            "updatedAt": "2019-12-19T14:21:38.435Z"
        },
        "title": "Weird padding issue encoutered in sticky left column of a HTML table that uses Freeze Table jQuery plugin",
        "question": "<p style=\"margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding: 0px; border: 0px; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-stretch: inherit; line-height: inherit; font-family: Arial, &quot;Helvetica Neue&quot;, Helvetica, sans-serif; font-size: 15px; vertical-align: baseline; box-sizing: inherit; clear: both; color: rgb(36, 39, 41);\">The answers here are all extremely helpful, what worked for me was configuring my Webpack server to expect the routes.</p><pre class=\"lang-js prettyprint prettyprinted\" style=\"margin-bottom: 1em; padding: 12px 8px; border: 0px; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-stretch: inherit; line-height: inherit; font-family: Consolas, Menlo, Monaco, &quot;Lucida Console&quot;, &quot;Liberation Mono&quot;, &quot;DejaVu Sans Mono&quot;, &quot;Bitstream Vera Sans Mono&quot;, &quot;Courier New&quot;, monospace, sans-serif; font-size: 13px; vertical-align: baseline; box-sizing: inherit; width: auto; max-height: 600px; background-color: rgb(239, 240, 241); border-radius: 3px; color: rgb(57, 51, 24); overflow-wrap: normal;\"><code style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: Consolas, Menlo, Monaco, &quot;Lucida Console&quot;, &quot;Liberation Mono&quot;, &quot;DejaVu Sans Mono&quot;, &quot;Bitstream Vera Sans Mono&quot;, &quot;Courier New&quot;, monospace, sans-serif; font-size: 13px; vertical-align: baseline; box-sizing: inherit; white-space: inherit;\"><span class=\"pln\" style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; vertical-align: baseline; box-sizing: inherit; color: rgb(48, 51, 54);\">devServer</span><span class=\"pun\" style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; vertical-align: baseline; box-sizing: inherit; color: rgb(48, 51, 54);\">:</span><span class=\"pln\" style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; vertical-align: baseline; box-sizing: inherit; color: rgb(48, 51, 54);\">",
        "createdAt": "2019-12-19T14:22:47.428Z",
        "updatedAt": "2019-12-19T14:53:27.069Z"
 },
     
```

- Response 400 (application/json)

```

 {
        "tags": [
            "test",
            "html",
            "vue",
            "swift"
        ],
        "answers": [],
        "upVotes": [],
        "downVotes": [],
        "_id": "5dfb87b7e0eac63f089ef71d",
        "userId": {
            "tags": [
                "react",
                "vuetify",
                "mongoose"
            ],
            "_id": "5dfb8746e0eac63f089ef71c",
            "name": "Fiqi Fitransyah ",
            "email": "fiqi@mail.com",
            "password": "$2a$10$Uyye0JFSmVzWqgXmAYQYReywBovyf4xoalWUsj1HBi/PlsBdi0B1i",
            "profilePicture": "https://storage.googleapis.com/bucket-alfred/1576765251025-Screen Shot 2019-12-19 at 07.58.59.png",
            "profile": "Instructor Hacktiv8",
            "createdAt": "2019-12-19T14:20:54.308Z",
            "updatedAt": "2019-12-19T14:21:38.435Z"
        },
        "title": "Weird padding issue encoutered in sticky left column of a HTML table that uses Freeze Table jQuery plugin",
        "question": "<p style=\"margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding: 0px; border: 0px; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-stretch: inherit; line-height: inherit; font-family: Arial, &quot;Helvetica Neue&quot;, Helvetica, sans-serif; font-size: 15px; vertical-align: baseline; box-sizing: inherit; clear: both; color: rgb(36, 39, 41);\">The answers here are all extremely helpful, what worked for me was configuring my Webpack server to expect the routes.</p><pre class=\"lang-js prettyprint prettyprinted\" style=\"margin-bottom: 1em; padding: 12px 8px; border: 0px; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-stretch: inherit; line-height: inherit; font-family: Consolas, Menlo, Monaco, &quot;Lucida Console&quot;, &quot;Liberation Mono&quot;, &quot;DejaVu Sans Mono&quot;, &quot;Bitstream Vera Sans Mono&quot;, &quot;Courier New&quot;, monospace, sans-serif; font-size: 13px; vertical-align: baseline; box-sizing: inherit; width: auto; max-height: 600px; background-color: rgb(239, 240, 241); border-radius: 3px; color: rgb(57, 51, 24); overflow-wrap: normal;\"><code style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: Consolas, Menlo, Monaco, &quot;Lucida Console&quot;, &quot;Liberation Mono&quot;, &quot;DejaVu Sans Mono&quot;, &quot;Bitstream Vera Sans Mono&quot;, &quot;Courier New&quot;, monospace, sans-serif; font-size: 13px; vertical-align: baseline; box-sizing: inherit; white-space: inherit;\"><span class=\"pln\" style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; vertical-align: baseline; box-sizing: inherit; color: rgb(48, 51, 54);\">devServer</span><span class=\"pun\" style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; vertical-align: baseline; box-sizing: inherit; color: rgb(48, 51, 54);\">:</span><span class=\"pln\" style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; vertical-align: baseline; box-sizing: inherit; color: rgb(48, 51, 54);\">",
        "createdAt": "2019-12-19T14:22:47.428Z",
        "updatedAt": "2019-12-19T14:53:27.069Z"
 }
     
```

- Response 404 (application/json)

```
{
    "message": "question not found"
}
```





## Up Vote Question  [put]

> <BASEUrl/questions/:id>

- Request (application/json)

  Params:  id ( question id )

  Headers :   token 

  > "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZGNjNWNjOTY4NzcyMDlmYjIxNWUzMCIsImVtYWlsIjoiYUBtYWlsLmNvbSIsImlhdCI6MTU3NTE4OTI2Nn0.vKKYVixOvjwKIigw7c7Xzni0j0qZh_j8VzuFQF0J7g0"

  


```
 {
        "tags": [
            "test",
            "html",
            "vue",
            "swift"
        ],
        "answers": [],
        "upVotes": [
            "5dfaaf1415b97a4e5564464b"
        ],
        "downVotes": [],
        "_id": "5dfb87b7e0eac63f089ef71d",
        "userId": {
            "tags": [
                "react",
                "vuetify",
                "mongoose"
            ],
            "_id": "5dfb8746e0eac63f089ef71c",
            "name": "Fiqi Fitransyah ",
            "email": "fiqi@mail.com",
            "password": "$2a$10$Uyye0JFSmVzWqgXmAYQYReywBovyf4xoalWUsj1HBi/PlsBdi0B1i",
            "profilePicture": "https://storage.googleapis.com/bucket-alfred/1576765251025-Screen Shot 2019-12-19 at 07.58.59.png",
            "profile": "Instructor Hacktiv8",
            "createdAt": "2019-12-19T14:20:54.308Z",
            "updatedAt": "2019-12-19T14:21:38.435Z"
        },
        "title": "Weird padding issue encoutered in sticky left column of a HTML table that uses Freeze Table jQuery plugin",
        "question": "<p style=\"margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding: 0px; border: 0px; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-stretch: inherit; line-height: inherit; font-family: Arial, &quot;Helvetica Neue&quot;, Helvetica, sans-serif; font-size: 15px; vertical-align: baseline; box-sizing: inherit; clear: both; color: rgb(36, 39, 41);\">The answers here are all extremely helpful, what worked for me was configuring my Webpack server to expect the routes.</p><pre class=\"lang-js prettyprint prettyprinted\" style=\"margin-bottom: 1em; padding: 12px 8px; border: 0px; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-stretch: inherit; line-height: inherit; font-family: Consolas, Menlo, Monaco, &quot;Lucida Console&quot;, &quot;Liberation Mono&quot;, &quot;DejaVu Sans Mono&quot;, &quot;Bitstream Vera Sans Mono&quot;, &quot;Courier New&quot;, monospace, sans-serif; font-size: 13px; vertical-align: baseline; box-sizing: inherit; width: auto; max-height: 600px; background-color: rgb(239, 240, 241); border-radius: 3px; color: rgb(57, 51, 24); overflow-wrap: normal;\"><code style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: Consolas, Menlo, Monaco, &quot;Lucida Console&quot;, &quot;Liberation Mono&quot;, &quot;DejaVu Sans Mono&quot;, &quot;Bitstream Vera Sans Mono&quot;, &quot;Courier New&quot;, monospace, sans-serif; font-size: 13px; vertical-align: baseline; box-sizing: inherit; white-space: inherit;\"><span class=\"pln\" style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; vertical-align: baseline; box-sizing: inherit; color: rgb(48, 51, 54);\">devServer</span><span class=\"pun\" style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; vertical-align: baseline; box-sizing: inherit; color: rgb(48, 51, 54);\">:</span><span class=\"pln\" style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; vertical-align: baseline; box-sizing: inherit; color: rgb(48, 51, 54);\">",
        "createdAt": "2019-12-19T14:22:47.428Z",
        "updatedAt": "2019-12-19T14:53:27.069Z"
 }
```

- Response 500 (application/json)

```
{
    "message": "internal server error"
}
```





## Down Vote Question  [put]

> <BASEUrl/questions/:id>

- Request (application/json)

  Params:  id ( product id )

  Headers :   token 

  > "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZGNjNWNjOTY4NzcyMDlmYjIxNWUzMCIsImVtYWlsIjoiYUBtYWlsLmNvbSIsImlhdCI6MTU3NTE4OTI2Nn0.vKKYVixOvjwKIigw7c7Xzni0j0qZh_j8VzuFQF0J7g0"

  


```
 {
        "tags": [
            "test",
            "html",
            "vue",
            "swift"
        ],
        "answers": [],
        "upVotes": [],
        "downVotes": [
         "5dfaaf1415b97a4e5564464b"
        ],
        "_id": "5dfb87b7e0eac63f089ef71d",
        "userId": {
            "tags": [
                "react",
                "vuetify",
                "mongoose"
            ],
            "_id": "5dfb8746e0eac63f089ef71c",
            "name": "Fiqi Fitransyah ",
            "email": "fiqi@mail.com",
            "password": "$2a$10$Uyye0JFSmVzWqgXmAYQYReywBovyf4xoalWUsj1HBi/PlsBdi0B1i",
            "profilePicture": "https://storage.googleapis.com/bucket-alfred/1576765251025-Screen Shot 2019-12-19 at 07.58.59.png",
            "profile": "Instructor Hacktiv8",
            "createdAt": "2019-12-19T14:20:54.308Z",
            "updatedAt": "2019-12-19T14:21:38.435Z"
        },
        "title": "Weird padding issue encoutered in sticky left column of a HTML table that uses Freeze Table jQuery plugin",
        "question": "<p style=\"margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding: 0px; border: 0px; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-stretch: inherit; line-height: inherit; font-family: Arial, &quot;Helvetica Neue&quot;, Helvetica, sans-serif; font-size: 15px; vertical-align: baseline; box-sizing: inherit; clear: both; color: rgb(36, 39, 41);\">The answers here are all extremely helpful, what worked for me was configuring my Webpack server to expect the routes.</p><pre class=\"lang-js prettyprint prettyprinted\" style=\"margin-bottom: 1em; padding: 12px 8px; border: 0px; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-stretch: inherit; line-height: inherit; font-family: Consolas, Menlo, Monaco, &quot;Lucida Console&quot;, &quot;Liberation Mono&quot;, &quot;DejaVu Sans Mono&quot;, &quot;Bitstream Vera Sans Mono&quot;, &quot;Courier New&quot;, monospace, sans-serif; font-size: 13px; vertical-align: baseline; box-sizing: inherit; width: auto; max-height: 600px; background-color: rgb(239, 240, 241); border-radius: 3px; color: rgb(57, 51, 24); overflow-wrap: normal;\"><code style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: Consolas, Menlo, Monaco, &quot;Lucida Console&quot;, &quot;Liberation Mono&quot;, &quot;DejaVu Sans Mono&quot;, &quot;Bitstream Vera Sans Mono&quot;, &quot;Courier New&quot;, monospace, sans-serif; font-size: 13px; vertical-align: baseline; box-sizing: inherit; white-space: inherit;\"><span class=\"pln\" style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; vertical-align: baseline; box-sizing: inherit; color: rgb(48, 51, 54);\">devServer</span><span class=\"pun\" style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; vertical-align: baseline; box-sizing: inherit; color: rgb(48, 51, 54);\">:</span><span class=\"pln\" style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; vertical-align: baseline; box-sizing: inherit; color: rgb(48, 51, 54);\">",
        "createdAt": "2019-12-19T14:22:47.428Z",
        "updatedAt": "2019-12-19T14:53:27.069Z"
 }
```

- Response 500 (application/json)

```
{
    "message": "internal server error"
}
```







<h2>Answer Routes </h2>
<hr>




## Answer Create  [post]

> <BASEUrl/answers>

- Request (application/json)

  Params : 

  Headers :   token ( authorized user ) 

  > "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZGNjNWNjOTY4NzcyMDlmYjIxNWUzMCIsImVtYWlsIjoiYUBtYWlsLmNvbSIsImlhdCI6MTU3NTE4OTI2Nn0.vKKYVixOvjwKIigw7c7Xzni0j0qZh_j8VzuFQF0J7g0"

- 

```
{
        "question": "What should i do after deploying",
        "tags": ["vue","javascript","angular"]
        
 }
```

- Response 200 (application/json)

```
{
        "name": "Basketball Shoe - LeBron 17",
        "description": "The LeBron 17 harnesses LeBron's strength and speed with containment and support for all-court domination. It features a lightweight mix of knit and heat-moulded yarns that gives each one a durable look and feel. Combined cushioning provides LeBron with the impact support and responsive energy return he needs to power through the long season."
        "price": "2909000",
        "images": ["url","url","url","url"],
        
    }
```

- Response 400 (application/json)

```
{
    "message": "authentication failed"
}
```

- Response 404 (application/json)

```
{
    "message": "you are not authorized to perform this action"
}
```



## Question Delete  [delete]

> <BASEUrl/products/:id>

- Request (application/json)

  Params:  id ( product id )

  Headers :   token ( authorized user )  

  > "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZGNjNWNjOTY4NzcyMDlmYjIxNWUzMCIsImVtYWlsIjoiYUBtYWlsLmNvbSIsImlhdCI6MTU3NTE4OTI2Nn0.vKKYVixOvjwKIigw7c7Xzni0j0qZh_j8VzuFQF0J7g0"

  

- Response 201 (application/json)

```
{
    "message": "product successfully deleted"
}
```

- Response 401 (application/json)

```
{
    "message": "authentication failed"
}
```

- Response 404 (application/json)

```
{
    "message": "you are not authorized to perform this action"
}
```



## Update Question  [put]

> <BASEUrl/products/:id>

- Request (application/json)

  Params:  id ( product id )

  Headers :   token 

  > "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZGNjNWNjOTY4NzcyMDlmYjIxNWUzMCIsImVtYWlsIjoiYUBtYWlsLmNvbSIsImlhdCI6MTU3NTE4OTI2Nn0.vKKYVixOvjwKIigw7c7Xzni0j0qZh_j8VzuFQF0J7g0"

  


```
{
        "title": "How to deploy Vue app",
        "question": "What should i do after deploying",
        "tags": ["vue","javascript","angular"]
 }
```

- Response 200 (application/json)

```
{
        "name": "Basketball Shoe - LeBron 17 EDITED",
        "description": "The LeBron 17 harnesses LeBron's strength and speed with containment and support for all-court domination. It features a lightweight mix of knit and heat-moulded yarns that gives each one a durable look and feel. Combined cushioning provides LeBron with the impact support and responsive energy return he needs to power through the long season."
        "price": "2909000",
        "images": ["url","url","url","url"],
        
    }
```

- Response 400 (application/json)

```
{
    "message": "authentication failed"
}
```

- Response 404 (application/json)

```
{
    "message": "you are not authorized to perform this action"
}
```



## Add to Voe to Cart  [post]

> <BASEUrl/answers/:id>

- Request (application/json)

  Params:  id ( product id )

  Headers :   token 

  > "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZGNjNWNjOTY4NzcyMDlmYjIxNWUzMCIsImVtYWlsIjoiYUBtYWlsLmNvbSIsImlhdCI6MTU3NTE4OTI2Nn0.vKKYVixOvjwKIigw7c7Xzni0j0qZh_j8VzuFQF0J7g0"

  


```
{
        "size": "12",
        "count": "1",
        "total_payment": "2909000",
    }
```

- Response 200 (application/json)

```
 {
        "tags": [
            "test",
            "html"
        ],
        "answers": [],
        "upVotes": [
            "5dfaaf1415b97a4e5564464b"
        ],
        "downVotes": [],
        "_id": "5dfb87b7e0eac63f089ef71d",
        "userId": {
            "tags": [
                "react",
                "vuetify",
                "mongoose"
            ],
            "_id": "5dfb8746e0eac63f089ef71c",
            "name": "Fiqi Fitransyah ",
            "email": "fiqi@mail.com",
            "password": "$2a$10$Uyye0JFSmVzWqgXmAYQYReywBovyf4xoalWUsj1HBi/PlsBdi0B1i",
            "profilePicture": "https://storage.googleapis.com/bucket-alfred/1576765251025-Screen Shot 2019-12-19 at 07.58.59.png",
            "profile": "Instructor Hacktiv8",
            "createdAt": "2019-12-19T14:20:54.308Z",
            "updatedAt": "2019-12-19T14:21:38.435Z"
        },
        "title": "Weird padding issue encoutered in sticky left column of a HTML table that uses Freeze Table jQuery plugin",
        "question": "<p style=\"margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding: 0px; border: 0px; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-stretch: inherit; line-height: inherit; font-family: Arial, &quot;Helvetica Neue&quot;, Helvetica, sans-serif; font-size: 15px; vertical-align: baseline; box-sizing: inherit; clear: both; color: rgb(36, 39, 41);\">The answers here are all extremely helpful, what worked for me was configuring my Webpack server to expect the routes.</p><pre class=\"lang-js prettyprint prettyprinted\" style=\"margin-bottom: 1em; padding: 12px 8px; border: 0px; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-stretch: inherit; line-height: inherit; font-family: Consolas, Menlo, Monaco, &quot;Lucida Console&quot;, &quot;Liberation Mono&quot;, &quot;DejaVu Sans Mono&quot;, &quot;Bitstream Vera Sans Mono&quot;, &quot;Courier New&quot;, monospace, sans-serif; font-size: 13px; vertical-align: baseline; box-sizing: inherit; width: auto; max-height: 600px; background-color: rgb(239, 240, 241); border-radius: 3px; color: rgb(57, 51, 24); overflow-wrap: normal;\"><code style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: Consolas, Menlo, Monaco, &quot;Lucida Console&quot;, &quot;Liberation Mono&quot;, &quot;DejaVu Sans Mono&quot;, &quot;Bitstream Vera Sans Mono&quot;, &quot;Courier New&quot;, monospace, sans-serif; font-size: 13px; vertical-align: baseline; box-sizing: inherit; white-space: inherit;\"><span class=\"pln\" style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; vertical-align: baseline; box-sizing: inherit; color: rgb(48, 51, 54);\">devServer</span><span class=\"pun\" style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; vertical-align: baseline; box-sizing: inherit; color: rgb(48, 51, 54);\">:</span><span class=\"pln\" style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; vertical-align: baseline; box-sizing: inherit; color: rgb(48, 51, 54);\">",
        "createdAt": "2019-12-19T14:22:47.428Z",
        "updatedAt": "2019-12-19T14:53:27.069Z"
 },
     
```

- Response 400 (application/json)

```
 {
        "tags": [
            "test",
            "html",
            "vue",
            "swift"
        ],
        "answers": [],
        "upVotes": [],
        "downVotes": [],
        "_id": "5dfb87b7e0eac63f089ef71d",
        "userId": {
            "tags": [
                "react",
                "vuetify",
                "mongoose"
            ],
            "_id": "5dfb8746e0eac63f089ef71c",
            "name": "Fiqi Fitransyah ",
            "email": "fiqi@mail.com",
            "password": "$2a$10$Uyye0JFSmVzWqgXmAYQYReywBovyf4xoalWUsj1HBi/PlsBdi0B1i",
            "profilePicture": "https://storage.googleapis.com/bucket-alfred/1576765251025-Screen Shot 2019-12-19 at 07.58.59.png",
            "profile": "Instructor Hacktiv8",
            "createdAt": "2019-12-19T14:20:54.308Z",
            "updatedAt": "2019-12-19T14:21:38.435Z"
        },
        "title": "Weird padding issue encoutered in sticky left column of a HTML table that uses Freeze Table jQuery plugin",
        "question": "<p style=\"margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding: 0px; border: 0px; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-stretch: inherit; line-height: inherit; font-family: Arial, &quot;Helvetica Neue&quot;, Helvetica, sans-serif; font-size: 15px; vertical-align: baseline; box-sizing: inherit; clear: both; color: rgb(36, 39, 41);\">The answers here are all extremely helpful, what worked for me was configuring my Webpack server to expect the routes.</p><pre class=\"lang-js prettyprint prettyprinted\" style=\"margin-bottom: 1em; padding: 12px 8px; border: 0px; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-stretch: inherit; line-height: inherit; font-family: Consolas, Menlo, Monaco, &quot;Lucida Console&quot;, &quot;Liberation Mono&quot;, &quot;DejaVu Sans Mono&quot;, &quot;Bitstream Vera Sans Mono&quot;, &quot;Courier New&quot;, monospace, sans-serif; font-size: 13px; vertical-align: baseline; box-sizing: inherit; width: auto; max-height: 600px; background-color: rgb(239, 240, 241); border-radius: 3px; color: rgb(57, 51, 24); overflow-wrap: normal;\"><code style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: Consolas, Menlo, Monaco, &quot;Lucida Console&quot;, &quot;Liberation Mono&quot;, &quot;DejaVu Sans Mono&quot;, &quot;Bitstream Vera Sans Mono&quot;, &quot;Courier New&quot;, monospace, sans-serif; font-size: 13px; vertical-align: baseline; box-sizing: inherit; white-space: inherit;\"><span class=\"pln\" style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; vertical-align: baseline; box-sizing: inherit; color: rgb(48, 51, 54);\">devServer</span><span class=\"pun\" style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; vertical-align: baseline; box-sizing: inherit; color: rgb(48, 51, 54);\">:</span><span class=\"pln\" style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; vertical-align: baseline; box-sizing: inherit; color: rgb(48, 51, 54);\">",
        "createdAt": "2019-12-19T14:22:47.428Z",
        "updatedAt": "2019-12-19T14:53:27.069Z"
 }
     
```

- Response 404 (application/json)

```
{
    "message": "question not found"
}
```





## Up Vote Answer  [put]

> <BASEUrl/answers/:id/upvotes>

- Request (application/json)

  Params:  id ( product id )

  Headers :   token 

  > "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZGNjNWNjOTY4NzcyMDlmYjIxNWUzMCIsImVtYWlsIjoiYUBtYWlsLmNvbSIsImlhdCI6MTU3NTE4OTI2Nn0.vKKYVixOvjwKIigw7c7Xzni0j0qZh_j8VzuFQF0J7g0"

  


```
{
		"message" : "voted up"
}
```

- Response 500 (application/json)

```
{
    "message": "ANSWER NOT FOUND"
}
```





## Down Vote Answer  [post]

> <BASEUrl/questions/:id/downvotes>

- Request (application/json)

  Params:  id ( product id )

  Headers :   token 

  > "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZGNjNWNjOTY4NzcyMDlmYjIxNWUzMCIsImVtYWlsIjoiYUBtYWlsLmNvbSIsImlhdCI6MTU3NTE4OTI2Nn0.vKKYVixOvjwKIigw7c7Xzni0j0qZh_j8VzuFQF0J7g0"





```
{
		"message" : "voted down "
}
```

- Response 500 (application/json)

```
{
    "message": "ANSWER NOT FOUND"
}
```



<h2>Cron Job </h2>
<hr>



## Get Top Three Questions for 1 week  [post]

> <BASEUrl/questions/topthree>

- Request (application/json)

  Params:  id ( question id )

  Headers :   token 

  > "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZGNjNWNjOTY4NzcyMDlmYjIxNWUzMCIsImVtYWlsIjoiYUBtYWlsLmNvbSIsImlhdCI6MTU3NTE4OTI2Nn0.vKKYVixOvjwKIigw7c7Xzni0j0qZh_j8VzuFQF0J7g0"

  


```
[
		{
        "tags": [
            "test",
            "html",
            "vue",
            "swift"
        ],
        "answers": [],
        "upVotes": [],
        "downVotes": [],
        "_id": "5dfb87b7e0eac63f089ef71d",
        "userId": {
            "tags": [
                "react",
                "vuetify",
                "mongoose"
            ],
            "_id": "5dfb8746e0eac63f089ef71c",
            "name": "Fiqi Fitransyah ",
            "email": "fiqi@mail.com",
            "password": "$2a$10$Uyye0JFSmVzWqgXmAYQYReywBovyf4xoalWUsj1HBi/PlsBdi0B1i",
            "profilePicture": "https://storage.googleapis.com/bucket-alfred/1576765251025-Screen Shot 2019-12-19 at 07.58.59.png",
            "profile": "Instructor Hacktiv8",
            "createdAt": "2019-12-19T14:20:54.308Z",
            "updatedAt": "2019-12-19T14:21:38.435Z"
        },
        "title": "Weird padding issue encoutered in sticky left column of a HTML table that uses Freeze Table jQuery plugin",
        "question": "<p style=\"margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding: 0px; border: 0px; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-stretch: inherit; line-height: inherit; font-family: Arial, &quot;Helvetica Neue&quot;, Helvetica, sans-serif; font-size: 15px; vertical-align: baseline; box-sizing: inherit; clear: both; color: rgb(36, 39, 41);\">The answers here are all extremely helpful, what worked for me was configuring my Webpack server to expect the routes.</p><pre class=\"lang-js prettyprint prettyprinted\" style=\"margin-bottom: 1em; padding: 12px 8px; border: 0px; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-stretch: inherit; line-height: inherit; font-family: Consolas, Menlo, Monaco, &quot;Lucida Console&quot;, &quot;Liberation Mono&quot;, &quot;DejaVu Sans Mono&quot;, &quot;Bitstream Vera Sans Mono&quot;, &quot;Courier New&quot;, monospace, sans-serif; font-size: 13px; vertical-align: baseline; box-sizing: inherit; width: auto; max-height: 600px; background-color: rgb(239, 240, 241); border-radius: 3px; color: rgb(57, 51, 24); overflow-wrap: normal;\"><code style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: Consolas, Menlo, Monaco, &quot;Lucida Console&quot;, &quot;Liberation Mono&quot;, &quot;DejaVu Sans Mono&quot;, &quot;Bitstream Vera Sans Mono&quot;, &quot;Courier New&quot;, monospace, sans-serif; font-size: 13px; vertical-align: baseline; box-sizing: inherit; white-space: inherit;\"><span class=\"pln\" style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; vertical-align: baseline; box-sizing: inherit; color: rgb(48, 51, 54);\">devServer</span><span class=\"pun\" style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; vertical-align: baseline; box-sizing: inherit; color: rgb(48, 51, 54);\">:</span><span class=\"pln\" style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; vertical-align: baseline; box-sizing: inherit; color: rgb(48, 51, 54);\">",
        "createdAt": "2019-12-19T14:22:47.428Z",
        "updatedAt": "2019-12-19T14:53:27.069Z"
 },
 {
        "tags": [
            "test",
            "html",
            "vue",
            "swift"
        ],
        "answers": [],
        "upVotes": [],
        "downVotes": [],
        "_id": "5dfb87b7e0eac63f089ef71d",
        "userId": {
            "tags": [
                "react",
                "vuetify",
                "mongoose"
            ],
            "_id": "5dfb8746e0eac63f089ef71c",
            "name": "Fiqi Fitransyah ",
            "email": "fiqi@mail.com",
            "password": "$2a$10$Uyye0JFSmVzWqgXmAYQYReywBovyf4xoalWUsj1HBi/PlsBdi0B1i",
            "profilePicture": "https://storage.googleapis.com/bucket-alfred/1576765251025-Screen Shot 2019-12-19 at 07.58.59.png",
            "profile": "Instructor Hacktiv8",
            "createdAt": "2019-12-19T14:20:54.308Z",
            "updatedAt": "2019-12-19T14:21:38.435Z"
        },
        "title": "Weird padding issue encoutered in sticky left column of a HTML table that uses Freeze Table jQuery plugin",
        "question": "<p style=\"margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding: 0px; border: 0px; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-stretch: inherit; line-height: inherit; font-family: Arial, &quot;Helvetica Neue&quot;, Helvetica, sans-serif; font-size: 15px; vertical-align: baseline; box-sizing: inherit; clear: both; color: rgb(36, 39, 41);\">The answers here are all extremely helpful, what worked for me was configuring my Webpack server to expect the routes.</p><pre class=\"lang-js prettyprint prettyprinted\" style=\"margin-bottom: 1em; padding: 12px 8px; border: 0px; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-stretch: inherit; line-height: inherit; font-family: Consolas, Menlo, Monaco, &quot;Lucida Console&quot;, &quot;Liberation Mono&quot;, &quot;DejaVu Sans Mono&quot;, &quot;Bitstream Vera Sans Mono&quot;, &quot;Courier New&quot;, monospace, sans-serif; font-size: 13px; vertical-align: baseline; box-sizing: inherit; width: auto; max-height: 600px; background-color: rgb(239, 240, 241); border-radius: 3px; color: rgb(57, 51, 24); overflow-wrap: normal;\"><code style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: Consolas, Menlo, Monaco, &quot;Lucida Console&quot;, &quot;Liberation Mono&quot;, &quot;DejaVu Sans Mono&quot;, &quot;Bitstream Vera Sans Mono&quot;, &quot;Courier New&quot;, monospace, sans-serif; font-size: 13px; vertical-align: baseline; box-sizing: inherit; white-space: inherit;\"><span class=\"pln\" style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; vertical-align: baseline; box-sizing: inherit; color: rgb(48, 51, 54);\">devServer</span><span class=\"pun\" style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; vertical-align: baseline; box-sizing: inherit; color: rgb(48, 51, 54);\">:</span><span class=\"pln\" style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; vertical-align: baseline; box-sizing: inherit; color: rgb(48, 51, 54);\">",
        "createdAt": "2019-12-19T14:22:47.428Z",
        "updatedAt": "2019-12-19T14:53:27.069Z"
 },
 {
        "tags": [
            "test",
            "html",
            "vue",
            "swift"
        ],
        "answers": [],
        "upVotes": [],
        "downVotes": [],
        "_id": "5dfb87b7e0eac63f089ef71d",
        "userId": {
            "tags": [
                "react",
                "vuetify",
                "mongoose"
            ],
            "_id": "5dfb8746e0eac63f089ef71c",
            "name": "Fiqi Fitransyah ",
            "email": "fiqi@mail.com",
            "password": "$2a$10$Uyye0JFSmVzWqgXmAYQYReywBovyf4xoalWUsj1HBi/PlsBdi0B1i",
            "profilePicture": "https://storage.googleapis.com/bucket-alfred/1576765251025-Screen Shot 2019-12-19 at 07.58.59.png",
            "profile": "Instructor Hacktiv8",
            "createdAt": "2019-12-19T14:20:54.308Z",
            "updatedAt": "2019-12-19T14:21:38.435Z"
        },
        "title": "Weird padding issue encoutered in sticky left column of a HTML table that uses Freeze Table jQuery plugin",
        "question": "<p style=\"margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding: 0px; border: 0px; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-stretch: inherit; line-height: inherit; font-family: Arial, &quot;Helvetica Neue&quot;, Helvetica, sans-serif; font-size: 15px; vertical-align: baseline; box-sizing: inherit; clear: both; color: rgb(36, 39, 41);\">The answers here are all extremely helpful, what worked for me was configuring my Webpack server to expect the routes.</p><pre class=\"lang-js prettyprint prettyprinted\" style=\"margin-bottom: 1em; padding: 12px 8px; border: 0px; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-stretch: inherit; line-height: inherit; font-family: Consolas, Menlo, Monaco, &quot;Lucida Console&quot;, &quot;Liberation Mono&quot;, &quot;DejaVu Sans Mono&quot;, &quot;Bitstream Vera Sans Mono&quot;, &quot;Courier New&quot;, monospace, sans-serif; font-size: 13px; vertical-align: baseline; box-sizing: inherit; width: auto; max-height: 600px; background-color: rgb(239, 240, 241); border-radius: 3px; color: rgb(57, 51, 24); overflow-wrap: normal;\"><code style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: Consolas, Menlo, Monaco, &quot;Lucida Console&quot;, &quot;Liberation Mono&quot;, &quot;DejaVu Sans Mono&quot;, &quot;Bitstream Vera Sans Mono&quot;, &quot;Courier New&quot;, monospace, sans-serif; font-size: 13px; vertical-align: baseline; box-sizing: inherit; white-space: inherit;\"><span class=\"pln\" style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; vertical-align: baseline; box-sizing: inherit; color: rgb(48, 51, 54);\">devServer</span><span class=\"pun\" style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; vertical-align: baseline; box-sizing: inherit; color: rgb(48, 51, 54);\">:</span><span class=\"pln\" style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; vertical-align: baseline; box-sizing: inherit; color: rgb(48, 51, 54);\">",
        "createdAt": "2019-12-19T14:22:47.428Z",
        "updatedAt": "2019-12-19T14:53:27.069Z"
 }
]
```

- Response 500 (application/json)

```
{
    "message": "ANSWER NOT FOUND"
}
```



## Reset Top Three Questions for next week  [post]

> <BASEUrl/questions/topthree>

- Request (application/json)

  Params:  id ( question id )

  Headers :   token 

  > "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZGNjNWNjOTY4NzcyMDlmYjIxNWUzMCIsImVtYWlsIjoiYUBtYWlsLmNvbSIsImlhdCI6MTU3NTE4OTI2Nn0.vKKYVixOvjwKIigw7c7Xzni0j0qZh_j8VzuFQF0J7g0"

  


```
[
		{
        "tags": [
            "test",
            "html",
            "vue",
            "swift"
        ],
        "answers": [],
        "upVotes": [],
        "downVotes": [],
        "_id": "5dfb87b7e0eac63f089ef71d",
        "userId": {
            "tags": [
                "react",
                "vuetify",
                "mongoose"
            ],
            "_id": "5dfb8746e0eac63f089ef71c",
            "name": "Fiqi Fitransyah ",
            "email": "fiqi@mail.com",
            "password": "$2a$10$Uyye0JFSmVzWqgXmAYQYReywBovyf4xoalWUsj1HBi/PlsBdi0B1i",
            "profilePicture": "https://storage.googleapis.com/bucket-alfred/1576765251025-Screen Shot 2019-12-19 at 07.58.59.png",
            "profile": "Instructor Hacktiv8",
            "createdAt": "2019-12-19T14:20:54.308Z",
            "updatedAt": "2019-12-19T14:21:38.435Z"
        },
        "title": "Weird padding issue encoutered in sticky left column of a HTML table that uses Freeze Table jQuery plugin",
        "question": "<p style=\"margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding: 0px; border: 0px; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-stretch: inherit; line-height: inherit; font-family: Arial, &quot;Helvetica Neue&quot;, Helvetica, sans-serif; font-size: 15px; vertical-align: baseline; box-sizing: inherit; clear: both; color: rgb(36, 39, 41);\">The answers here are all extremely helpful, what worked for me was configuring my Webpack server to expect the routes.</p><pre class=\"lang-js prettyprint prettyprinted\" style=\"margin-bottom: 1em; padding: 12px 8px; border: 0px; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-stretch: inherit; line-height: inherit; font-family: Consolas, Menlo, Monaco, &quot;Lucida Console&quot;, &quot;Liberation Mono&quot;, &quot;DejaVu Sans Mono&quot;, &quot;Bitstream Vera Sans Mono&quot;, &quot;Courier New&quot;, monospace, sans-serif; font-size: 13px; vertical-align: baseline; box-sizing: inherit; width: auto; max-height: 600px; background-color: rgb(239, 240, 241); border-radius: 3px; color: rgb(57, 51, 24); overflow-wrap: normal;\"><code style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: Consolas, Menlo, Monaco, &quot;Lucida Console&quot;, &quot;Liberation Mono&quot;, &quot;DejaVu Sans Mono&quot;, &quot;Bitstream Vera Sans Mono&quot;, &quot;Courier New&quot;, monospace, sans-serif; font-size: 13px; vertical-align: baseline; box-sizing: inherit; white-space: inherit;\"><span class=\"pln\" style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; vertical-align: baseline; box-sizing: inherit; color: rgb(48, 51, 54);\">devServer</span><span class=\"pun\" style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; vertical-align: baseline; box-sizing: inherit; color: rgb(48, 51, 54);\">:</span><span class=\"pln\" style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; vertical-align: baseline; box-sizing: inherit; color: rgb(48, 51, 54);\">",
        "createdAt": "2019-12-19T14:22:47.428Z",
        "updatedAt": "2019-12-19T14:53:27.069Z"
 },
 {
        "tags": [
            "test",
            "html",
            "vue",
            "swift"
        ],
        "answers": [],
        "upVotes": [],
        "downVotes": [],
        "_id": "5dfb87b7e0eac63f089ef71d",
        "userId": {
            "tags": [
                "react",
                "vuetify",
                "mongoose"
            ],
            "_id": "5dfb8746e0eac63f089ef71c",
            "name": "Fiqi Fitransyah ",
            "email": "fiqi@mail.com",
            "password": "$2a$10$Uyye0JFSmVzWqgXmAYQYReywBovyf4xoalWUsj1HBi/PlsBdi0B1i",
            "profilePicture": "https://storage.googleapis.com/bucket-alfred/1576765251025-Screen Shot 2019-12-19 at 07.58.59.png",
            "profile": "Instructor Hacktiv8",
            "createdAt": "2019-12-19T14:20:54.308Z",
            "updatedAt": "2019-12-19T14:21:38.435Z"
        },
        "title": "Weird padding issue encoutered in sticky left column of a HTML table that uses Freeze Table jQuery plugin",
        "question": "<p style=\"margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding: 0px; border: 0px; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-stretch: inherit; line-height: inherit; font-family: Arial, &quot;Helvetica Neue&quot;, Helvetica, sans-serif; font-size: 15px; vertical-align: baseline; box-sizing: inherit; clear: both; color: rgb(36, 39, 41);\">The answers here are all extremely helpful, what worked for me was configuring my Webpack server to expect the routes.</p><pre class=\"lang-js prettyprint prettyprinted\" style=\"margin-bottom: 1em; padding: 12px 8px; border: 0px; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-stretch: inherit; line-height: inherit; font-family: Consolas, Menlo, Monaco, &quot;Lucida Console&quot;, &quot;Liberation Mono&quot;, &quot;DejaVu Sans Mono&quot;, &quot;Bitstream Vera Sans Mono&quot;, &quot;Courier New&quot;, monospace, sans-serif; font-size: 13px; vertical-align: baseline; box-sizing: inherit; width: auto; max-height: 600px; background-color: rgb(239, 240, 241); border-radius: 3px; color: rgb(57, 51, 24); overflow-wrap: normal;\"><code style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: Consolas, Menlo, Monaco, &quot;Lucida Console&quot;, &quot;Liberation Mono&quot;, &quot;DejaVu Sans Mono&quot;, &quot;Bitstream Vera Sans Mono&quot;, &quot;Courier New&quot;, monospace, sans-serif; font-size: 13px; vertical-align: baseline; box-sizing: inherit; white-space: inherit;\"><span class=\"pln\" style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; vertical-align: baseline; box-sizing: inherit; color: rgb(48, 51, 54);\">devServer</span><span class=\"pun\" style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; vertical-align: baseline; box-sizing: inherit; color: rgb(48, 51, 54);\">:</span><span class=\"pln\" style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; vertical-align: baseline; box-sizing: inherit; color: rgb(48, 51, 54);\">",
        "createdAt": "2019-12-19T14:22:47.428Z",
        "updatedAt": "2019-12-19T14:53:27.069Z"
 },
 {
        "tags": [
            "test",
            "html",
            "vue",
            "swift"
        ],
        "answers": [],
        "upVotes": [],
        "downVotes": [],
        "_id": "5dfb87b7e0eac63f089ef71d",
        "userId": {
            "tags": [
                "react",
                "vuetify",
                "mongoose"
            ],
            "_id": "5dfb8746e0eac63f089ef71c",
            "name": "Fiqi Fitransyah ",
            "email": "fiqi@mail.com",
            "password": "$2a$10$Uyye0JFSmVzWqgXmAYQYReywBovyf4xoalWUsj1HBi/PlsBdi0B1i",
            "profilePicture": "https://storage.googleapis.com/bucket-alfred/1576765251025-Screen Shot 2019-12-19 at 07.58.59.png",
            "profile": "Instructor Hacktiv8",
            "createdAt": "2019-12-19T14:20:54.308Z",
            "updatedAt": "2019-12-19T14:21:38.435Z"
        },
        "title": "Weird padding issue encoutered in sticky left column of a HTML table that uses Freeze Table jQuery plugin",
        "question": "<p style=\"margin-right: 0px; margin-bottom: 1em; margin-left: 0px; padding: 0px; border: 0px; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-stretch: inherit; line-height: inherit; font-family: Arial, &quot;Helvetica Neue&quot;, Helvetica, sans-serif; font-size: 15px; vertical-align: baseline; box-sizing: inherit; clear: both; color: rgb(36, 39, 41);\">The answers here are all extremely helpful, what worked for me was configuring my Webpack server to expect the routes.</p><pre class=\"lang-js prettyprint prettyprinted\" style=\"margin-bottom: 1em; padding: 12px 8px; border: 0px; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-stretch: inherit; line-height: inherit; font-family: Consolas, Menlo, Monaco, &quot;Lucida Console&quot;, &quot;Liberation Mono&quot;, &quot;DejaVu Sans Mono&quot;, &quot;Bitstream Vera Sans Mono&quot;, &quot;Courier New&quot;, monospace, sans-serif; font-size: 13px; vertical-align: baseline; box-sizing: inherit; width: auto; max-height: 600px; background-color: rgb(239, 240, 241); border-radius: 3px; color: rgb(57, 51, 24); overflow-wrap: normal;\"><code style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: Consolas, Menlo, Monaco, &quot;Lucida Console&quot;, &quot;Liberation Mono&quot;, &quot;DejaVu Sans Mono&quot;, &quot;Bitstream Vera Sans Mono&quot;, &quot;Courier New&quot;, monospace, sans-serif; font-size: 13px; vertical-align: baseline; box-sizing: inherit; white-space: inherit;\"><span class=\"pln\" style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; vertical-align: baseline; box-sizing: inherit; color: rgb(48, 51, 54);\">devServer</span><span class=\"pun\" style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; vertical-align: baseline; box-sizing: inherit; color: rgb(48, 51, 54);\">:</span><span class=\"pln\" style=\"margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; vertical-align: baseline; box-sizing: inherit; color: rgb(48, 51, 54);\">",
        "createdAt": "2019-12-19T14:22:47.428Z",
        "updatedAt": "2019-12-19T14:53:27.069Z"
 }
]
```

- Response 500 (application/json)

```
{
    "message": "ANSWER NOT FOUND"
}
```











