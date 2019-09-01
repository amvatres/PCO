//----------------------------------------------------------------------------------
//Dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config'); // Get configurations


//----------------------------------------------------------------------------------
//Models
var User = require('./app/models/user'); // Mongoose users model

//----------------------------------------------------------------------------------
const port = process.env.PORT || 1234;
mongoose.connect(config.database); // Connect to db
//----------------------------------------------------------------------------------
//Uses
app.set('superSecret', config.secret); // secret variable
app.use(express.static(__dirname + '/app')); // client side
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());




//----------------------------------------------------------------------------------
//Routes
app.get('/', function (req, res) {
	res.sendFile('index.html');
});

//----------------------------------------------------------------------------------
//Get an instance of the router for api routes
var apiRoutes = express.Router();

//----------------------------------------------------------------------------------
//Authentication - No Middleware needed
apiRoutes.post('/authenticate', function(req, res){
	var username = req.body.username;
	var enteredPassword = req.body.password;

	User.findOne({username:username}, function(err, users){
		if(err){
			res.send("Request error");
		}
		if(users){
		bcrypt.compare(enteredPassword, users.password, function(err, resp) {
			if(resp===true){
				const payload = {
					/* _id: users.id, */
					username: users.username,
					firstname: users.firstname,
					lastname: users.lastname,
					admin: users.admin
				};

				
				var token = jwt.sign(payload, app.get('superSecret'), {
					expiresIn : 60*60*24 //24 hours valid token
				});
				res.setHeader("x-access-token", token);
				res.send({
					success: true,
					message: 'Successfully Logged in!',
					admin:payload.admin,
          			token: token
				});

				
			}else{
				res.send({
					success: false,
					message: "Wrong password"
				})
			}
		});
		}else{
			res.send({
				user: false
			})
		}
	});
});

//Create new user
apiRoutes.post('/users', function(req, res){
	var username = req.body.username;
	var firstname = req.body.firstname;
	var lastname = req.body.lastname;
	var email = req.body.email;
	var phoneNumber = req.body.phoneNumber;
	var country = req.body.country;
	var company = req.body.company;
	var position = req.body.position;
	var imageUrl = req.body.imageUrl;

	var admin = false;
	if(req.body.role == "Admin"){
		admin = true;
	}

  
	  bcrypt.hash(req.body.password, 10, function(err, hash) {
		  var user = new User({username: username, password: hash, firstname: firstname, lastname: lastname, email:email, phoneNumber: phoneNumber, country:country, company:company, position:position, imageUrl:imageUrl, admin: admin});
		  User.create(user, function(err, users){
			  if(err)
				  res.send(err);
			  res.json(users);
		  });
	  });
  });

  

  
//----------------------------------------------------------------------------------
//MIDDLEWARE FUNCTION
apiRoutes.use(function(req, res, next){

	//Check header/URL/POST parameters for token
	var token = req.body.token || req.params.token || req.headers['x-access-token'];

	//Decode token
	if(token){
		// Verifies secret and checks exp
		jwt.verify(token, app.get('superSecret'), function(err, decoded){			
			if(err){
				return res.json({ success: false, message: 'Failed to authenticate token.' });		
			}else{
				// If everything is good, save to request for use in other routes
				req.decoded = decoded;
				//console.log(decoded);	
				next();
			}
		});
	}else{
		// If there is no token
		// Return an error
		return res.status(403).send({ 
			success: false, 
			message: 'No token provided.'
		});
	}
});

//----------------------------------------------------------------------------------
//Authenticated routes


//Get all users
apiRoutes.get('/users', function(req, res){
	User.find(function(err, users){
	  if(err)
		res.send(err);
	  res.json(users);
	})
  });
  
  //Get user by id
  apiRoutes.get('/users/:id', function(req, res){
	  User.findOne({_id:req.params.id}, function(err, users){
		  if(err)
			  res.send(err);
		  res.json(users);
	  });
  });
  
  //Remove selected user
  apiRoutes.delete('/users/:id', function(req, res){
	  User.findOneAndRemove({_id:req.params.id}, function(err, users){
		  if(err)
			  res.send(err);
		  res.json(users);
	  });
  });
  
  //Update selected user
  apiRoutes.put('/users/:id', function(req, res){
	  var admin = false;
	  if(req.body.role == "Admin"){
		  admin = true;
	  }
	  var query = {
		  username:req.body.username,
		  firstname:req.body.firstname,
		  lastname:req.body.lastname,
		  admin:admin
	  };
  
	  User.findOneAndUpdate({_id:req.params.id}, query, function(err, users){
		  if(err)
			  res.send(err);
		  res.json(users);
	  });
  });


//----------------------------------------------------------------------------------
app.use('/api', apiRoutes);
//----------------------------------------------------------------------------------

//Start server
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}/`);
});
