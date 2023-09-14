const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { fetchWeatherData } = require("../services/weatherService");

// Create a new user
router.post("/users", async (req, res) => {
  try {
    const { email, location } = req.body;
    const user = new User({ email, location });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update user location
router.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { location } = req.body;
    const user = await User.findByIdAndUpdate(id, { location }, { new: true });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get user weather data for a given location
router.get("/users/:id", async (req, res) => {
  try {
    const { id, email } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const weatherData = await fetchWeatherData(user.location);
    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ error: "Error fetching weather data" });
  }
});

module.exports = router;
