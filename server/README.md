**User Register**

* **Method:**
    `POST` 

* **URL**
    <_/users/register_>

* **Data Params** <br />
    **Required:**
    
    `email=[string]` <br />
    `password=[string]` <br />
    `chosenTags=[string]` <br />

* **Success Response:**
    * **Code:** 201 <br />
        **Content:** 
        ```json
            {
			    "chosenTags": [
			        "javascript"
			    ],
			    "_id": "5dfb20f1ef4caa6dc3f0fe78",
			    "email": "hengki2@gmail.com",
			    "password": "$2a$10$Eu08doCgyqh6cq.8l3dVE.6Kd325ypF68mXEakgQCY3p.QSckAZ66",
			    "__v": 0
			}
        ```

* **Error Response:**
    **Content:** <br />
    `{
        "message": [
            "User validation failed: Email is already registered"
        ]
    }` <br />
    `{
        "message": [
            "User validation failed: Invalid email format"
        ]
    }` <br />
    `{
        "message": [
            "User validation failed: Password cannot be empty"
        ]
    }` <br />
    `{
        "message": [
            "User validation failed: Minimum password length is 6"
        ]
    }` <br />

**User Login**

* **Method:**
    `POST` 

* **URL**
    <_/users/login_>

* **Data Params** <br />
    **Required:**
    
    `email=[string]` <br />
    `password=[string]` <br />

* **Success Response:**
    * **Code:** 200 <br />
        **Content:** 
        ```json
            {
			    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZmIyMGYxZWY0Y2FhNmRjM2YwZmU3OCIsImVtYWlsIjoiaGVuZ2tpMkBnbWFpbC5jb20iLCJpYXQiOjE1NzY3Mzk1MDV9.1exA0i8EdUpvyybLDRnktHIfQ8qCvXtmvqDgzII0D2Q",
			    "email": "hengki2@gmail.com",
			    "_id": "5dfb20f1ef4caa6dc3f0fe78"
			}
        ```

* **Error Response:**
    **Content:** <br />
    `{
	    "msg": "Email Not Found"
	}` <br />
	`{
	    "msg": "Invalid password/Email"
	}` <br />

**Questions Route**

* **Method:**
    `POST` 

* **URL**
    <_/questions_>

* **Data Params** <br />
    **Required:**

    `token=[string]` <br />
    `title=[string]` <br />
    `description=[string]` <br />

* **Success Response:**
    * **Code:** 201 <br />
        **Content:** 
        ```json
           {
			    "createdAt": "2019-12-19T06:08:50.816Z",
			    "upVotes": [],
			    "downVotes": [],
			    "tags": [],
			    "_id": "5dfb23e4ef4caa6dc3f0fe7a",
			    "title": "Title 1",
			    "description": "Ini Content untuk title 1",
			    "userId": "5dfb20f1ef4caa6dc3f0fe78",
			    "__v": 0
			}
        ```

* **Error Response:**
    **Content:** <br />
    `{
	    "message": "Question validation failed: title: Title is required"
	}` <br />
	`{
	    "message": "Question validation failed: description: Description is required"
	}` <br />
	`{
	    "message": "You are not logged in"
	}` <br />

* **Method:**
    `GET` 

* **URL**
    <_/questions_>

* **Data Params** <br />
    **Required:**

    `token=[string]` <br />

