# hackoverflow

DEPLOY AWS

SERVER AWS x DOMAINESIA
> [http://minipc-stunoverflow.anggabanny.online/](http://minipc-stunoverflow.anggabanny.online/)

CLIENT AWS
> [http://stunoverflow.anggabanny.online.s3-website-ap-southeast-1.amazonaws.com/](http://stunoverflow.anggabanny.online.s3-website-ap-southeast-1.amazonaws.com/)

CLIENT AWS x DOMAINESIA
> [http://stunoverflow.anggabanny.online/](http://stunoverflow.anggabanny.online/)
  

# INTRODUCTION !

Sebelum memulai semuanya alangkah lebih baik jika menguji server terlebih dahulu silahkan akses `/`

untuk menguji bahwa server benar benar berjalan dengan baik, server akan mengirim

```
{
  message: "Connected To Server Success"
}
```

jika tidak maka kamu akan melihat error dengan status code `500`  ``` CANNOT GET / ``` artinya ada yang tidak beres dengan server mu. mari lihat bagaimana cara mengatasinya [`disini`](#status-code)

  

# ROUTES

## 1. User Router

|Method|USER|<i>detail</i>|<i>Details Status</i>|<i>Authentication</i>|<i>Authorization</i>|<i>Verify Google</i>|
|-|-|-|-|-|-|-|
|`POST`|`/user/register`|Create User| [ℹ️details](#user-route) | <p  align="center">❌</p>|<p  align="center">❌</p>|<p  align="center">❌</p>
|`POST`|`/user/login`|User Login| [ℹ️details](#user-route) | <p  align="center">❌</p>|<p  align="center">❌</p>|<p  align="center">❌</p>
|`GET`|`/user/myaccount`|Find One User on loggedin| [ℹ️details](#user-route) |<p  align="center">✔️</p>|<p  align="center">❌</p>|<p  align="center">❌</p>
|`PATCH`|`/user/addWatchedTags`|Updated Watch Tag on User to find question| [ℹ️details](#user-route) |<p  align="center">✔️</p>|<p  align="center">❌</p>|<p  align="center">❌</p>

## 2. Question Router
|Method|QUESTION|<i>detail</i>|<i>Details Status</i>|<i>Authentication</i>|<i>Authorization</i>|
|-|-|-|-|-|-|
|`GET`|`/question`|Get all Question| [ℹ️details](#article-route) | <p  align="center">✔️</p>|<p  align="center">❌</p>
|`GET`|`/question/:id`|Get one Question| [ℹ️details](#article-route) | <p  align="center">✔️</p>|<p  align="center">❌</p>
|`POST`|`/question`|Create Question| [ℹ️details](#article-route) | <p  align="center">✔️</p>|<p  align="center">❌</p>
|`POST`|`/question/search`|find Question with params title| [ℹ️details](#article-route) | <p  align="center">✔️</p>|<p  align="center">❌</p>
|`PUT`|`/question/:id/updated`|Update Question| [ℹ️details](#article-route) | <p  align="center">✔️</p>|<p  align="center">✔️</p>
|`PATCH`|`/question/:id/upvotes`|update votes question| [ℹ️details](#article-route) | <p  align="center">✔️</p>|<p  align="center">❌</p>
|`PATCH`|`/question/:id/downvotes`|update votes question| [ℹ️details](#article-route) | <p  align="center">✔️</p>|<p  align="center">❌</p>
|`DELETE`|`/question/:id`|delete question| [ℹ️details](#article-route) | <p  align="center">✔️</p>|<p  align="center">✔️</p>


## 3. Answer Router
|Method|ANSWER|<i>detail</i>|<i>Details Status</i>|<i>Authentication</i>|<i>Authorization</i>|
|-|-|-|-|-|-|
|`GET`|`/answer`|Get all Answer| [ℹ️details](#article-route) | <p  align="center">✔️</p>|<p  align="center">❌</p>
|`GET`|`/answer/:id`|Get one Answer| [ℹ️details](#article-route) | <p  align="center">✔️</p>|<p  align="center">❌</p>
|`POST`|`/answer/:id`|Create Answer| [ℹ️details](#article-route) | <p  align="center">✔️</p>|<p  align="center">❌</p>
|`PUT`|`/answer/:id/updated`|Update Answer| [ℹ️details](#article-route) | <p  align="center">✔️</p>|<p  align="center">✔️</p>
|`PATCH`|`/answer/:id/upvotes`|update votes answer| [ℹ️details](#article-route) | <p  align="center">✔️</p>|<p  align="center">❌</p>
|`PATCH`|`/answer/:id/downvotes`|update votes answer| [ℹ️details](#article-route) | <p  align="center">✔️</p>|<p  align="center">❌</p>
|`DELETE`|`/answer/:id`|delete answer| [ℹ️details](#article-route) | <p  align="center">✔️</p>|<p  align="center">✔️</p>

# INSTALLATION

### PACKAGE with NPM SERVER SIDE
> **npm install**
> [axios]()
> [bcryptjs]()
> [cors]()
> [express]()
> [gsc-upload]()
> [jsonwebtoken]()
> [morgan]()
> [mongoose]()
> [node-cron]()
> [mailer]()

> **npm install -D**
> [dotenv]()


### PACKAGE with NPM Client SIDE
> **npm install**
> [axios]()
> [bootstrap]()
> [bootstrap-vue]()
> [sweetaler2]()
> [vue-moment]();
> [vue-wyswyg]();

> **VUE CREATE**
> [vue]()
> [vuex]()
> [router]()
> [babel]()
> [eslint]()

# DETAIL ROUTE

## USER ROUTE
### 1. [POST] /user/register

		▶️ BODY {
			email : STRING,
			password : STRING,
			image : FILE
		}	
	
		▶️ SUCCESS [STATUS 201 CREATED!]
			{
				"message":  "create user successfuly",
					"token": jwt_token,
					"user":  {
						"popular":  0,
						"image":  [
							"https://storage.googleapis.com/imagebucket-stunoverflow/1576807409269-profil_avatar.jpg"
						],
						"watchedTags":  [],
						"_id":  "5dfc2bf28bd8410d1acb0305",
						"email":  "angga_banny@mail.com",
						"password":  "$2a$11$EpkfuSWy11cOK8p19cJR/u9NAuCZj8AQuKLQxUIv63SyTHIn5Ueaq",
						"createdAt":  "2019-12-20T02:03:30.910Z",
						"updatedAt":  "2019-12-20T02:03:30.910Z"
					}
				}
	
		▶️ FAILED [STATUS 400 BAD REQUEST]
			{
				"message":  "Validation Error",
				"errors":  [
					"Invalid Email Format",
					"email is required",
					"password is required",
					"Please Fill Your PhotoProfile",
				]
			}
			
		▶️ FAILED [STATUS 500 INTERNAL SERVER ERROR]
			{
				"message": "Internal Server Error",
			}

### 2. [POST] /user/login

		▶️ BODY {
			email : STRING,
			password : STRING,
		}	
	
		▶️ SUCCESS [STATUS 200 OK!]
			{
				"token": jwt_token,
				"user":  {
					"popular":  0,
					"image":  [
						"https://storage.googleapis.com/imagebucket-stunoverflow/1576807409269-profil_avatar.jpg"
					],
					"watchedTags":  [],
					"_id":  "5dfc2bf28bd8410d1acb0305",
					"email":  "angga_banny@mail.com",
					"password":  "$2a$11$EpkfuSWy11cOK8p19cJR/u9NAuCZj8AQuKLQxUIv63SyTHIn5Ueaq",
					"createdAt":  "2019-12-20T02:03:30.910Z",
					"updatedAt":  "2019-12-20T02:03:30.910Z"
				}
			}
	
		▶️ FAILED [STATUS 404 NOT FOUND]
			{
				"message":  "Validation Error",
				"errors":  [
					"Email is Wrong!"
				]
			}
	
		▶️ FAILED [STATUS 400 BAD REQUEST]
			{
				"message":  "Validation Error",
				"errors":  [
					"Email or Password Wrong!"
				]
			}
			
		▶️ FAILED [STATUS 500 INTERNAL SERVER ERROR]
			{
				"message": "Internal Server Error",
			}

### 3. [GET] /user/myaccount

		▶️ HEADERS {
			token : jwt_token ,
		}	
	
		▶️ SUCCESS [STATUS 200 OK!]
			{
				"popular":  0,
				"image":  [
					"https://storage.googleapis.com/imagebucket-stunoverflow/1576807409269-profil_avatar.jpg"
				],
				"watchedTags":  [],
				"_id":  "5dfc2bf28bd8410d1acb0305",
				"email":  "angga_banny@mail.com",
				"password":  "$2a$11$EpkfuSWy11cOK8p19cJR/u9NAuCZj8AQuKLQxUIv63SyTHIn5Ueaq",
				"createdAt":  "2019-12-20T02:03:30.910Z",
				"updatedAt":  "2019-12-20T02:03:30.910Z"
			}
	
		▶️ FAILED [STATUS 401 UnAuthorized]
			{
				"message":  "Json Web Token Error",
				"errors":  [ {
					"name":  "JsonWebTokenError",
					"message":  "jwt malformed",
								OR
					"message":  "jwt must be provided"
				} ]
			}
			
		▶️ FAILED [STATUS 500 INTERNAL SERVER ERROR]
			{
				"message": "Internal Server Error",
			}

### 4. [PATCH] /user/addWatchedTags

		▶️ HEADERS {
			token : jwt_token ,
		}	
		
		▶️ BODY {
			tag : STRING,
			condition : BOOLEAN,
		}	
		
		⇒ condition is True When you non active checking of dublicated tag [ADD TAG]
		⇒ condition is False When you actived checking of dublicated tag [DESTROY TAG]

		▶️ SUCCESS [STATUS 200 OK!]
			{
				"token": jwt_token,
				"user":  {
					"popular":  0,
					"image":  [
						"https://storage.googleapis.com/imagebucket-stunoverflow/1576807409269-profil_avatar.jpg"
					],
					"watchedTags":  [
						"java"
					],
					"_id":  "5dfc2bf28bd8410d1acb0305",
					"email":  "angga_banny@mail.com",
					"password":  "$2a$11$EpkfuSWy11cOK8p19cJR/u9NAuCZj8AQuKLQxUIv63SyTHIn5Ueaq",
					"createdAt":  "2019-12-20T02:03:30.910Z",
					"updatedAt":  "2019-12-20T02:03:30.910Z"
				}
			}

		▶️ FAILED [STATUS 401 UnAuthorized]
			{
				"message":  "Json Web Token Error",
				"errors":  [ {
					"name":  "JsonWebTokenError",
					"message":  "jwt malformed",
								OR
					"message":  "jwt must be provided"
				} ]
			}
			
		▶️ FAILED [STATUS 500 INTERNAL SERVER ERROR]
			{
				"message": "Internal Server Error",
			}


## QUESTION ROUTE

### 1. [GET] /question
		▶️ HEADERS {
			token : jwt_token ,
		}
	
		▶️ SUCCESS [STATUS 200 OK!]
			[
				{
				"answerId":  [],
				"tags":  [],
				"upvotes":  [],
				"downvotes":  [],
				"_id":  "5dfc37d9eaaf04121b7b083d",
				"title":  "nodejs",
				"description":  "ndejsjsjs",
				"userId":  {
					"popular":  0,
					"image":  [
						"https://storage.googleapis.com/imagebucket-stunoverflow/1576807409269-profil_avatar.jpg"
					],
					"watchedTags":  [
						"javascript"
					],
					"_id":  "5dfc2bf28bd8410d1acb0305",
					"email":  "angga_banny@mail.com",
					"password":  "$2a$11$EpkfuSWy11cOK8p19cJR/u9NAuCZj8AQuKLQxUIv63SyTHIn5Ueaq",
					"createdAt":  "2019-12-20T02:03:30.910Z",
					"updatedAt":  "2019-12-20T02:42:23.929Z"
				},
				"createdAt":  "2019-12-20T02:54:18.099Z",
				"updatedAt":  "2019-12-20T02:54:18.099Z"
			}
		]
	
		▶️ FAILED [STATUS 401 UnAuthorized]
			{
				"message":  "Json Web Token Error",
				"errors":  [ {
					"name":  "JsonWebTokenError",
					"message":  "jwt malformed",
								OR
					"message":  "jwt must be provided"
				} ]
			}			

		▶️ FAILED [STATUS 500 INTERNAL SERVER ERROR]
			{
				"message": "Internal Server Error",
			}


### 2. [GET] /question/:id
		▶️ HEADERS {
			token : jwt_token ,
		}

		▶️ PARAMS {
			id: questionId
		}	
	
		▶️ SUCCESS [STATUS 200 OK!]
			[
				{
				"answerId":  [],
				"tags":  [],
				"upvotes":  [],
				"downvotes":  [],
				"_id":  "5dfc37d9eaaf04121b7b083d",
				"title":  "nodejs",
				"description":  "ndejsjsjs",
				"userId":  {
					"popular":  0,
					"image":  [
						"https://storage.googleapis.com/imagebucket-stunoverflow/1576807409269-profil_avatar.jpg"
					],
					"watchedTags":  [
						"javascript"
					],
					"_id":  "5dfc2bf28bd8410d1acb0305",
					"email":  "angga_banny@mail.com",
					"password":  "$2a$11$EpkfuSWy11cOK8p19cJR/u9NAuCZj8AQuKLQxUIv63SyTHIn5Ueaq",
					"createdAt":  "2019-12-20T02:03:30.910Z",
					"updatedAt":  "2019-12-20T02:42:23.929Z"
				},
				"createdAt":  "2019-12-20T02:54:18.099Z",
				"updatedAt":  "2019-12-20T02:54:18.099Z"
			}
		]
	
		▶️ FAILED [STATUS 401 UnAuthorized]
			{
				"message":  "Json Web Token Error",
				"errors":  [ {
					"name":  "JsonWebTokenError",
					"message":  "jwt malformed",
								OR
					"message":  "jwt must be provided"
				} ]
			}			

		▶️ FAILED [STATUS 500 INTERNAL SERVER ERROR]
			{
				"message": "Internal Server Error",
			}

### 3. [POST] /question
		▶️ HEADERS {
			token : jwt_token ,
		}

		▶️ BODY {
			title : STRING,
			description : STRING,
			tags : STRING, ARRAY
		}	
	
		▶️ SUCCESS [STATUS 201 CREATED!]
			{
				"message":  "create question success",
				"question":  {
					"answerId":  [],
					"tags":  [],
					"upvotes":  [],
					"downvotes":  [],
					"_id":  "5dfc37d9eaaf04121b7b083d",
					"title":  "nodejs",
					"description":  "ndejsjsjs",
					"userId":  "5dfc2bf28bd8410d1acb0305",
					"createdAt":  "2019-12-20T02:54:18.099Z",
					"updatedAt":  "2019-12-20T02:54:18.099Z"
				}
			}
	
		▶️ FAILED [STATUS 400 BAD REQUEST]
			{
				"message":  "Validation Error",
				"errors":  [
					"title is required",
					"description is required"
				]
			}

		▶️ FAILED [STATUS 401 UnAuthorized]
			{
				"message":  "Json Web Token Error",
				"errors":  [ {
					"name":  "JsonWebTokenError",
					"message":  "jwt malformed",
								OR
					"message":  "jwt must be provided"
				} ]
			}			

		▶️ FAILED [STATUS 500 INTERNAL SERVER ERROR]
			{
				"message": "Internal Server Error",
			}

### 4. [POST] /question/search
		▶️ HEADERS {
			token : jwt_token ,
		}

		▶️ BODY {
			search : STRING
		}	
	
		▶️ SUCCESS [STATUS 200 CREATED!]
			[
				{
				"answerId":  [],
				"tags":  [],
				"upvotes":  [],
				"downvotes":  [],
				"_id":  "5dfc37d9eaaf04121b7b083d",
				"title":  "nodejs",
				"description":  "ndejsjsjs",
				"userId":  {
					"popular":  0,
					"image":  [
						"https://storage.googleapis.com/imagebucket-stunoverflow/1576807409269-profil_avatar.jpg"
					],
					"watchedTags":  [
						"java",
						"javascript"
					],
					"_id":  "5dfc2bf28bd8410d1acb0305",
					"email":  "angga_banny@mail.com",
					"password":  "$2a$11$EpkfuSWy11cOK8p19cJR/u9NAuCZj8AQuKLQxUIv63SyTHIn5Ueaq",
					"createdAt":  "2019-12-20T02:03:30.910Z",
					"updatedAt":  "2019-12-20T02:42:23.929Z"
				},
				"createdAt":  "2019-12-20T02:54:18.099Z",
				"updatedAt":  "2019-12-20T02:54:18.099Z"
			}
		]
	
		▶️ FAILED [STATUS 401 UnAuthorized]
			{
				"message":  "Json Web Token Error",
				"errors":  [ {
					"name":  "JsonWebTokenError",
					"message":  "jwt malformed",
								OR
					"message":  "jwt must be provided"
				} ]
			}			

		▶️ FAILED [STATUS 500 INTERNAL SERVER ERROR]
			{
				"message": "Internal Server Error",
			}

### 5. [POST] /question
		▶️ HEADERS {
			token : jwt_token ,
		}

		▶️ BODY {
			title : STRING,
			description : STRING,
			tags : STRING, ARRAY
		}	
	
		▶️ SUCCESS [STATUS 200 OK!]
			{
				"message":  "updated question success",
				"question":  {
					"answerId":  [],
					"tags":  [],
					"upvotes":  [],
					"downvotes":  [],
					"_id":  "5dfc37d9eaaf04121b7b083d",
					"title":  "nodejs",
					"description":  "ndejsjsjs",
					"userId":  "5dfc2bf28bd8410d1acb0305",
					"createdAt":  "2019-12-20T02:54:18.099Z",
					"updatedAt":  "2019-12-20T02:54:18.099Z"
				}
			}
	
		▶️ FAILED [STATUS 400 BAD REQUEST]
			{
				"message":  "Validation Error",
				"errors":  [
					"title is required",
					"description is required"
				]
			}

		▶️ FAILED [STATUS 401 UnAuthorized]
			{
				"message":  "Json Web Token Error",
				"errors":  [ {
					"name":  "JsonWebTokenError",
					"message":  "jwt malformed",
								OR
					"message":  "jwt must be provided"
				} ]
			}			

		▶️ FAILED [STATUS 500 INTERNAL SERVER ERROR]
			{
				"message": "Internal Server Error",
			}

### 5. [PATCH] /question/:id/upvotes
		▶️ HEADERS {
			token : jwt_token ,
		}
		
		▶️ PARAMS {
			id: questionId
		}
	
		▶️ SUCCESS [STATUS 200 OK!]
			{
				"message":  "berhasil menambahkan vote",
				"question":  {
					"answerId":  [],
					"tags":  [],
					"upvotes":  [
						"5dfc2bf28bd8410d1acb0305"
					],
					"downvotes":  [],
					"_id":  "5dfc37d9eaaf04121b7b083d",
					"title":  "nodejs",
					"description":  "ndejsjsjs",
					"userId":  "5dfc2bf28bd8410d1acb0305",
					"createdAt":  "2019-12-20T02:54:18.099Z",
					"updatedAt":  "2019-12-20T02:54:18.099Z"
				}
			}

		▶️ FAILED [STATUS 401 UnAuthorized]
			{
				"message":  "Json Web Token Error",
				"errors":  [ {
					"name":  "JsonWebTokenError",
					"message":  "jwt malformed",
								OR
					"message":  "jwt must be provided"
				} ]
			}			

		▶️ FAILED [STATUS 500 INTERNAL SERVER ERROR]
			{
				"message": "Internal Server Error",
			}

### 6. [PATCH] /question/:id/downvotes
		▶️ HEADERS {
			token : jwt_token ,
		}
		▶️ PARAMS {
			id: questionId
		}
	
		▶️ SUCCESS [STATUS 200 OK!]
			{
				"message":  "berhasil menambahkan vote",
				"question":  {
					"answerId":  [],
					"tags":  [],
					"upvotes":  [],
					"downvotes":  [
						"5dfc2bf28bd8410d1acb0305"
					],
					"_id":  "5dfc37d9eaaf04121b7b083d",
					"title":  "nodejs",
					"description":  "ndejsjsjs",
					"userId":  "5dfc2bf28bd8410d1acb0305",
					"createdAt":  "2019-12-20T02:54:18.099Z",
					"updatedAt":  "2019-12-20T02:54:18.099Z"
				}
			}

		▶️ FAILED [STATUS 401 UnAuthorized]
			{
				"message":  "Json Web Token Error",
				"errors":  [ {
					"name":  "JsonWebTokenError",
					"message":  "jwt malformed",
								OR
					"message":  "jwt must be provided"
				} ]
			}			

		▶️ FAILED [STATUS 500 INTERNAL SERVER ERROR]
			{
				"message": "Internal Server Error",
			}

### 7. [DELETE] /question/:id
		▶️ HEADERS {
			token : jwt_token ,
		}
		
		▶️ PARAMS {
			id: questionId
		}
	
		▶️ SUCCESS [STATUS 200 OK!]
			{
				"question":  {
					"answerId":  [
						"5dfc43a3475a15191bfd74bc"
					],
					"tags":  [
						"javascript"
					],
					"upvotes":  [],
					"downvotes":  [],
					"_id":  "5dfc3c141eae8616b347d220",
					"title":  "nodejs",
					"description":  "ndejsjsjs",
					"userId":  "5dfc2bf28bd8410d1acb0305",
					"createdAt":  "2019-12-20T03:12:20.694Z",
					"updatedAt":  "2019-12-20T03:44:35.646Z"
				},
			"message":  "Delete Success"
			}

		▶️ FAILED [STATUS 401 UnAuthorized]
			{
				"message":  "Json Web Token Error",
				"errors":  [ {
					"name":  "JsonWebTokenError",
					"message":  "jwt malformed",
								OR
					"message":  "jwt must be provided"
				} ]
			}			

		▶️ FAILED [STATUS 500 INTERNAL SERVER ERROR]
			{
				"message": "Internal Server Error",
			}

## ANSWER ROUTE

### 1. [GET] /answer
		▶️ HEADERS {
			token : jwt_token ,
		}
	
		▶️ SUCCESS [STATUS 200 OK!]
			[
				{
				"upvotes":  [],
				"downvotes":  [],
				"_id":  "5dfb6058826be1765f2a6941",
				"description":  "adaw",
				"userId":  {
					"popular":  0,
					"image":  [
						"https://storage.googleapis.com/imagebucket-stunoverflow/1576738778913-profil_avatar.jpg"
					],
					"watchedTags":  [],
					"_id":  "5dfb1fdb001f90473016dc1c",
					"email":  "anggabanny123@gmail.com",
					"password":  "$2a$11$if7E15nIbup3dguUQz.1Ye.H4Ul9abIjOIxVbjNlz9uS37Iw1PPGi",
					"createdAt":  "2019-12-19T06:59:39.814Z",
					"updatedAt":  "2019-12-19T21:38:53.539Z"
				},
			"createdAt":  "2019-12-19T11:34:48.900Z",
			"updatedAt":  "2019-12-19T11:34:48.900Z"
			},
		]
	
		▶️ FAILED [STATUS 401 UnAuthorized]
			{
				"message":  "Json Web Token Error",
				"errors":  [ {
					"name":  "JsonWebTokenError",
					"message":  "jwt malformed",
								OR
					"message":  "jwt must be provided"
				} ]
			}			

		▶️ FAILED [STATUS 500 INTERNAL SERVER ERROR]
			{
				"message": "Internal Server Error",
			}


### 2. [GET] /answer/:id
		▶️ HEADERS {
			token : jwt_token ,
		}

		▶️ PARAMS {
			id: answerId
		}	
	
		▶️ SUCCESS [STATUS 200 OK!]
			[
				{
				"upvotes":  [],
				"downvotes":  [],
				"_id":  "5dfb6058826be1765f2a6941",
				"description":  "adaw",
				"userId":  {
					"popular":  0,
					"image":  [
						"https://storage.googleapis.com/imagebucket-stunoverflow/1576738778913-profil_avatar.jpg"
					],
					"watchedTags":  [],
					"_id":  "5dfb1fdb001f90473016dc1c",
					"email":  "anggabanny123@gmail.com",
					"password":  "$2a$11$if7E15nIbup3dguUQz.1Ye.H4Ul9abIjOIxVbjNlz9uS37Iw1PPGi",
					"createdAt":  "2019-12-19T06:59:39.814Z",
					"updatedAt":  "2019-12-19T21:38:53.539Z"
				},
			"createdAt":  "2019-12-19T11:34:48.900Z",
			"updatedAt":  "2019-12-19T11:34:48.900Z"
			},
		]
	
		▶️ FAILED [STATUS 401 UnAuthorized]
			{
				"message":  "Json Web Token Error",
				"errors":  [ {
					"name":  "JsonWebTokenError",
					"message":  "jwt malformed",
								OR
					"message":  "jwt must be provided"
				} ]
			}			

		▶️ FAILED [STATUS 500 INTERNAL SERVER ERROR]
			{
				"message": "Internal Server Error",
			}

### 3. [POST] /answer/:id
		▶️ HEADERS {
			token : jwt_token ,
		}
		
		▶️ PARAMS {
			id: questionId
		}

		▶️ BODY {
			description : STRING
		}	
	
		▶️ SUCCESS [STATUS 201 CREATED!]
			{
				"message":  "create answer success",
				"question":  {
					"answerId":  [
						"5dfc43a3475a15191bfd74bc"
					],
					"tags":  [],
					"upvotes":  [],
					"downvotes":  [],
					"_id":  "5dfc37d9eaaf04121b7b083d",
					"title":  "nodejs",
					"description":  "ndejsjsjs",
					"userId":  "5dfc2bf28bd8410d1acb0305",
					"createdAt":  "2019-12-20T02:54:18.099Z",
					"updatedAt":  "2019-12-20T02:54:18.099Z"
				}
			}
	
		▶️ FAILED [STATUS 400 BAD REQUEST]
			{
				"message":  "Validation Error",
				"errors":  [
					"title is required",
					"description is required"
				]
			}

		▶️ FAILED [STATUS 401 UnAuthorized]
			{
				"message":  "Json Web Token Error",
				"errors":  [ {
					"name":  "JsonWebTokenError",
					"message":  "jwt malformed",
								OR
					"message":  "jwt must be provided"
				} ]
			}			

		▶️ FAILED [STATUS 500 INTERNAL SERVER ERROR]
			{
				"message": "Internal Server Error",
			}

### 4. [PUT] /answer/:id/updated
		▶️ HEADERS {
			token : jwt_token ,
		}
		
		▶️ PARAMS {
			id: questionId
		}

		▶️ BODY {
			description : STRING
		}	
	
		▶️ SUCCESS [STATUS 200 OK!]
			{
				"message":  "updated answer success",
				"question":  {
					"upvotes":  [],
					"downvotes":  [],
					"_id":  "5dfc43a3475a15191bfd74bc",
					"description":  "ndejsjsjs",
					"userId":  "5dfc2bf28bd8410d1acb0305",
					"createdAt":  "2019-12-20T03:44:35.636Z",
					"updatedAt":  "2019-12-20T03:48:10.141Z"
				}
			}
	
		▶️ FAILED [STATUS 400 BAD REQUEST]
			{
				"message":  "Validation Error",
				"errors":  [
					"title is required",
					"description is required"
				]
			}

		▶️ FAILED [STATUS 401 UnAuthorized]
			{
				"message":  "Json Web Token Error",
				"errors":  [ {
					"name":  "JsonWebTokenError",
					"message":  "jwt malformed",
								OR
					"message":  "jwt must be provided"
				} ]
			}			

		▶️ FAILED [STATUS 500 INTERNAL SERVER ERROR]
			{
				"message": "Internal Server Error",
			}

### 5. [PATCH] /answer/:id/upvotes
		▶️ HEADERS {
			token : jwt_token ,
		}
		
		▶️ PARAMS {
			id: answerId
		}
	
		▶️ SUCCESS [STATUS 200 OK!]
			{
				"message":  "berhasil menambahkan vote",
				"finalResult":  {
					"upvotes":  [
						"5dfc2bf28bd8410d1acb0305"
					],
					"downvotes":  [],
					"_id":  "5dfc43a3475a15191bfd74bc",
					"description":  "ndejsjsjs",
					"userId":  "5dfc2bf28bd8410d1acb0305",
					"createdAt":  "2019-12-20T03:44:35.636Z",
					"updatedAt":  "2019-12-20T03:51:36.978Z"
				}
			}
			
		▶️ FAILED [STATUS 401 UnAuthorized]
			{
				"message":  "Json Web Token Error",
				"errors":  [ {
					"name":  "JsonWebTokenError",
					"message":  "jwt malformed",
								OR
					"message":  "jwt must be provided"
				} ]
			}			

		▶️ FAILED [STATUS 500 INTERNAL SERVER ERROR]
			{
				"message": "Internal Server Error",
			}

### 6. [PATCH] /answer/:id/downvotes
		▶️ HEADERS {
			token : jwt_token ,
		}
		
		▶️ PARAMS {
			id: answerId
		}
	
		▶️ SUCCESS [STATUS 200 OK!]
			{
				"message":  "berhasil menambahkan vote",
				"finalResult":  {
					"upvotes":  [],
					"downvotes":  [
						"5dfc2bf28bd8410d1acb0305"
					],
					"_id":  "5dfc43a3475a15191bfd74bc",
					"description":  "ndejsjsjs",
					"userId":  "5dfc2bf28bd8410d1acb0305",
					"createdAt":  "2019-12-20T03:44:35.636Z",
					"updatedAt":  "2019-12-20T03:51:36.978Z"
				}
			}
			
		▶️ FAILED [STATUS 401 UnAuthorized]
			{
				"message":  "Json Web Token Error",
				"errors":  [ {
					"name":  "JsonWebTokenError",
					"message":  "jwt malformed",
								OR
					"message":  "jwt must be provided"
				} ]
			}			

		▶️ FAILED [STATUS 500 INTERNAL SERVER ERROR]
			{
				"message": "Internal Server Error",
			}

### 7. [DELETE] /answer/:id
		▶️ HEADERS {
			token : jwt_token ,
		}
		
		▶️ PARAMS {
			id: answerId
		}
	
		▶️ SUCCESS [STATUS 200 OK!]
			{
				"message":  "Delete Success"
			}
			
		▶️ FAILED [STATUS 401 UnAuthorized]
			{
				"message":  "Json Web Token Error",
				"errors":  [ {
					"name":  "JsonWebTokenError",
					"message":  "jwt malformed",
								OR
					"message":  "jwt must be provided"
				} ]
			}			

		▶️ FAILED [STATUS 500 INTERNAL SERVER ERROR]
			{
				"message": "Internal Server Error",
			}


# information

## STATUS CODE

  

| CODE |STATUS | DESCRIPTION | SOLVE HERE
|-|-|-|-|
|<p  align="center"><i>**``200``**|SUCCESS|Ok|smile:)</i></p>
|<p  align="center"><i>**``201``**|SUCCESS|Created| smile:)</i></p>
|<p  align="center"><i>**``204``**|SUCCESS|No Content| smile:)</i></p>
|<p  align="center"><i>**``400``**|CLIENT ERROR|Bad Request| [Here!](https://stackoverflow.com/questions/19671317/400-bad-request-http-error-code-meaning) </i></p>
|<p  align="center"><i>**``401``**|CLIENT ERROR|UnAuthorized| [Here!](https://stackoverflow.com/questions/3297048/403-forbidden-vs-401-unauthorized-http-responses) </i></p>
|<p  align="center"><i>**``403``**|CLIENT ERROR|Forbidden| [Here!](https://stackoverflow.com/questions/3297048/403-forbidden-vs-401-unauthorized-http-responses) </i></p>
|<p  align="center"><i>**``404``**|CLIENT ERROR|Not Found|[Here!](https://stackoverflow.com/questions/25878787/how-can-i-solve-http-404-and-405-error-msgs) </i></p>
|<p  align="center"><i>**``405``**|CLIENT ERROR|Not Allowed|[Here!](https://stackoverflow.com/questions/25878787/how-can-i-solve-http-404-and-405-error-msgs) </i></p>
|<p  align="center"><i>**``409``**|CLIENT ERROR|Conflict| [Here!](https://stackoverflow.com/questions/45063805/distinguishing-http-status-code-403-and-409-in-practice-or-400) </i></p>
|<p  align="center"><i>**``500``**|SERVER ERROR|Internal Server Error| [Here!](https://stackoverflow.com/questions/1210380/500-internal-server-error) </i></p>


> silahkan kunjungi situs ini bila anda bingung apa itu [status code]([https://bertzzie.com/knowledge/serverside-nodejs/LampiranBHTTPStatusCode.html](https://bertzzie.com/knowledge/serverside-nodejs/LampiranBHTTPStatusCode.html))
<hr>

Created by [@anggabannny](https://github.com/anggabanny)