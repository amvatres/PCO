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
var Speakers = require('./app/models/speaker'); 
var Tickets = require('./app/models/ticket'); 
var Conference = require('./app/models/conference'); 
var Messages = require('./app/models/message'); 

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
//Login - No Middleware needed
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

//Register new user
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


	apiRoutes.get('/admins', function(req, res){
	User.find({admin: true}, function(err, admins){
	  if(err)
		res.send(err);
	  res.json(admins);
	})
  });

//----------------------------------------------------------------------------------
apiRoutes.get('/users', function(req, res){
	User.find(function(err, users){
	  if(err)
		res.send(err);
	  res.json(users);
	})
  });
  
  apiRoutes.get('/users/:id', function(req, res){
	  User.findOne({_id:req.params.id}, function(err, users){
		  if(err)
			  res.send(err);
		  res.json(users);
	  });
  });
  
  apiRoutes.delete('/users/:id', function(req, res){
	  User.findOneAndRemove({_id:req.params.id}, function(err, users){
		  if(err)
			  res.send(err);
		  res.json(users);
	  });
  });
  
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

  apiRoutes.post('/speakers', function(req, res){
	var firstname = req.body.firstname;
	var lastname = req.body.lastname;
	var email = req.body.email;
	var country = req.body.country;
	var company = req.body.company;
	var position = req.body.position;
	var imageUrl = req.body.imageUrl;
	var twitterUrl = req.body.twitterUrl;
	var linkedinUrl = req.body.linkedinUrl;
	var facebookUrl = req.body.facebookUrl;
	var topic = req.body.topic;
	var description = req.body.description;


	var speaker = new Speakers({firstname:firstname, lastname:lastname, email:email, country: country, company: company, position: position, imageUrl: imageUrl, twitterUrl: twitterUrl, linkedinUrl: linkedinUrl, facebookUrl: facebookUrl, topic:topic, description: description});
	Speakers.create(speaker, function(err, speaker){
		if(err)
			res.send(err);
		res.json(speaker);
		});
	});

	apiRoutes.get('/speakers', function(req, res){
		Speakers.find(function(err, speakers){
		  if(err)
			res.send(err);
		  res.json(speakers);
		})
	});
	
	apiRoutes.delete('/speakers/:id', function(req, res){
		Speakers.findOneAndRemove({_id:req.params.id}, function(err, speaker){
			if(err)
				res.send(err);
			res.json(speaker);
		});
	});
	
	apiRoutes.get('/speakers/:id', function(req, res){
		Speakers.findOne({_id:req.params.id}, function(err, speaker){
			if(err)
				res.send(err);
			res.json(speaker);
		});
	});

	apiRoutes.put('/speakers/:id', function(req, res){
	
		var query = {
			 firstname : req.body.firstname,
			 lastname : req.body.lastname,
			 email : req.body.email,
		 	 country : req.body.country,
			 company : req.body.company,
			 position : req.body.position,
			 imageUrl : req.body.imageUrl,
			 twitterUrl : req.body.twitterUrl,
			 linkedinUrl : req.body.linkedinUrl,
			 facebookUrl : req.body.facebookUrl,
			 topic : req.body.topic,
			 description : req.body.description
		};
	
		Speakers.findOneAndUpdate({_id:req.params.id}, query, function(err, speaker){
			if(err)
				res.send(err);
			res.json(speaker);
		});
	});

