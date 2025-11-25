const mongoose = require('mongoose');

const farmerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  landSize: { type: Number, required: true },
  soilType: { type: String, required: true },
  waterAvailability: { type: String, required: true },
  recommendedCrops: [
    {
      crop: String,
      water: Number,
      fertilizer: String,
      season: String,
      expectedYield: String
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Farmer', farmerSchema);
