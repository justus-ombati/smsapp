const express = require('express');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const mongoose = require('mongoose');
const sendSMS = require('./sendSMS');



// Handling uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err.name, err.message);
  console.error('Shutting down due to uncaught exception...');
  process.exit(1);
});

const app = express();

module.exports = function smsServer() {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // Trigger route
  app.post('/data', async(req, res) => {
    const { capacity, volume, depth } = req.body;
    console.log(`Received message: \n ${JSON.stringify(data, null, 2)}`);

    try{
      const waterData = new WaterData({ capacity, volume, depth });
      await waterData.save();
      console.log('Data saved to database');

      res.status(200).json({
        status: 'success',
        message: 'Water level data received and saved',
        data: waterData
    });
    } catch (error) {
      console.error('Error saving data to database:', error);
      res.status(500).json({
          status: 'error',
          message: 'Failed to save data',
          error: error.message
      });
  }
});

     

    console.log(capacity, volume, depth);
    if (depth >= 25) {
      console.log('Depth is greater than or equal to 25. Taking action...');
      message = "The water level is high, just know that you will die soon if you stay there";
      sendSMS(message);
    }else if(depth >=15 && depth <=22){
      message = "Water levels are moderate but soon you will need to start moving";
      sendSMS(message);
    }else {
      message = "Water levels are low ";
      sendSMS(message)
    }

  // Incoming messages route
  app.post('/incoming-messages', (req, res) => {
    const data = req.body;
    console.log(`Received message: \n ${JSON.stringify(data, null, 2)}`);
    res.sendStatus(200);
  });

  // Delivery reports route
  app.post('/delivery-reports', (req, res) => {
    const data = req.body;
    console.log(`Received report: \n ${JSON.stringify(data, null, 2)}`);
    res.sendStatus(200);
  });

  // Last route for all other URL routes
  app.all('*', (req, res, next) => {
    const err = new CustomError(`Can't find ${req.originalUrl} on the server!`, 404);
    next(err);
  });


mongoose.connect(process.env.CONN_STR, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');

        // Start the server
        const PORT = process.env.PORT;
        const host = "0.0.0.0";
        const server = app.listen(PORT, host,() => {
            console.log(`App running on: http://${host}:${PORT}`);
        });

        // Handling unhandled rejections
        process.on('unhandledRejection', (err) => {
            console.error('Unhandled Rejection:', err.name, err.message);
            console.error('Shutting down due to unhandled rejection...');
            server.close(() => {
                process.exit(1);
            });
        });
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB:', err);
    });
}
