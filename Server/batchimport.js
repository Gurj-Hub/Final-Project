const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "./.env" });
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const {
  costPerKWH,
  averageMonthlyKWH,
  incentives,
  productData,
  solarPanelData,
} = require("./data");
// ------------------------------------------------------
// for adding the data to the database
// ------------------------------------------------------
const batchImport = async () => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();

    const db = client.db("N4S");

    costPerProvince = await db.collection("Cost Per kWh").insertOne(costPerKWH);

    incentivePerProvince = await db
      .collection("Incentives")
      .insertOne(incentives);

    avgMonthlyConsump = await db
      .collection("Monthly kWh used/Province")
      .insertOne(averageMonthlyKWH);

    products = await db
      .collection("Product Data")
      .insertMany(productData.products);

    solarData = await db
      .collection("Solar Panel Data")
      .insertOne(solarPanelData);

    if (
      costPerProvince.acknowledged === true &&
      incentivePerProvince.acknowledged === true &&
      avgMonthlyConsump.acknowledged === true &&
      products.acknowledged === true &&
      solarData.acknowledged === true
    ) {
      console.log(costPerProvince);
      console.log(incentivePerProvince);
      console.log(avgMonthlyConsump);
      console.log(products);
      console.log(solarData);
      client.close();
    }
  } catch (err) {
    console.log(err.message);
  }
};

batchImport();