* **Success Response:**
    * **Code:** 200 <br />
        **Content:** 
        ```json
           [
		    {
		        "createdAt": "2019-12-19T05:21:30.143Z",
		        "upVotes": [],
		        "downVotes": [],
		        "tags": [
		            "front-end"
		        ],
		        "_id": "5dfb0a1e41a13d5d66248f81",
		        "title": "Why is Bootstrap 4 carousel pause function not working when it's getting called from the event of an element inside of the carousel?",
		        "description": "<p>So I was trying to wrap my head around this issue, and I asked the question yesterday:<a href=\"https://stackoverflow.com/questions/59384121/carouselpause-isnt-working-on-mobile-devices?noredirect=1#comment104960521_59384121\">Carousel('pause') isn't working on mobile devices</a></p><p>I found the symptom so I'm asking a new question with a new focus.</p><p>The question title is not telling everything, because it would be too large: This is only happening on phones, using mobile browsers, <strong>On desktop is totally fine</strong>.</p><p>Basically, if you have a Bootstrap 4 carousel, and you have any element that is inside of the div with the id of the carousel and you want to attach an event on that element (like a click) to pause the carousel, it wont work AT ALL, the slider keeps cycling.</p><p>I've tried click, mousedown, mouseup, I've tried setting the selector's click event on body, tried calling a click event on a selector that is outside to pause it, used parents, etc, and it wouldn't work.</p><p>Created a button that is right outside the carousel, attached a click event to it and it works. I'm using the latest BS (4.4.1)</p><p>This is my code:</p><p>Blade file:</p>",
		        "userId": {
		            "chosenTags": [
		                "javascript"
		            ],
		            "_id": "5dfb094641a13d5d66248f80",
		            "email": "hengki.idn@gmail.com",
		            "password": "$2a$10$8aThPXWmqNdRLUd0FLqUV.pqHsxmZBdBMmwu9yrqO53iWvXLY9DF.",
		            "__v": 0
		        },
		        "__v": 0
		    },
		    {
		        "createdAt": "2019-12-19T06:08:50.816Z",
		        "upVotes": [],
		        "downVotes": [],
		        "tags": [],
		        "_id": "5dfb23e4ef4caa6dc3f0fe7a",
		        "title": "Title 1",
		        "description": "Ini Content untuk title 1",
		        "userId": {
		            "chosenTags": [
		                "javascript"
		            ],
		            "_id": "5dfb20f1ef4caa6dc3f0fe78",
		            "email": "hengki2@gmail.com",
		            "password": "$2a$10$Eu08doCgyqh6cq.8l3dVE.6Kd325ypF68mXEakgQCY3p.QSckAZ66",
		            "__v": 0
		        },
		        "__v": 0
		    }
		]
        ```

* **Method:**
    `GET` 

* **URL**
    <_/questions/user/:userid_>

* **Data Params** <br />
    **Required:**

    `token=[string]` <br />
    `userid=[string]` <br />

* **Success Response:**
    * **Code:** 200 <br />
        **Content:** 
        ```json
           [
		    {
		        "createdAt": "2019-12-19T05:21:30.143Z",
		        "upVotes": [],
		        "downVotes": [],
		        "tags": [
		            "front-end"
		        ],
		        "_id": "5dfb0a1e41a13d5d66248f81",
		        "title": "Why is Bootstrap 4 carousel pause function not working when it's getting called from the event of an element inside of the carousel?",
		        "description": "<p>So I was trying to wrap my head around this issue, and I asked the question yesterday:<a href=\"https://stackoverflow.com/questions/59384121/carouselpause-isnt-working-on-mobile-devices?noredirect=1#comment104960521_59384121\">Carousel('pause') isn't working on mobile devices</a></p><p>I found the symptom so I'm asking a new question with a new focus.</p><p>The question title is not telling everything, because it would be too large: This is only happening on phones, using mobile browsers, <strong>On desktop is totally fine</strong>.</p><p>Basically, if you have a Bootstrap 4 carousel, and you have any element that is inside of the div with the id of the carousel and you want to attach an event on that element (like a click) to pause the carousel, it wont work AT ALL, the slider keeps cycling.</p><p>I've tried click, mousedown, mouseup, I've tried setting the selector's click event on body, tried calling a click event on a selector that is outside to pause it, used parents, etc, and it wouldn't work.</p><p>Created a button that is right outside the carousel, attached a click event to it and it works. I'm using the latest BS (4.4.1)</p><p>This is my code:</p><p>Blade file:</p>",
		        "userId": {
		            "chosenTags": [
		                "javascript"
		            ],
		            "_id": "5dfb094641a13d5d66248f80",
		            "email": "hengki.idn@gmail.com",
		            "password": "$2a$10$8aThPXWmqNdRLUd0FLqUV.pqHsxmZBdBMmwu9yrqO53iWvXLY9DF.",
		            "__v": 0
		        },
		        "__v": 0
		    }
		]
        ```
