const appRouter = function(app) {
    app.get("/fetch", (req, res) => {
        res.send({ message: "hello from the back-end!" });
    });
};
 
module.exports = appRouter;