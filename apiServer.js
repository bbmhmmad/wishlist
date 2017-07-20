var express = require('express');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)


var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//APIS

var mongoose = require('mongoose');
//LOCALDB
// mongoose.connect('mongodb://localhost:27017/bookshop');
//MONGO DB
mongoose.connect('mongodb://bbmhmmad:blackandblue1435@ds129028.mlab.com:29028/redux_app')

var db = mongoose.connection;
// db.on('error',console.error.bind(console,'#MongoDB - connection error')) // optional for professionalism
//SET UP SESSIONS must be after mongodb connection

app.use(session({
	secret:'mySecretString',
	saveUninitialized:false,//record session only if user adds product to cart
	resave:false,//session wont be resaved if didnt change
	cookie:{maxAge: 1000 * 60 * 60 * 24 * 2},//two days in milliseconds
	store: new MongoStore({mongooseConnection: db,ttl:2 * 24 * 60 * 60})//time to leave 2 days 24 hours 60 minutes 60 seconds
}))
//SAVE SESSION CART API

app.post('/cart',function(req,res){
	var cart = req.body
	req.session.cart = cart
	req.session.save(function(err){
		if(err){
			console.log('POST TO CART ERROR',err)
		}
		res.json(req.session.cart)
	})
})

//GET SESSION CART API

app.get('/cart', function(req,res){
	if(typeof req.session.cart !==undefined){
		res.json(req.session.cart)
	}
})

//END SESSIONS


var Books = require('./models/books.js')

///POST BOOKS API
app.post('/books',function(req,res){
	var book = req.body;

	Books.create(book,function(err,books){
		if(err){
			console.log('POST TO Books',err)
		}
		res.json(books)
	})
}); 

//GET BOOKS

app.get('/books',function(req,res){
	Books.find(function(err,books){
		if(err){
			console.log('Get Books Error',err)
		}
		res.json(books)
	})
})

//DELETE BOOKS
app.delete('/books/:_id',function(req,res){
	var query = {_id:req.params._id};

	Books.remove(query,function(err,books){
		if (err){
			console.log('Delete from Cart error',err)
		}
		res.json(books)
	})
})

//UpdateBooks(Not used in app) - uses put request
//check EB

//GET BOOKS IMAGES API
app.get('/images',function(req,res){
	const imgFolder = __dirname + '/public/images/'
	//REQUIRE FILE SYSTEM
	const fs = require('fs')
	//READ ALL FILES IN DIRECTORY
	fs.readdir(imgFolder,function(err,files){
		if(err){
			return console.error(err)
		}
		//CREATE EMPYT ARRAY
		const filesArr = []
		//Iterate all images in directory and add to the array
		files.forEach(function(file){
			filesArr.push({name:file})
		})
		//SEND JSON RESPONSE WITH THE ARRAY
		res.json(filesArr)
	})
})


//END APIS

app.listen(3001,function(err){
	if(err){
		return console.log('API SERVER ERROR', err)
	}
	console.log('API Server is listening on http://localhost:3001')
})