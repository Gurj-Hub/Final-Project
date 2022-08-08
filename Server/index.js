const express = require("express");

require("dotenv").config();
const morgan = require("morgan");
const { auth, requiresAuth } = require("express-openid-connect");

const {
  getAllProducts,
  getAllIncentives,
  getMonthlyConsumption,
  getSolarPanelData,
  getCostPerKWH,
} = require("./handlers");

const PORT = 4000;

express()
  //----------------------------------------------------------
  //Not sure what this is - copied from group project
  //----------------------------------------------------------
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })

  //----------------------------------------------------------
  //Config for auth0
  //----------------------------------------------------------
  .use(
    auth({
      authRequired: false,
      auth0Logout: true,
      issuerBaseURL: process.env.ISSUER_BASE_URL,
      baseURL: process.env.BASE_URL,
      clientID: process.env.CLIENT_ID,
      secret: process.env.SECRET,
      idpLogout: true,
    })
  )
  //----------------------------------------------------------
  //'initializing' Morgan
  //----------------------------------------------------------
  .use(morgan("tiny"))

  //----------------------------------------------------------
  //Endpoints
  //----------------------------------------------------------

  // get all products
  .get("/products", getAllProducts)
  //get all incentives
  .get("/incentives", getAllIncentives)
  //gets average rate of consumption per month per region in kWh
  .get("/monthlyConsumption", getMonthlyConsumption)
  //gets the cost/kWh per region
  .get("/costPerKWH", getCostPerKWH)
  //gets data for solar panels ie. cost, production rate
  .get("/solarPanelData", getSolarPanelData)
  // checking for user authentification - subject to change
  .get("/log", (req, res) => {
    res.status(200).json({
      status: 200,
      data: req.oidc.isAuthenticated() ? "Logged in" : "Logged out",
    });
  })
  //to check if a user is logged in
  .get("/profile", requiresAuth(), (res, req) => {
    console.log(req.oidc.user);
    res.send(JSON.stringify(req.oidc.user));
  })
  // catch all other endpoint
  .get("*", (req, res) => res.status(404).json("You lost in the sauce."))

  .listen(PORT, () => console.info(`You are listening on port ${PORT}`));