* **Error Response:**
    **Content:** <br />
    `{
	    "message": "Cast to ObjectId failed for value \"user\" at path \"_id\" for model \"Question\""
	}` <br />

* **Method:**
    `GET` 

* **URL**
    <_/questions/:questionid_>

* **Data Params** <br />
    **Required:**

    `token=[string]` <br />
    `questionid=[string]` <br />

* **Success Response:**
    * **Code:** 200 <br />
        **Content:** 
        ```json
		   {
		        "createdAt": "2019-12-19T05:21:30.143Z",
		        "upVotes": [],
		        "downVotes": [],
		        "tags": [
		            "front-end"
		        ],
		        "_id": "5dfb0a1e41a13d5d66248f81",
		        "title": "Why is Bootstrap 4 carousel pause function not working when it's getting called from the event of an element inside of the carousel?",
		        "description": "<p>So I was trying to wrap my head around this issue, and I asked the question yesterday:<a href=\"https://stackoverflow.com/questions/59384121/carouselpause-isnt-working-on-mobile-devices?noredirect=1#comment104960521_59384121\">Carousel('pause') isn't working on mobile devices</a></p><p>I found the symptom so I'm asking a new question with a new focus.</p><p>The question title is not telling everything, because it would be too large: This is only happening on phones, using mobile browsers, <strong>On desktop is totally fine</strong>.</p><p>Basically, if you have a Bootstrap 4 carousel, and you have any element that is inside of the div with the id of the carousel and you want to attach an event on that element (like a click) to pause the carousel, it wont work AT ALL, the slider keeps cycling.</p><p>I've tried click, mousedown, mouseup, I've tried setting the selector's click event on body, tried calling a click event on a selector that is outside to pause it, used parents, etc, and it wouldn't work.</p><p>Created a button that is right outside the carousel, attached a click event to it and it works. I'm using the latest BS (4.4.1)</p><p>This is my code:</p><p>Blade file:</p>",
		        "userId": {
		            "chosenTags": [
		                "javascript"
		            ],
		            "_id": "5dfb094641a13d5d66248f80",
		            "email": "hengki.idn@gmail.com",
		            "password": "$2a$10$8aThPXWmqNdRLUd0FLqUV.pqHsxmZBdBMmwu9yrqO53iWvXLY9DF.",
		            "__v": 0
		        },
		        "__v": 0
		    }
        ```
* **Error Response:**
    **Content:** <br />
    `{
	    "message": "Cast to ObjectId failed for value \"5dfb0a1e41a13d5d66248f8\" at path \"_id\" for model \"Question\""
	}` <br />

* **Method:**
    `POST` 

* **URL**
    <_/questions/tag_>

* **Data Params** <br />
    **Required:**

    `token=[string]` <br />
    `tag=[string]` <br />

* **Success Response:**
    * **Code:** 200 <br />
        **Content:** 
        ```json
		[
		    {
		        "createdAt": "2019-12-19T05:21:30.143Z",
		        "upVotes": [],
		        "downVotes": [],
		        "tags": [
		            "front-end"
		        ],
		        "_id": "5dfb0a1e41a13d5d66248f81",
		        "title": "Why is Bootstrap 4 carousel pause function not working when it's getting called from the event of an element inside of the carousel?",
		        "description": "<p>So I was trying to wrap my head around this issue, and I asked the question yesterday:<a href=\"https://stackoverflow.com/questions/59384121/carouselpause-isnt-working-on-mobile-devices?noredirect=1#comment104960521_59384121\">Carousel('pause') isn't working on mobile devices</a></p><p>I found the symptom so I'm asking a new question with a new focus.</p><p>The question title is not telling everything, because it would be too large: This is only happening on phones, using mobile browsers, <strong>On desktop is totally fine</strong>.</p><p>Basically, if you have a Bootstrap 4 carousel, and you have any element that is inside of the div with the id of the carousel and you want to attach an event on that element (like a click) to pause the carousel, it wont work AT ALL, the slider keeps cycling.</p><p>I've tried click, mousedown, mouseup, I've tried setting the selector's click event on body, tried calling a click event on a selector that is outside to pause it, used parents, etc, and it wouldn't work.</p><p>Created a button that is right outside the carousel, attached a click event to it and it works. I'm using the latest BS (4.4.1)</p><p>This is my code:</p><p>Blade file:</p>",
		        "userId": {
		            "chosenTags": [
		                "javascript"
		            ],
		            "_id": "5dfb094641a13d5d66248f80",
		            "email": "hengki.idn@gmail.com",
		            "password": "$2a$10$8aThPXWmqNdRLUd0FLqUV.pqHsxmZBdBMmwu9yrqO53iWvXLY9DF.",
		            "__v": 0
		        },
		        "__v": 0
		    }
		]
        ```
