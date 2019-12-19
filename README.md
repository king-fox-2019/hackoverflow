# hackoverflow

## Installation Package

```
$ npm install
```
# Routes

## Register

```
POST : http://localhost:3002/user/
```

Body
```
/**
 * @email String *required
 * @username String *required
 * @password String *required
 */
```
Response
```
/**
 * @success status(201) data(access_token, username)
 * @error   status(error code) data(error)
 */
```
------------------------------------------------
## Login

```
POST : http://localhost:3002/user/login
```

Body
```
/**
 * @email String *required
 * @password String *required
 */
```
Response
```
/**
 * @success status(201) data(access_token, username)
 * @error   status(error code) data(error)
 */
```
------------------------------------------------
## Get User Watch Tags

```
GET : http://localhost:3002/user/
```
Headers
```
/**
 * @access_token token *required
 */
```
Response
```
/**
 * @success status(200) data(list of tags)
 * @error   status(error code) data(error)
 */
```
------------------------------------------------
## Add new watch tags

```
PUT : http://localhost:3002/user/
```

Headers
```
/**
 * @access_toke  token *required
 */
```
Response
```
/**
 * @success status(201) data(tags)
 * @error   status(error code) data(error)
 */
```
------------------------------------------------
## Get all Question

```
GET : http://localhost:3002/question/
```

Response
```
/**
 * @success status(200) data(questions)
 * @error   status(error code) data(error)
 */
```
------------------------------------------------
## Get user Question

```
GET : http://localhost:3002/question/user
```

Headers
```
/**
 * @access_toke  token *required
 */
```
Response
```
/**
 * @success status(200) data(questions)
 * @error   status(error code) data(error)
 */
```
------------------------------------------------
## Get one Question

```
GET : http://localhost:3002/question/:id
```

Headers
```
/**
 * @access_toke  token *required
 */
```
Response
```
/**
 * @success status(200) data(question)
 * @error   status(error code) data(error)
 */
```
------------------------------------------------
## Add new Question

```
POST : http://localhost:3002/question/
```
Body
```
/**
 * @title  strign *required
 * @description  string *required
 * @tags  array of string *required
 */
```
Headers
```
/**
 * @access_toke  token *required
 */
```
Response
```
/**
 * @success status(201) data(question)
 * @error   status(error code) data(error)
 */
```
------------------------------------------------
## Upvote on Question

```
PATCH : http://localhost:3002/question/upvotes/:id
```

Headers
```
/**
 * @access_toke  token *required
 */
```
Response
```
/**
 * @success status(201) data(question)
 * @error   status(error code) data(error)
 */
```
------------------------------------------------
## Downvote on Question

```
PATCH : http://localhost:3002/question/downvotes/:id
```

Headers
```
/**
 * @access_toke  token *required
 */
```
Response
```
/**
 * @success status(201) data(question)
 * @error   status(error code) data(error)
 */
```
------------------------------------------------
## Edit Question

```
PUT : http://localhost:3002/question/:id
```

Body
```
/**
 * @title  strign *required
 * @description  string *required
 */
```

Headers
```
/**
 * @access_toke  token *required
 */
```
Response
```
/**
 * @success status(201) data(question)
 * @error   status(error code) data(error)
 */
```
------------------------------------------------
## Delete Question

```
DELETE : http://localhost:3002/question/:id
```

Headers
```
/**
 * @access_toke  token *required
 */
```
Response
```
/**
 * @success status(201) data(question)
 * @error   status(error code) data(error)
 */
```
------------------------------------------------
## get Question's Answer

```
GET : http://localhost:3002/answer/:questionId
```

Headers
```
/**
 * @access_toke  token *required
 */
```
Response
```
/**
 * @success status(201) data(answers)
 * @error   status(error code) data(error)
 */
```
------------------------------------------------
## Add answer

```
POST : http://localhost:3002/answer/
```
Data
```
/**
 * @question idQuestion *required
 * @description String *required
 */
```

Headers
```
/**
 * @access_toke  token *required
 */
```
Response
```
/**
 * @success status(201) data(answers)
 * @error   status(error code) data(error)
 */
```
------------------------------------------------
## Add comment to answer

```
PATCH : http://localhost:3002/answer/:answerId
```
Data
```
/**
 * @comment string *required
 */
```

Headers
```
/**
 * @access_toke  token *required
 */
```
Response
```
/**
 * @success status(200) data(answer)
 * @error   status(error code) data(error)
 */
```
------------------------------------------------
## Delete answer

```
DELETE : http://localhost:3002/answer/:answerId
```
Headers
```
/**
 * @access_toke  token *required
 */
```
Response
```
/**
 * @success status(200) data(answer)
 * @error   status(error code) data(error)
 */
```
------------------------------------------------
## Edit answer

```
PUT : http://localhost:3002/answer/:answerId
```
Data
```
/**
 * @description string *required
 */
```

Headers
```
/**
 * @access_token token *required
 */
```
Response
```
/**
 * @success status(200) data(answer)
 * @error   status(error code) data(error)
 */
```
------------------------------------------------
## Upvote on Answer

```
PATCH : http://localhost:3002/answer/upvotes/:id
```

Headers
```
/**
 * @access_token token *required
 */
```
Response
```
/**
 * @success status(201) data(answer)
 * @error   status(error code) data(error)
 */
```
------------------------------------------------
## Downvote on Answer

```
PATCH : http://localhost:3002/answer/downvotes/:id
```

Headers
```
/**
 * @access_toke  token *required
 */
```
Response
```
/**
 * @success status(201) data(answer)
 * @error   status(error code) data(error)
 */
```
------------------------------------------------