var express = require('express');
var moment = require('moment');

var group1={
	users: [],
	msgs: []
};


var app = express();

app.get('/addUserToGroup',function(request, response) {
	var group = request.query.group;
	var name=request.query.name;
	var tel=request.query.tel;
	var id=request.query.id;
	var obj = {'name': name, 'tel': tel};
	response.end(JSON.stringify(obj));	
	group1.users.push(obj);
	console.log(group1);
	response.end(JSON.stringify(group1));
});

app.get('/addNewMsg',function(request, response) {
	var group = request.query.group;	
	var id=request.query.id;
	var msg=request.query.msg;
	var time=request.query.time;
	var obj = {'msg': msg, 'time': time};
	group1.msgs.push(obj);
	console.log(group1);
});

app.get('/getCurrentGruopMsg',function(request, response) {
	var id=request.query.id;
	var usermsg = Object.keys(group1.msgs);
	usermsg.forEach(function(parameter) {
	  	var items = Object.keys(group1.msgs[parameter]);
	  	items.forEach(function(item) {
	    	var value = group1.msgs[parameter][item];
			if(item=='time'){
				var time=moment().format('hh:mm a');
				if(value>time){
			    	console.log(parameter+' '+item+' = '+value);
					response.end(JSON.stringify(item+'= '+value));	
				}
			}
	  	});
	});
});




app.listen(3000);






