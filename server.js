var express=require('express');
var cfenv = require("cfenv");
var app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.set('views',__dirname + '/views');
app.engine('html', require('ejs').renderFile);

app.set('view engine', 'ejs');

app.get('/',function(req,res){
	res.render('index.html');
});
app.get('/registerclinic',function(req,res){
  res.render('registerclinic.html');
});
app.get('/registerpharmacy',function(req,res){
  res.render('registerpharmacy.html');
});
app.get('/registerlab',function(req,res){
  res.render('registerlab.html');
});
app.get('/clinicdashboard',function(req,res){
  res.render('clinicdashboard.html');
});
app.get('/modal',function(req,res){
  res.render('modal.html');
});

var path=require('path');
app.use(express.static(path.join(__dirname, 'public')));
var port = process.env.PORT || 3000
app.listen(port, function() {
    console.log(" http://localhost:" + port);
});
/*
var vcapLocal;
try {
  vcapLocal = require('./vcap-local.json');
  console.log("Loaded local VCAP", vcapLocal);
} catch (e) { }

const appEnvOpts = vcapLocal ? { vcap: vcapLocal} : {}

const appEnv = cfenv.getAppEnv(appEnvOpts);

if (appEnv.services['cloudantNoSQLDB']) {
  
  var Cloudant = require('cloudant');

  
  var cloudant = Cloudant(appEnv.services['cloudantNoSQLDB'][0].credentials);

  
}
app.post('/api/clinic/post',function(req,res){
var name=req.body.name;
var address=req.body.address;
var pin=req.body.pin;
var district=req.body.district;
var pno1=req.body.pno1;
var pno2=req.body.pno2;
var email=req.body.email;
var password=req.body.password;
var clinics=cloudant.db.use('clinics');
clinics.insert({ "name" : name ,"address":address,"pin":pin, "district":district,"pno1":pno1,"pno2":pno2,"email":email,"password":password}, function(err, body, header) {
  if (err) {
    return console.log('[userdb.insert] ', err.message);}
});
 res.end();
});


app.post('/api/clinic/login',function(req,res){
  var email=req.body.email;
  var password=req.body.password;
  var clinics=cloudant.db.use('clinics');
  var ans;
  clinics.index(function(er, result) {
  if (er) {
    throw er;
  }
ans=result.indexes.length;
  console.log('The database has %d indexes', result.indexes.length);
  for (var i = 0; i < result.indexes.length; i++) {
    console.log('  %s (%s): %j', result.indexes[i].name, result.indexes[i].type, result.indexes[i].def);
  }

  result.should.have.a.property('indexes').which.is.an.Array;
  done();
});
res.end(ans);
});
*/
var firebase=require('firebase');


