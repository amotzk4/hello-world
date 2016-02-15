var http = require('http');

var options = {
  host: '127.0.0.1',
  port: 3000,
  path: '/addNewGroup/?name=firstTest'
};

callback = function(response) {
  var str = '';

  //another chunk of data has been recieved, so append it to `str`
  response.on('data', function (chunk) {
    str += chunk;
  });

  //the whole response has been recieved, so we just print it out here
  response.on('end', function () {
	var ans='add new group: firstTest 0';
	if(ans==str){    
	console.log('good test');
	}
	else{
	console.log('test feild'+ 'ans: '+ans+' str: '+ str);
	}
  });
}

http.request(options, callback).end();