* **Method:**
    `DELETE` 

* **URL**
    <_/questions/delete/:questionId_>

* **Data Params** <br />
    **Required:**

    `token=[string]` <br />
    `questionId=[string]` <br />

* **Success Response:**
    * **Code:** 200 <br />
        **Content:** 
        ```json
		    {
		        "createdAt": "2019-12-19T05:21:30.143Z",
		        "upVotes": [],
		        "downVotes": [],
		        "tags": [
		            "front-end"
		        ],
		        "_id": "5dfb0a1e41a13d5d66248f81",
		        "title": "Why is Bootstrap 4 carousel pause function not working when it's getting called from the event of an element inside of the carousel?",
		        "description": "<p>So I was trying to wrap my head around this issue, and I asked the question yesterday:<a href=\"https://stackoverflow.com/questions/59384121/carouselpause-isnt-working-on-mobile-devices?noredirect=1#comment104960521_59384121\">Carousel('pause') isn't working on mobile devices</a></p><p>I found the symptom so I'm asking a new question with a new focus.</p><p>The question title is not telling everything, because it would be too large: This is only happening on phones, using mobile browsers, <strong>On desktop is totally fine</strong>.</p><p>Basically, if you have a Bootstrap 4 carousel, and you have any element that is inside of the div with the id of the carousel and you want to attach an event on that element (like a click) to pause the carousel, it wont work AT ALL, the slider keeps cycling.</p><p>I've tried click, mousedown, mouseup, I've tried setting the selector's click event on body, tried calling a click event on a selector that is outside to pause it, used parents, etc, and it wouldn't work.</p><p>Created a button that is right outside the carousel, attached a click event to it and it works. I'm using the latest BS (4.4.1)</p><p>This is my code:</p><p>Blade file:</p>",
		        "userId": {
		            "chosenTags": [
		                "javascript"
		            ],
		            "_id": "5dfb094641a13d5d66248f80",
		            "email": "hengki.idn@gmail.com",
		            "password": "$2a$10$8aThPXWmqNdRLUd0FLqUV.pqHsxmZBdBMmwu9yrqO53iWvXLY9DF.",
		            "__v": 0
		        },
		        "__v": 0
		    }
        ```
* **Error Response:**
    **Content:** <br />
    `{
	    "message": "Cast to ObjectId failed for value \"5dfb0a1e41a13d5d66248f8\" at path \"_id\" for model \"Question\""
	}` <br />

* **Method:**
    `POST` 

* **URL**
    <_/answers_>

* **Data Params** <br />
    **Required:**

    `token=[string]` <br />
    `description=[string]` <br />
    `questionId=[string]` <br />

* **Success Response:**
    * **Code:** 201 <br />
        **Content:** 
        ```json
		    {
			    "createdAt": "2019-12-19T07:42:02.941Z",
			    "upVotes": [],
			    "downVotes": [],
			    "_id": "5dfb2b220f3f090f134bb648",
			    "description": "test jawab untuk question title",
			    "questionId": "5dfb23e4ef4caa6dc3f0fe7a",
			    "userId": "5dfb094641a13d5d66248f80",
			    "__v": 0
			}
        ```
