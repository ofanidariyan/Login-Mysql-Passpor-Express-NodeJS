//Load semua library yang dibutuhkan
var express  		= require('express'); 
var session  		= require('express-session'); 
var cookieParser 	= require('cookie-parser'); 
var bodyParser 		= require('body-parser');
var morgan 			= require('morgan'); 
var passport 		= require('passport');
var flash    		= require('connect-flash');
var bcrypt 			= require('bcryptjs');



//Variable untuk menjalankan Server
var RunningServer   = express();
var port     		= process.env.PORT || 8080;


require('./passport')(passport);

//Jalankan Library dan Mengkonfigurasi pada Background Server
RunningServer.use(morgan('dev')); 
RunningServer.use(cookieParser()); 
RunningServer.use(bodyParser.urlencoded({extended: true}));
RunningServer.use(bodyParser.json());
RunningServer.set('view engine', 'ejs'); 
RunningServer.use(session({
	secret: bcrypt.genSaltSync(10),
	resave: true,
	saveUninitialized: true
 } ));
RunningServer.use(express.static(__dirname + '/public'));
RunningServer.use(passport.initialize());
RunningServer.use(passport.session()); 
RunningServer.use(flash());
require('./url.js')(RunningServer, passport);



RunningServer.listen(port);

//Web Server Mulai Berjalan
console.log('Server berjalan pada port : ' + port);
