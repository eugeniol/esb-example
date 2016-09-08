var restify = require('restify');
var morgan = require('morgan')
var server = restify.createServer();

server.use(restify.queryParser());
server.use(restify.bodyParser()); 
server.use(restify.CORS());
server.use(restify.authorizationParser()); 


server.post('/authenticate', (req,res) => {
	console.log(req.authorization)	
	if(!req.authorization.credentials) {
 		res.send({ auth:false })
	}
	else {	
		res.send({ auth:true, sessionId:'xxxxxxxxxxxxxxxx' })
	console.log('authenticated')
	}
})
server.get(/.+/, log)
server.post(/.+/, log)
server.put(/.+/, log)
function log (req,res,next) {
	var ret = {
		URL: 	req.url,
		METHOD: req.method,
		QUERY: req.query,
		HEADERS: req.headers,
		BODY: req.body
	}
	console.log(ret)
	res.send(ret)
	next()
}

server.listen(3030, (o) => console.log("Server running", this))

