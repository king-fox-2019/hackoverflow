'use strict';

const express = require('express');
const app = express();

app.get('/', (req, res, next) => {
    res.send('Server ready');
})

app.listen(80, () =>{
    console.log(
        `listening on PORT 80`
    );
})