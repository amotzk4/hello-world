var group1=[];
var msg1=[];
var express = require('express');
var app = express();
var date = new Date();

app.get('/myServer',function(request, response) {
	response.end(request.url);
	var t=req.url;
        
	if(t.indexOf('addUserToGroup')>-1)
	var group = request.query.group;
	var name=request.query.name;
	var tel=request.query.tel;
	var obj = { 'group': group, 'name': name, 'tel': tel};	
	group1.push(obj);
	console.log(group1);
	}
		
	else if(t.indexOf('addNewMsg')>-1){
	var id=request.query.id;
	var msg=request.query.msg;
	var time=request.query.msg;
	var obj = { 'group': id, 'msg': msg, 'time': time};
	msg1.push(obj);
	console.log(addmsg);
	}

	else if(t.indexOf('getCurrentGruopMsg')>-1){
	var id=request.query.id;
	var current_hour = date.getHours();			
	res.end(JSON.stringify(array));
	}
	
	else{
	res.end('error');
    	}


});

app.listen(3000);






