if(process.env.NODE_ENV) {
    require('dotenv').config()
}

const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;
const schedule = require('./helpers/cronjob.js');
const routes = require('./routes/index.js');
const errorHandler = require('./middlewares/errorHandler.js');

mongoose.connect(process.env.MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false
})
	.then(() => {
	    console.log('mongoose connected')
	})
	.catch(() => {
	    console.log('mongoose fail to connect');
	})

//schedule();

app.use(cors());
app.use(express.urlencoded({ extended:false }));
app.use(express.json());

app.use('/', routes);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`listening to port ${port}`)
})


