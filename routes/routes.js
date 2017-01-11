var ChatModel = require("../models/chatmodel");

const appRouter = function(app) {
    app.get("/fetch", (req, res) => {
        console.log('getting all messages on db');

        ChatModel.getAll((error, result) => {
            if(error) {
                console.log('error:', error);
                return res.status(400).send(error);
            }
            
            console.log('result:', result);
            
            return res.send(result);
        });
    });
};
 
module.exports = appRouter;