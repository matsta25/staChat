var express = require("express"),
    socket  = require("socket.io");

//app setup
var app = express();
var server = app.listen(process.env.PORT, process.env.IP);
//static files
app.use(express.static("public"));

//socket setup
var io = socket(server);

io.on("connection", function(socket){
    console.log("Made socket connection. Id:", socket.id);

    socket.on("chat", function(data){
        io.sockets.emit("chat", data);
    });

    socket.on("typing", function(data){
        socket.broadcast.emit("typing", data);
    });
});