* **Error Response:**
    **Content:** <br />
    `{
	    "message": "Cast to ObjectId failed for value \"5dfb0a1e41a13d5d66248f8\" at path \"_id\" for model \"Question\""
	}` <br />
	`{
	    "message": "You are not logged in"
	}` <br />
	`{
	    "message": "Answer validation failed: description: Description is required"
	}` <br />

* **Method:**
    `GET` 

* **URL**
    <_/answers/:answerId_>

* **Data Params** <br />
    **Required:**

    `token=[string]` <br />
    `answerId=[string]` <br />

* **Success Response:**
    * **Code:** 200 <br />
        **Content:** 
        ```json
		    {
			    "createdAt": "2019-12-19T07:42:02.941Z",
			    "upVotes": [],
			    "downVotes": [],
			    "_id": "5dfb2b220f3f090f134bb648",
			    "description": "test jawab untuk question title",
			    "questionId": "5dfb23e4ef4caa6dc3f0fe7a",
			    "userId": "5dfb094641a13d5d66248f80",
			    "__v": 0
			}
        ```
* **Error Response:**
    **Content:** <br />
    `{
	    "message": "Cast to ObjectId failed for value \"5dfb0a1e41a13d5d66248f8\" at path \"_id\" for model \"Question\""
	}` <br />

* **Method:**
    `PATCH` 

* **URL**
    <_/answers/:answerId_>

* **Data Params** <br />
    **Required:**

    `token=[string]` <br />
    `description=[string]` <br />
    `answerId=[string]` <br />

* **Success Response:**
    * **Code:** 201 <br />
        **Content:** 
        ```json
		{
		    "createdAt": "2019-12-19T07:56:11.705Z",
		    "upVotes": [],
		    "downVotes": [],
		    "_id": "5dfb2daa86335c12cc1d935b",
		    "description": "edit jawaban success",
		    "questionId": "5dfb23e4ef4caa6dc3f0fe7a",
		    "userId": "5dfb094641a13d5d66248f80",
		    "__v": 0
		}
        ```
* **Error Response:**
    **Content:** <br />
    `{
	    "message": "You are not logged in"
	}` <br />
	`{
	    "message": "Invalid token"
	}` <br />

* **Method:**
    `PATCH` 

* **URL**
    <_/answers/upvote/:answerId_>

* **Data Params** <br />
    **Required:**

    `token=[string]` <br />
    `answerId=[string]` <br />

* **Success Response:**
    * **Code:** 201 <br />
        **Content:** 
        ```json
		{
		    "createdAt": "2019-12-19T07:56:11.705Z",
		    "upVotes": [
		        "5dfb094641a13d5d66248f80"
		    ],
		    "downVotes": [],
		    "_id": "5dfb2daa86335c12cc1d935b",
		    "description": "edit jawaban success",
		    "questionId": "5dfb23e4ef4caa6dc3f0fe7a",
		    "userId": "5dfb094641a13d5d66248f80",
		    "__v": 0
		}
        ```
* **Error Response:**
    **Content:** <br />
    `{
	    "message": "You are not logged in"
	}` <br />
	`{
	    "message": "Invalid token"
	}` <br />


* **Method:**
    `PATCH` 

* **URL**
    <_/answers/downvote/:answerId_>

* **Data Params** <br />
    **Required:**

    `token=[string]` <br />
    `answerId=[string]` <br />

* **Success Response:**
    * **Code:** 201 <br />
        **Content:** 
        ```json
		{
		    "createdAt": "2019-12-19T07:56:11.705Z",
		    "upVotes": [],
		    "downVotes": [
		    	"5dfb094641a13d5d66248f80"
		    ],
		    "_id": "5dfb2daa86335c12cc1d935b",
		    "description": "edit jawaban success",
		    "questionId": "5dfb23e4ef4caa6dc3f0fe7a",
		    "userId": "5dfb094641a13d5d66248f80",
		    "__v": 0
		}
        ```
