var express = require("express");
var path = require("path");
var app = express();
 
var server = require("http").Server(app);
var io = require("socket.io").listen(server);
 
app.use(express.static(path.join(__dirname, "public")));
app.use("/scripts", express.static(__dirname + "/node_modules/"));
 
var routes = require("./routes/routes.js")(app);
 
io.on("connection", socket => {
    console.log('a user connected');

    socket.on("chat_message", msg => {
        console.log("message received:", msg);

        // sending the message to everyone
        io.emit("chat_message", msg);
        console.log("msg sent to everyone:", msg);
        
    });
});
 
server.listen(3000, () =>
    console.log("Listening on port %s...", server.address().port));