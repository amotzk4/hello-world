var http = require('http');

var i=0;
var options = {
  host: '127.0.0.1',
  port: 3000,
  path: '/addNewGroup/?name=firstTest'
};

var options2 = {
  host: '127.0.0.1',
  port: 3000,
  path: '/addUserToGroup/?group_id=0&name=israel&tel=1234567'
};

var options3 = {
  host: '127.0.0.1',
  port: 3000,
  path: '/addNewMsg/?group_id=0&user_id=0&msg=eli&time=23:00'
};

var options4 = {
  host: '127.0.0.1',
  port: 3000,
  path: '/getCurrentGruopMsg/?group_id=0'
};


callback = function(response) {
  var str = '';

  //another chunk of data has been recieved, so append it to `str`
  response.on('data', function (chunk) {
    str += chunk;
  });

  //the whole response has been recieved, so we just print it out here
  response.on('end', function () {		
	if(i==3){
	var ans='"group_id 0 user_id 0 msg eli time 23:00 "';	
	if(ans==str){    
	console.log('good test');
	}
	else{
	console.log('test feild');
	console.log('ans: '+ans);
	console.log('str: '+ str);
	}
	}
	else{
	i++;
	}
  });
}

http.request(options, callback).end();
http.request(options2, callback).end();
http.request(options3, callback).end();
http.request(options4, callback).end();