//----------------------------------------------------------------------------------

	apiRoutes.get('/tickets/standard', function(req, res){
		Tickets.find({type: "Standard"}, function(err, tickets){
		  if(err)
			res.send(err);
		  res.json(tickets);
		})
	  });

	  apiRoutes.get('/tickets/standard/count', function(req, res){
		Tickets.countDocuments({type: "Standard"}, function(err, tickets){
		  if(err)
			res.send(err);
		  res.json(tickets);
		})
	  });

	  apiRoutes.get('/tickets/pro', function(req, res){
		Tickets.find({type: "Pro"}, function(err, tickets){
		  if(err)
			res.send(err);
		  res.json(tickets);
		})
	  });

	  apiRoutes.get('/tickets/pro/count', function(req, res){
		Tickets.countDocuments({type: "Pro"}, function(err, tickets){
		  if(err)
			res.send(err);
		  res.json(tickets);
		})
	  });

	  apiRoutes.get('/tickets/premium', function(req, res){
		Tickets.find({type: "Premium"}, function(err, tickets){
		  if(err)
			res.send(err);
		  res.json(tickets);
		})
	  });

	  apiRoutes.get('/tickets/premium/count', function(req, res){
		Tickets.countDocuments({type: "Premium"}, function(err, tickets){
		  if(err)
			res.send(err);
		  res.json(tickets);
		})
	  });
//----------------------------------------------------------------------------------
	apiRoutes.post('/conference', function(req, res){
		var title = req.body.title;
		var date = req.body.date;
		var place = req.body.place;
		var city = req.body.city;
		var description = req.body.description;
		var venue = req.body.venue;
		var imageUrl = req.body.imageUrl;
		var videoUrl = req.body.imageUrl;
		var contactAddress = req.body.contactAddress;
		var contactPhoneNumber = req.body.contactPhoneNumber;
		var contactEmail = req.body.contactEmail;

		var conference = new Conference({title:title, date:date, place:place, city:city, venu:venue, imageUrl: imageUrl, videoUrl:videoUrl, contactAddress:contactAddress, contactPhoneNumber:contactPhoneNumber, contactEmail: contactEmail, description: description});
		Conference.create(conference, function(err, conference){
			if(err)
				res.send(err);
			res.json(conference);
			});
		});

		apiRoutes.get('/conference', function(req, res){
			Conference.find(function(err, conference){
			  if(err)
				res.send(err);
			  res.json(conference);
			})
		});

		apiRoutes.get('/conference/count', function(req, res){
			Conference.countDocuments( function(err, conference){
			  if(err)
				res.send(err);
			  res.json(conference);
			})
		  });
	
		  apiRoutes.delete('/conference/:id', function(req, res){
			Conference.findOneAndRemove({_id:req.params.id}, function(err, conference){
				if(err)
					res.send(err);
				res.json(conference);
			});
		});
		
		apiRoutes.get('/conference/:id', function(req, res){
			Conference.findOne({_id:req.params.id}, function(err, conference){
				if(err)
					res.send(err);
				res.json(conference);
			});
		});
	
		apiRoutes.put('/conference/:id', function(req, res){
		
			var query = {
				 title : req.body.title,
				 date : req.body.date,
				 place : req.body.place,
				 city : req.body.city,
				 description : req.body.description,
				 venue : req.body.venue,
				 imageUrl : req.body.imageUrl,
				 videoUrl: req.body.videoUrl,
				 contactAddress : req.body.contactAddress,
				 contactPhoneNumber : req.body.contactPhoneNumber,
				 contactEmail : req.body.contactEmail
			};
		
			Conference.findOneAndUpdate({_id:req.params.id}, query, function(err, conference){
				if(err)
					res.send(err);
				res.json(conference);
			});
		});
//----------------------------------------------------------------------------------
		
		apiRoutes.get('/messages', function(req, res){
			Messages.find(function(err, messages){
			if(err)
				res.send(err);
			res.json(messages);
			})
		});

		apiRoutes.get('/messages/count', function(req, res){
			Messages.countDocuments( function(err, messages){
			  if(err)
				res.send(err);
			  res.json(messages);
			})
		  });

		  apiRoutes.get('/messages/:id', function(req, res){
			Messages.findOne({_id:req.params.id}, function(err, messages){
				if(err)
					res.send(err);
				res.json(messages);
			});
		});
//----------------------------------------------------------------------------------
app.use('/api', apiRoutes);
//----------------------------------------------------------------------------------

//Start server
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}/`);
});
