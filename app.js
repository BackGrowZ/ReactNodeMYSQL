import express from "express"
import cors from "cors"
import bodyParser from 'body-parser'
import router from './router/router.js';
import session from 'express-session';
import {middleware} from './controllers/verifyToken.js'

const app = express();

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

//initialisation du système de sessions
app.use(session({
	secret: 'keyboard cat',
	resave:false,
	saveUninitialized: true,
	cookie: {maxAge: 3600000}
}))

app.use(middleware)

app.use('/', router)

const PORT = process.env.PORT || 9300;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
