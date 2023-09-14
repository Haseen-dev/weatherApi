const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const User = require('../models/User');
const cron = require('node-cron');
const { sendWeatherReport } = require('./services/emailService');

const app = express();
const PORT = 3000;

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/weatherApi", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use('/api', userRoutes);

// Schedule the cron job to run every 3 hour
cron.schedule('0 */3 * * *', async () => {
  const users = await User.find();
  for (const user of users) {
    const weatherData = await fetchWeatherData(user.location);
    sendWeatherReport(user.email, JSON.stringify(weatherData));
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
