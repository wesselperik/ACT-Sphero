var appRouter = function (app) {
    app.get("/", function(req, res) {
      res.status(200).send("ACT-Sphero API v1");
    });
  }
  
  module.exports = appRouter;