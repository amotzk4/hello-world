
var express = require('express');
var moment = require('moment');
var DB={};

var app = express();

app.get('/addNewGroup',function(request, response) {
	var name=request.query.name;
	var group_id=request.query.group_id;
	DB[group_id]={};
	DB[group_id]["users"] = []
	DB[group_id]["activeRides"] = []	
	response.end('add new group: '+name+' '+group_id);
	console.log(JSON.stringify(DB,null,2))
});

app.get('/addUserToGroup',function(request, response) {
	var group_id = request.query.group_id;
	var name=request.query.name;
	var tel=request.query.tel;
	var user_id=request.query.user_id;
	
	var x=false;
	for(var i=0; i<Object.keys(DB).length&&x==false; i++){
		if(group_id==Object.keys(DB)[i]){
			x=true;
		}
	}

	if(x==true){
	var obj = {'group_id': group_id, 'name': name, 'tel': tel, 'user_id': user_id};	
	DB[group_id]['users'].push(obj);
	console.log(JSON.stringify(DB,null,2))
	response.end('add user to group: '+obj);
	}

	else{
	response.end('Group does not exist');
	console.log(JSON.stringify('Group does not exist'))
	}
});

app.get('/addNewMsg',function(request, response) {
	var group_id = request.query.group_id;	
	var user_id=request.query.user_id;
	var msg=request.query.msg;
	var time=request.query.time;
	
	var x=false;
	for(var i=0; i<Object.keys(DB).length&&x==false; i++){
		if(group_id==Object.keys(DB)[i]){
			x=true;
		}
	}

	if(x==true){	
	
		var y=false;
		for(var i=0; i<Object.keys(DB[group_id]).length&&y==false; i++){
			if(user_id==Object.keys(DB[group_id])[i]){
				y=true;		
			}
		}	
	
		if(y==false){
		response.end('user does not exist');
		console.log(JSON.stringify('user does not exist'))
		}
		else{
			var obj = {'group_id': group_id, 'user_id': id,'msg': msg, 'time': time};
			DB[group_id]["activeRides"].push(obj);
			response.end('add new msg: '+obj);	
			console.log(JSON.stringify(DB,null,2))
		}
	}
	else{
	response.end('Group does not exist');
	console.log(JSON.stringify('Group does not exist'))
	}
	
});

app.get('/getCurrentGruopMsg',function(request, response) {
	var group_id=request.query.group_id;

	var x=false;
	for(var i=0; i<Object.keys(DB).length&&x==false; i++){
		if(group_id==Object.keys(DB)[i]){
			x=true;
		}
	}

	if(x==true){

	var time=moment().format('hh:mm a');
	var current=[];
	var usermsg = Object.keys(DB[group_id]['activeRides']);
	usermsg.forEach(function(parameter) {
		var temp=[];	  	
		var items = Object.keys(DB[group_id]['activeRides'][parameter]);
	  	items.forEach(function(item) {
	    	var value = DB[group_id]['activeRides'][parameter][item];
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
	console.log(JSON.stringify(DB[group_id]['activeRides']));
	response.end(JSON.stringify(DB[group_id]['activeRides']));
	}

	else{
	response.end('Group does not exist');
	console.log(JSON.stringify('Group does not exist'))
	}
});

app.listen(3000);
console.log('http://localhost:3000/');
