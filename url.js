// RunningServer/routes.js
module.exports = function(RunningServer, passport) {

	//Halaman Root
	RunningServer.get('/', function(req, res) {
		res.render('main.ejs', { PesanError: req.flash('loginPesanError') });
	});

	
    //Halaman Login --> GET
	RunningServer.get('/login', function(req, res) {
		res.render('main.ejs', { PesanError: req.flash('loginPesanError') });
	});

	//Halaman Login --> POST
	RunningServer.post('/login', passport.authenticate('UserLogin', {
            successRedirect : '/beranda', 
            failureRedirect : '/login', 
            failureFlash : true 
		}),
        function(req, res) {
            console.log("hello");

            if (req.body.remember) {
              req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
              req.session.cookie.expires = false;
            }
        res.redirect('/');
    });

   //Halaman Edit User --> GET
   RunningServer.get('/userdata', isLoggedIn, function(req, res) {
		res.render('userdata.ejs', { PesanError: req.flash('loginUpdateError'), PesanSukses: req.flash('PesanSukses'),
			user : req.user 
		 });
	});

   //Halaman Edit User --> POST
	RunningServer.post('/userdata', passport.authenticate('UserEdit', {
		successRedirect : '/beranda', 
		failureRedirect : '/userdata', 
		failureFlash : true 
	}));

	//Halaman Register --> GET
	RunningServer.get('/register', function(req, res) {
		res.render('main.ejs', { PesanError: req.flash('registerPesanError') });
	});

	//Halaman Register --> POST
	RunningServer.post('/register', passport.authenticate('UserRegister', {
		successRedirect : '/beranda', 
		failureRedirect : '/register', 
		failureFlash : true 
	}));

	//Halaman Beranda --> GET
	RunningServer.get('/beranda', isLoggedIn, function(req, res) {
		res.render('beranda.ejs', {PesanError: req.flash('registerPesanError'), PesanSukses: req.flash('PesanSukses'),
			user : req.user 
		});
	});

	
	//Logout --> GET
	RunningServer.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
};


function isLoggedIn(req, res, next) {

	if (req.isAuthenticated())
		return next();	
	res.redirect('/');
}
