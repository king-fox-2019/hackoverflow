# hackoverflow

models
  thread
    title
    content
    created_at
    updated_at
    response-> array ref to answers
    point
  response
    owner -> single ref to users
    content
    created_at
    updated_at
    point
  users
    register
    login
    logout

views
  questionList (homepage)
  singleQuestion
    answers

features
  form create new question
  form answer question
  delete question
  edit question

  upvote question
  downvote question
  total vote per question
  
  upvote answer
  downvote answer
  total vote per answer
  