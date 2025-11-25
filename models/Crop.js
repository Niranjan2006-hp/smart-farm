const mongoose = require('mongoose');

const CropSchema = new mongoose.Schema({
  name: { type: String, required: true },               // Crop name
  soilTypes: [{ type: String, required: true }],        // Example: ['Sandy', 'Loamy', 'Peaty']
  waterPerAcre: { type: Number, required: true },       // in liters per acre
  minWaterPercent: { type: Number, default: 0 },        // Minimum water availability %
  season: { type: String, default: "Any" },            // Example: "Winter", "Kharif", "Rabi"
  yieldPerAcre: { type: String, default: "" },          // e.g., '3 tons'
  fertilizer: { type: String, default: "" },            // Fertilizer info
  instructions: { type: String, default: "" },          // Special instructions
  imageUrl: { type: String, default: "" }              // URL for crop image
}, { timestamps: true });

module.exports = mongoose.model('Crop', CropSchema);
