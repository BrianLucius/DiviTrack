const PortfolioController = require("../controllers/portfolio.controller");

module.exports = (app) => {
    //Display all Portfolios
    app.get("/api/portfolios", PortfolioController.showAllPortfolios);

    //Display one Portfolio
    app.get("/api/portfolios/:id", PortfolioController.findOnePortfolio);

    //Display Portfolio by User
    app.get("/api/portfolios/user/:userId", PortfolioController.findPortfolioByUser);

    //Create new Portfolio
    app.post("/api/portfolios", PortfolioController.createOnePortfolio);

    //Update one Portfolio
    app.put("/api/portfolios/:id", PortfolioController.updatePortfolio);

    //Delete one Portfolio
    app.delete("/api/portfolios/:id", PortfolioController.deletePortfolio);
};