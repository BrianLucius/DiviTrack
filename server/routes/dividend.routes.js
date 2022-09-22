const DividendController = require("../controllers/dividends.controller");

module.exports = (app) => {
    //Display all Dividends
    app.get("/api/dividends", DividendController.showAllDividends);

    //Display one Dividend
    app.get("/api/dividends/:id", DividendController.findOneDividend);

    //Display Dividend by Symbol
    app.get("/api/dividends/symbol/:id", DividendController.findDividendBySymbol);

    //Create new Dividend
    app.post("/api/dividends", DividendController.createOneDividend);

    //Update one Dividend
    app.put("/api/dividends/:id", DividendController.updateDividend);

    //Delete one Dividend
    app.delete("/api/dividends/:id", DividendController.deleteDividend);
};