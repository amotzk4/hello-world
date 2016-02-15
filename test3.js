var http = require('http');

var options = {
  host: '127.0.0.1',
  port: 3000,
  path: '/addNewMsg/?group_id=0&user_id=0&msg=eli&time=22:00'
};

callback = function(response) {
  var str = '';

  //another chunk of data has been recieved, so append it to `str`
  response.on('data', function (chunk) {
    str += chunk;
  });

  //the whole response has been recieved, so we just print it out here
  response.on('end', function () {
	var ans='add new msg: {"group_id":"0","user_id":"0","msg":"eli","time":"23:00"}';
	if(ans==str){    
	console.log('good test');
	}
	else{
	console.log('test feild');
	console.log('ans: '+ans);
	console.log('str: '+ str);
	}
  });
}

http.request(options, callback).end();
