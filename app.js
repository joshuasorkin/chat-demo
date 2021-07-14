const express = require('express');
const fs = require('fs');

const app = express();
const server = require('http').createServer(app);
const port = process.env.PORT || 3000
//const RouterLoader = require('./routerLoader');
//const routerLoader = new RouterLoader(app);

app.set('view engine', 'pug')

//begin router initializer
var route_directory = "routes";
var filenames = fs.readdirSync(route_directory);
var router;
filenames.forEach(filename=>{
    //routername is filename without .js extension
    var router=filename.substring(0,filename.length-3);
    var routerConst="var "+router+"Router = require('./routes/"+router+"');"
    console.log(routerConst);
    eval(routerConst);
    if(router!=='index'){
        eval("app.use('/"+router+"',"+router+"Router);");
    }
    else{
        console.log("adding default route");
        eval("app.use('/',"+router+"Router);");
    }
})
//end router initializer

//routerLoader.loadRoutes();

server.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});