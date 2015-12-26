var array={
    Group: 1,
    name: 'israel',
    msg: 'home'
};

var http=require('http'),
    PORT=8789,
    server=function(req,res){
        res.writeHead(200,{'Content-Type':'application/json'});

        // JSON
        //res.end(JSON.stringify(array));
		//res.end(req.url);
		var t=req.url;
		if(t.indexOf('addUserToGroup')>-1){
			res.end('add user');
		}
		else if(t.indexOf('addNewMsg')>-1){
			res.end('new msg');
		}
		else if(t.indexOf('getCurrentGruopMsg')>-1){
			res.end(JSON.stringify(array));
		}
		else{
			res.end('error');
    }
  }

http.createServer(server).listen(PORT);
console.log('Server started.');
