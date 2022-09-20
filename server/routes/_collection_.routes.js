const _Collection_Controller = require("../controllers/_collection_.controller");

module.exports = (app) => {
    //Display all _Collection_s
    app.get("/api/_collection_s", _Collection_Controller.showAll_Collection_s);

    //Display one _Collection_
    app.get("/api/_collection_s/:id", _Collection_Controller.findOne_Collection_);

    //Create new _Collection_
    app.post("/api/_collection_s", _Collection_Controller.createOne_Collection_);

    //Update one _Collection_
    app.put("/api/_collection_s/:id", _Collection_Controller.update_Collection_);

    //Delete one _Collection_
    app.delete("/api/_collection_s/:id", _Collection_Controller.delete_Collection_);
};