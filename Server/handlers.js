const { MongoClient, ObjectId } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//---------------------------------------------------------------
//returns all of the products available to consumer from database
//---------------------------------------------------------------
const getAllProducts = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    const db = client.db("N4S");

    //gets all products in db and puts them into an array
    const allProducts = await db.collection("Product Data").find().toArray();

    if (allProducts.length > 0 && allProducts !== null) {
      return res.status(200).json({
        status: 200,
        data: allProducts,
        message: "Data contains an array containing all of the products.",
      });
    } else {
      return res.status(404).json({
        status: 404,
        data: null,
        message: 'No products were found in collection "Product Data".',
      });
    }
  } catch (err) {
    console.log(err.stack);
  } finally {
    client.close();
  }
};
//--------------------------------------------------------------------
//returns all of the incentives available to consumer for their region
//--------------------------------------------------------------------
const getAllIncentives = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    const db = client.db("N4S");

    //gets all incentives in db and puts them into an array
    const allIncentives = await db
      .collection("Incentives")
      .findOne({ _id: ObjectId("62ed92007199d0a309ec78ba") });

    if (allIncentives !== null) {
      return res.status(200).json({
        status: 200,
        data: allIncentives,
        message:
          "Data contains an object containing the incentives for their respective regions.",
      });
    } else {
      return res.status(404).json({
        status: 404,
        data: null,
        message: 'No incentives were found in collection "Incentives".',
      });
    }
  } catch (err) {
    console.log(err.stack);
  } finally {
    client.close();
  }
};
//--------------------------------------------------------------------
//returns the average residential consumption per region
//--------------------------------------------------------------------
const getMonthlyConsumption = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    const db = client.db("N4S");

    //gets averages of residential consumption per region
    const avgConsumption = await db
      .collection("Monthly kWh used/Province")
      .findOne({ _id: ObjectId("62ed8f0b9e48ce518af2f908") });

    if (avgConsumption !== null) {
      return res.status(200).json({
        status: 200,
        data: avgConsumption,
        message:
          "Data contains an object containing the average residential consumption per region.",
      });
    } else {
      return res.status(404).json({
        status: 404,
        data: null,
        message:
          'No residential consumption figure was found in collection "Monthly kWh used/Province".',
      });
    }
  } catch (err) {
    console.log(err.stack);
  } finally {
    client.close();
  }
};

//--------------------------------------------------------------------
//returns the average price and energy production of a solar panel
//--------------------------------------------------------------------
const getSolarPanelData = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    const db = await client.db("N4S");

    //gets averages of residential consumption per region
    const solarData = await db
      .collection("Solar Panel Data")
      .findOne({ _id: ObjectId("62ed93322e603b76d0753ab8") });

    if (solarData !== null) {
      return res.status(200).json({
        status: 200,
        data: solarData,
        message:
          "Data contains an object containing the information on the average 200W Monochrystalline panel.",
      });
    } else {
      return res.status(404).json({
        status: 404,
        data: null,
        message:
          'No solar panel data was found in collection "Solar Panel Data".',
      });
    }
  } catch (err) {
    console.log(err.stack);
  } finally {
    client.close();
  }
};

//--------------------------------------------------------------------
//returns the cost per kWH consummed per region
//--------------------------------------------------------------------
const getCostPerKWH = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    const db = await client.db("N4S");

    //retrieves cost/kWh per region data
    const costPerKWH = await db
      .collection("Cost Per kWh")
      .findOne({ _id: ObjectId("62ed8e3a9ace9b828f87f6d1") });

    if (costPerKWH !== null) {
      return res.status(200).json({
        status: 200,
        data: costPerKWH,
        message:
          "Data contains an object containing the information on the cost/kWh per region.",
      });
    } else {
      return res.status(404).json({
        status: 404,
        data: null,
        message:
          'No data regarding the cost/kWh was found in collection "Cost Per kWh".',
      });
    }
  } catch (err) {
    console.log(err.stack);
  } finally {
    client.close();
  }
};

//--------------------------------------------------------------------
//adding user to DB
//--------------------------------------------------------------------
const addUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const userObj = req.body;

  try {
    const db = await client.db("N4S");

    // checks if user already exists
    const validateUser = await db
      .collection("Users")
      .findOne({ _id: userObj.email });

    if (validateUser !== null) {
      return res.status(200).json({
        status: 200,
        data: validateUser,
        message: `Database already contains user with email "${userObj.email}".`,
      });
    } else {
      //adds user to DB after checking he doesnt exist
      const adding = await db
        .collection("Users")
        .insertOne({ _id: userObj.email, user: userObj });

      return res.status(404).json({
        status: 202,
        data: adding,
        message: `User with e-mail "${userObj.email}" was successfully added to database.`,
      });
    }
  } catch (err) {
    console.log(err.stack);
  } finally {
    client.close();
  }
};

//--------------------------------------------------------------------
//adding items to User document
//--------------------------------------------------------------------
const addItems = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const userEmail = req.body.email;
  const items = req.body.items;

  try {
    const db = await client.db("N4S");

    // checks if user already exists
    const validateUser = await db
      .collection("Users")
      .findOne({ _id: userEmail });

    if (validateUser !== null) {
      await db
        .collection("Users")
        .updateOne({ _id: userEmail }, { $set: { savedItems: items } });

      return res.status(200).json({
        status: 200,
        data: items,
        message: `Items were added to user with email "${userEmail}".`,
      });
    } else {
      return res.status(404).json({
        status: 404,
        data: req.body,
        message: `User with e-mail "${userEmail}" was not found in database.`,
      });
    }
  } catch (err) {
    console.log(err.stack);
  } finally {
    client.close();
  }
};

//--------------------------------------------------------------------
//adding location to User document
//--------------------------------------------------------------------
const addLocation = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const userEmail = req.body.email;
  const location = req.body.location;

  try {
    const db = await client.db("N4S");

    // checks if user already exists
    const validateUser = await db
      .collection("Users")
      .findOne({ _id: userEmail });

    if (validateUser !== null) {
      await db
        .collection("Users")
        .updateOne({ _id: userEmail }, { $set: { location: location } });

      return res.status(200).json({
        status: 200,
        data: req.body,
        message: `Location ${location} was added to user with email "${userEmail}".`,
      });
    } else {
      return res.status(404).json({
        status: 404,
        data: req.body,
        message: `User with e-mail "${userEmail}" was not found in database.`,
      });
    }
  } catch (err) {
    console.log(err.stack);
  } finally {
    client.close();
  }
};

//--------------------------------------------------------------------
//getting User from Db based on email
//--------------------------------------------------------------------
const getUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const userEmail = req.body.email;

  try {
    const db = await client.db("N4S");

    // checks if user already exists
    const validateUser = await db
      .collection("Users")
      .findOne({ _id: userEmail });

    if (validateUser === null) {
      return res.status(200).json({
        status: 404,
        data: null,
        message: `User with e-mail "${userEmail}" was not found in database.`,
      });
    } else {
      return res.status(404).json({
        status: 200,
        data: validateUser,
        message: `User with e-mail "${userEmail}" was successfully found in database.`,
      });
    }
  } catch (err) {
    console.log(err.stack);
  } finally {
    client.close();
  }
};

module.exports = {
  getAllProducts,
  getAllIncentives,
  getMonthlyConsumption,
  getSolarPanelData,
  getCostPerKWH,
  addUser,
  addItems,
  addLocation,
  getUser,
};
