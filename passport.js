var LocalStrategy   = require('passport-local').Strategy;
var mysql           = require('mysql');
var crypto          = require('crypto');
var bcrypt          = require('bcrypt-nodejs');
var dbconfig        = require('./configDB');
var RunningDatabase = mysql.createConnection(dbconfig.makekoneksi);

RunningDatabase.query('USE ' + dbconfig.database);

module.exports = function(passport) {

    var genRandomString = function(length){
    return crypto.randomBytes(Math.ceil(length/2))
            .toString('hex') 
            .slice(0,length);   
    };


    var sha512 = function(password, salt){
    var hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    var value = hash.digest('hex');
    return value;
    };


    passport.serializeUser(function(user, done) {
        done(null, user.user_id);
    });

    passport.deserializeUser(function(id, done) {
        RunningDatabase.query("SELECT * FROM user_register WHERE user_id = ? ",[id], function(err, rows){
            done(err, rows[0]);
        });
    });


    passport.use(
        'UserRegister',
        new LocalStrategy({
            usernameField : 'user_login',
            passwordField : 'user_password',
            passReqToCallback : true 
        },
        function(req, username, password, done) {
           
            RunningDatabase.query("SELECT * FROM user_register WHERE user_login = ?",[username], function(err, rows) {
                if (err)
                    return done(err);
                if (rows.length) {
                    return done(null, false, req.flash('registerPesanError', 'User telah tersedia.'));
                } else {
                    var salt            = req.body.user_login+'-'+genRandomString(16); 
                    var passwordData    = sha512(req.body.user_password, salt);
                    var inputUserBaru   = {
                        user_fullname   : req.body.user_fullname,
                        user_login      : req.body.user_login,
                        user_password   : passwordData,
                        user_salt       : salt,
                        user_hobby      : req.body.user_hobby,
                        user_address    : req.body.user_address
                    };
                    RunningDatabase.query("INSERT INTO user_register ( user_fullname, user_login, user_password, user_salt, user_hobby, user_address ) values (?,?,?,?,?,?)",[inputUserBaru.user_fullname, inputUserBaru.user_login, inputUserBaru.user_password, inputUserBaru.user_salt, inputUserBaru.user_hobby, inputUserBaru.user_address],function(err, rows) {
                        inputUserBaru.user_id = rows.insertId;
                        return done(null, inputUserBaru);

                    });
                }
            });
        })
    );

    

    passport.use(
        'UserLogin',
        new LocalStrategy({
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true
        },
        function(req, username, password, done) { 
            RunningDatabase.query("SELECT * FROM user_register WHERE user_login = ?",[username], function(err, rows){

                if (err)
                    return done(err);
                
                if (!rows.length) {
                    return done(null, false, req.flash('loginPesanError', 'User tidak ditemukan.')); 
                }
                
                if (sha512(password, rows[0].user_salt) !== rows[0].user_password)
                    return done(null, false, req.flash('loginPesanError', 'Password yang anda masukkan belum benar.'));
                    return done(null, rows[0]);
            });
        })
    );

   
    passport.use(
        'UserEdit',
        new LocalStrategy({
             usernameField : 'user_id',
            passwordField : 'user_password',
            passReqToCallback : true
        },
        function(req, username, password, done) { 

            var passwordData    = sha512(req.body.user_password, req.user.user_salt);
            var inputUserBaru   = {
                user_fullname   : req.body.user_fullname,
                user_login      : req.body.user_login,    
                user_password   : passwordData,
                user_salt       : req.user.user_salt,
                user_oldpassword: req.body.user_oldpassword,
                user_hobby      : req.body.user_hobby,
                user_address    : req.body.user_address
            };
           
               
                if (sha512(req.body.user_oldpassword, req.user.user_salt) !== req.user.user_password) {
                    return done(null, false, req.flash('loginUpdateError', 'Data Old Password yang dimasukkan tidak sesuai.'));
                } else if(sha512(req.body.user_password, req.user.user_salt) == req.user.user_password) {
                    return done(null, false, req.flash('loginUpdateError', 'Data Password lama dan baru tidak boleh sama.'));
                } else {

                     RunningDatabase.query("UPDATE user_register SET user_fullname = ?, user_password = ?, user_hobby = ?, user_address = ? WHERE user_login= ?",[inputUserBaru.user_fullname, inputUserBaru.user_password, inputUserBaru.user_hobby, inputUserBaru.user_address, req.user.user_login], function(err, rows){
                             return done(null, false, req.flash('PesanSukses', 'Data profil berhasil terUpdate.'));
                             return done(null, user);
                     });
                }

                
            
        })
    );
    


};
