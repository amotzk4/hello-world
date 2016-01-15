
var express = require('express');
var moment = require('moment');
var DB={};
var group1={
	users: [],
	msgs: []
};


var app = express();

app.get('/addNewGroup',function(request, response) {
	var name=request.query.name;
	var id=request.query.id;
	DB[id]={};
	DB[id]["users"] = []
	DB[id]["activeRides"] = []
	response.end(JSON.stringify('add new group: '+name+' '+id));
	console.log('add new group: '+name+' '+id);
	console.log(JSON.stringify(DB,null,2))
});

app.get('/addUserToGroup',function(request, response) {
	var group = request.query.group;
	var name=request.query.name;
	var tel=request.query.tel;
	var id=request.query.id;
	var obj = {'name': name, 'tel': tel, 'id': id};
	console.log(obj);
	DB[group]['users'].push(obj);
	console.log(JSON.stringify(DB,null,2))
	response.end(JSON.stringify('add user to group: '+obj));	
	console.log('add user to group: '+obj);
});

app.get('/addNewMsg',function(request, response) {
	var group = request.query.group;	
	var id=request.query.id;
	var msg=request.query.msg;
	var time=request.query.time;
	var obj = {'msg': msg, 'time': time};
	DB[group]['activeRides'].push(obj);
	response.end(JSON.stringify('add new msg: '+obj));	
	console.log('add new msg: '+obj);
});

app.get('/getCurrentGruopMsg',function(request, response) {
	var obj=JSON.stringify(group1.msgs);
	console.log('obj: '+obj);
	var id=request.query.id;
	
	//for (var i = 0; i < obj.length; i++) {
    	//console.log(obj[i]);
	
	
	response.end(JSON.stringify(DB[id]['activeRides']));
});




app.listen(3000);
