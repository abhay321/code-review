// For Setup Env variables
dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const https = require('https');
const fs = require("fs");
const express = require("express");
const cors = require("cors");

const isProduction = process.env.NODE_ENV === 'production';
const app = express();

// Allow cors origin access to access routes
var corsOptions = {
  origin: "*"
  // origin: "https://d1yooda1d0qdx0.cloudfront.net"
};
app.use(cors(corsOptions));

// For allow access of json data 
app.use(express.json());

// Foutes Collection
require("./backEnd/routes/product.routes")(app);

// Db Connection
const db = require("./backEnd/models/index");
db.sequelize.sync({ force: false }).then(() => {
  console.log("Drop and re-sync db.");
});

// Sample routes for testing
app.get("/", (req, res) => {
  res.json({ message: "What you are looking for." });
});

const PORT = process.env.PORT || 4000;
if(!isProduction){
  // Localhost Server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
}else{
  // Https server
  const keyData = process.env.NODE_ENV_KEY
  const certData = process.env.NODE_ENV_CERT
  var server = https.createServer({
    key: fs.readFileSync(keyData),
    cert: fs.readFileSync(certData)
  }, app);

  // using https module
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
}
