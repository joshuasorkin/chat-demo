const express = require('express');
const fs = require('fs');
const app = express();
const server = require('http').createServer(app);
const port = process.env.PORT || 3000
const io = require('socket.io')(server,{
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials:true
    }
});
const path = require('path');
//const cors = require('cors');
const NameChecker = require('./NameChecker');

//initialize name checker
const nameChecker=new NameChecker();

//set index page to static HTML file, using index.html
app.use(express.static(path.join(__dirname + '/public')))


/*RouterLoader.loadRoutes() was failing to load testAPI when
called from module, so added the loadRoute code here
until that is fixed and we can refactor the function
back to the module*/
//const RouterLoader = require('./routerLoader');
//const routerLoader = new RouterLoader(app);
//routerLoader.loadRoutes();

//***begin loadRoutes() for REST API
var route_directory = "routes";
//get list of filenames in /routes
var filenames = fs.readdirSync(route_directory);
var router;
//iterate through filenames
filenames.forEach(filename=>{
    //routername is filename without .js extension
    var router=filename.substring(0,filename.length-3);
    var routerConst="var "+router+"Router = require('./routes/"+router+"');"
    //require the routername
    eval(routerConst);
    if(router!=='index'){
        //add the route as middleware
        eval("app.use('/"+router+"',"+router+"Router);");
    }
    else{
        /*index is being served as index.html through the express.static() call
        leaving this section in place for future development
        if we want to dynamically render the index page*/

        //console.log("adding default route");
        //eval("app.use('/',"+router+"Router);");
    }
})
//***end loadRoutes()


io.on('connection',socket=>{
    //get 'chat' event from client and broadcast the message
    socket.on('chat',message =>{
        io.emit('chat',`${socket.username}: ${message}`);
    });
    //response to username update submission
    //todo: refactor these socket.on() event handlers into their own functions
    socket.on('submitUsername',(username)=>{
        //check if username is already in use
        if(nameChecker.getIDFromName(username)===null){
            nameChecker.addIDAndName(socket.id,username);
            if (socket.hasOwnProperty("username")){
                io.emit('chat',`${socket.username} has changed their name to "${username}".`);
            }
            else{
                io.emit('chat',`${username} is ready to chat.`)
            }

            socket.username=username;
            io.to(socket.id).emit('username_update',`Username successfully changed to ${username}.`,username);
        }
        else{
            console.log(`${username} is already in use`);
            io.to(socket.id).emit('username_update',`"${username}" is already in use.`,null);
        }
    });
    socket.on('disconnect',()=>{
        if(nameChecker.getNameFromID(socket.id)!==null){
            io.emit('chat',`${socket.username} has disconnected.`);
            nameChecker.removeID(socket.id);
        }
    })
})

server.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});