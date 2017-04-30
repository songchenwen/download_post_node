var express = require('express');
var bodyParser = require('body-parser');
var download = require('download-file');
var mkdirp = require('mkdirp');
var app = express();

var destdir = process.env.DEST || "/dest"
var port = process.env.PORT || 3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', function (req, res) {
	var url = req.body['url'];
	var dir = req.body['dir'];
	if (!url || !dir){
		res.status(400).send('missing argument');
		return
	}
	mkdirp(destdir + "/" + dir, function(err){
		if (err){
			res.status(400).send('dir err ' + dir);
			return
		}
		download(url, {directory: destdir + "/" + dir}, function(err){
			if (err){
				res.status(400).send('download err ' + url);
				return
			}
			res.send('success')
		});
	});
});

app.listen(port);

console.log('listen to ' + port + '\ndest ' + destdir)
