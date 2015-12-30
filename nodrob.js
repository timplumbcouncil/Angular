var cheerio = require("cheerio");



var url = require('url');
qs = require('querystring');


var http = require('http');

// Utility function that downloads a URL and invokes
// callback with the data.
function download(url, callback) {
  http.get(url, function(res) {
    var data = "";
    res.on('data', function (chunk) {
      data += chunk;
    });
    res.on("end", function() {
      callback(data);
    });
  }).on("error", function() {
    callback(null);
  });
}



 
var server = http.createServer(function(req, res) {


	var queryData = url.parse(req.url, true).query;
	console.log(queryData.postcode)

	var dataUrl = "http://www.petrolprices.com/search.html?search=" + queryData.postcode;

	download(dataUrl, function(data) {
  		if (data) {

   		var $ = cheerio.load(data);

      	pricesArray = [ $(".unleaded dd.max").html(), $(".diesel dd.max").html() ]
        res.writeHead(200);
    	res.write(JSON.stringify(pricesArray));
    	res.end();

     

    
  }
  else console.log("error");  
});
	
    
});
 
var port = 8080;
server.listen(port, function() {
    console.log('server listening on port ' + port);
});