* **Error Response:**
    **Content:** <br />
    `{
	    "message": "You are not logged in"
	}` <br />
	`{
	    "message": "Invalid token"
	}` <br />

* **Method:**
    `DELETE` 

* **URL**
    <_/answers/delete/:answerId_>

* **Data Params** <br />
    **Required:**

    `token=[string]` <br />
    `answerId=[string]` <br />

* **Success Response:**
    * **Code:** 200 <br />
        **Content:** 
        ```json
		{
		    "createdAt": "2019-12-19T07:56:11.705Z",
		    "upVotes": [],
		    "downVotes": [
		    	"5dfb094641a13d5d66248f80"
		    ],
		    "_id": "5dfb2daa86335c12cc1d935b",
		    "description": "edit jawaban success",
		    "questionId": "5dfb23e4ef4caa6dc3f0fe7a",
		    "userId": "5dfb094641a13d5d66248f80",
		    "__v": 0
		}
        ```
* **Error Response:**
    **Content:** <br />
    `{}` <br />
	`{
	    "message": "Invalid token"
	}` <br />

* **Method:**
    `PATCH` 

* **URL**
    <_/questions/upvote/:questionId_>

* **Data Params** <br />
    **Required:**

    `token=[string]` <br />
    `questionId=[string]` <br />

* **Success Response:**
    * **Code:** 201 <br />
        **Content:** 
        ```json
		{
		    "createdAt": "2019-12-19T06:08:50.816Z",
		    "upVotes": [
		        "5dfb094641a13d5d66248f80"
		    ],
		    "downVotes": [],
		    "tags": [],
		    "_id": "5dfb23e4ef4caa6dc3f0fe7a",
		    "title": "Title 1",
		    "description": "Ini Content untuk title 1",
		    "userId": "5dfb20f1ef4caa6dc3f0fe78",
		    "__v": 0
		}
        ```
* **Error Response:**
    **Content:** <br />
    `{
	    "message": "You are not logged in"
	}` <br />
	`{
	    "message": "Invalid token"
	}` <br />

* **Method:**
    `PATCH` 

* **URL**
    <_/questions/downvote/:questionId_>

* **Data Params** <br />
    **Required:**

    `token=[string]` <br />
    `questionId=[string]` <br />

* **Success Response:**
    * **Code:** 201 <br />
        **Content:** 
        ```json
		{
		    "createdAt": "2019-12-19T06:08:50.816Z",
		    "upVotes": [],
		    "downVotes": [
		    	"5dfb094641a13d5d66248f80"
		    ],
		    "tags": [],
		    "_id": "5dfb23e4ef4caa6dc3f0fe7a",
		    "title": "Title 1",
		    "description": "Ini Content untuk title 1",
		    "userId": "5dfb20f1ef4caa6dc3f0fe78",
		    "__v": 0
		}
        ```
* **Error Response:**
    **Content:** <br />
    `{
	    "message": "You are not logged in"
	}` <br />
	`{
	    "message": "Invalid token"
	}` <br />

* **Method:**
    `PATCH` 

* **URL**
    <_/questions/edit/:questionId_>

* **Data Params** <br />
    **Required:**

    `token=[string]` <br />
    `description=[string]` <br />
    `questionId=[string]` <br />

* **Success Response:**
    * **Code:** 201 <br />
        **Content:** 
        ```json
		{
		    "createdAt": "2019-12-19T06:08:50.816Z",
		    "upVotes": [
		        "5dfb094641a13d5d66248f80"
		    ],
		    "downVotes": [],
		    "tags": [],
		    "_id": "5dfb23e4ef4caa6dc3f0fe7a",
		    "title": "Title 1",
		    "description": "Ini Content untuk title 1 (edited)",
		    "userId": "5dfb20f1ef4caa6dc3f0fe78",
		    "__v": 0
		}
        ```
* **Error Response:**
    **Content:** <br />
    `{
	    "errors": {
        	"message": "You dont have access for modify this question"
    	}
	}` <br />

