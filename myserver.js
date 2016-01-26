
var express = require('express');
var moment = require('moment');
var DB={};
var app = express();

app.get('/addNewGroup',function(request, response) {
	var name=request.query.name;
	var id=request.query.id;
	DB[id]={};
	DB[id]["users"] = []
	DB[id]["activeRides"] = []	
	response.end('add new group: '+name+' '+id);
	console.log(JSON.stringify(DB,null,2))
});

app.get('/addUserToGroup',function(request, response) {
	var group = request.query.group;
	var name=request.query.name;
	var tel=request.query.tel;
	var id=request.query.id;
	var obj = {'group': group, 'name': name, 'tel': tel, 'id': id};	
	DB[group]['users'].push(obj);
	console.log(JSON.stringify(DB,null,2))
	response.end('add user to group: '+obj);
	response.end('Group does not exist');
	console.log(JSON.stringify('Group does not exist'))
});

app.get('/addNewMsg',function(request, response) {
	var groupname = request.query.group;	
	var id=request.query.id;
	var msg=request.query.msg;
	var time=request.query.time;
	var obj = {'groupname': groupname, 'id': id,'msg': msg, 'time': time};
	DB[id]["activeRides"].push(obj);
	response.end('add new msg: '+obj);	
	console.log(JSON.stringify(DB,null,2))
});

app.get('/getCurrentGruopMsg',function(request, response) {
	var time=moment().format('hh:mm a');
	var id=request.query.id;
	var current=[];
	var usermsg = Object.keys(DB[id]['activeRides']);
	usermsg.forEach(function(parameter) {
		var temp=[];	  	
		var items = Object.keys(DB[id]['activeRides'][parameter]);
	  	items.forEach(function(item) {
	    	var value = DB[id]['activeRides'][parameter][item];
		temp+=item+' '+value+'';
			if(item=='time'){
				var time=moment().format('hh:mm a');
				console.log(time);
				if(value>time){
				current+=temp;			    	
				console.log('temp: '+temp);
				}
			}
	  	});
	});
	DB[id]['activeRides']=current;
	current=[];
	console.log(JSON.stringify(DB[id]['activeRides']));
	response.end(JSON.stringify(DB[id]['activeRides']));
});




app.listen(3000);
console.log('http://localhost:3000/');
