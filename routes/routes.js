var ChatModel = require("../models/chatmodel");

const appRouter = function(app) {
    app.get("/fetch", (req, res) => {
        ChatModel.getAll((error, result) => {
            if(error) {
                return res.status(400).send(error);
            }
            
            return res.send(result);
        });
    });
};
 
module.exports = appRouter;