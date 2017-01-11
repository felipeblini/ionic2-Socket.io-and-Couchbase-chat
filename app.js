const express = require("express");
const path = require("path");
const app = express();
const config = require("./config");
const couchbase = require("couchbase");
 
const server = require("http").Server(app);
const io = require("socket.io").listen(server);

module.exports.bucket = (new couchbase.Cluster(config.couchbase.server)).openBucket(config.couchbase.bucket);
 
app.use(express.static(path.join(__dirname, "public")));
 
const routes = require("./routes/routes.js")(app);
const ChatModel = require("./models/chatmodel.js");
 
// everytime a new user access the page with the socket.io client script
io.on("connection", socket => {
    console.log('a user connected');

     // everytime time a new msg is received
    socket.on("chat_message", msg => {
        console.log("message received:", msg);

        console.log("storing the message in the couchbase");
        ChatModel.create({message: msg}, (error, result) => {
            if(error) {
                console.log(JSON.stringify(error));
            }

            // sending/broadcasting the message to everyone
            io.emit("chat_message", msg);
            console.log("msg sent to everyone:", msg);
        }); 
    });
});
 
server.listen(3000, () =>
    console.log("Listening on port %s...", server.address().port));