var express = require('express');
var moment = require('moment');
var DB={};

var app = express();
var id_group=0;
var id_user=0;

app.get('/addNewGroup',function(request, response) {
	var name=request.query.name;
	DB[id_group]={};
	DB[id_group]["users"] = []
	DB[id_group]["activeRides"] = []	
	response.end('add new group: '+name+' '+id_group);
	console.log(JSON.stringify(DB,null,2));
	id_group++;
});

app.get('/addUserToGroup',function(request, response) {
	var group_id = request.query.group_id;
	var name=request.query.name;
	var tel=request.query.tel;
	var user_id=id_user;
	console.log(group_id);
	if(!DB[group_id]){
	response.end('Group does not exist');
	console.log(JSON.stringify('Group does not exist'));
	}
	
	else{
	var obj = {'group_id': group_id, 'name': name, 'tel': tel, 'user_id': user_id};	
	DB[group_id]['users'].push(obj);
	console.log(JSON.stringify(DB,null,2))
	response.end('add user to group: '+obj);
	id_user++;
	}
});

app.get('/addNewMsg',function(request, response) {
	var group_id = request.query.group_id;	
	var user_id=request.query.user_id;
	var msg=request.query.msg;
	var time=request.query.time;
	if(!DB[group_id]){
	response.end('Group does not exist');
	console.log(JSON.stringify('Group does not exist'));
	}

	else if(!Object.keys(DB[group_id])[user_id]){
	response.end('user does not exist');
	console.log(JSON.stringify('user does not exist'));
	}
	
	else{	
	var obj = {'group_id': group_id, 'user_id': user_id,'msg': msg, 'time': time};
	DB[group_id]["activeRides"].push(obj);
	response.end('add new msg: '+obj);	
	console.log(JSON.stringify(DB,null,2))
	}
});

app.get('/getCurrentGruopMsg',function(request, response) {
	var group_id=request.query.group_id;
	if(!DB[group_id]){
	response.end('Group does not exist');
	console.log(JSON.stringify('Group does not exist'));
	}
	
	else{
	var time=moment().format('hh:mm a');
	var current=[];
	var usermsg = Object.keys(DB[group_id]['activeRides']);
	usermsg.forEach(function(parameter) {
		var temp=[];	  	
		var items = Object.keys(DB[group_id]['activeRides'][parameter]);
	  	items.forEach(function(item) {
	    	var value = DB[group_id]['activeRides'][parameter][item];
		temp+=item+' '+value+' ';
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
	DB[group_id]['activeRides']=current;
	current=[];
	console.log(JSON.stringify(DB[group_id]['activeRides']));
	response.end(JSON.stringify(DB[group_id]['activeRides']));
	}
	

	
});

app.listen(3000);
console.log('http://localhost:3000/');
