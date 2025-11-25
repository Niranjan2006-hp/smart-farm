const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  const { soilType, waterAvailability, landSize } = req.body;

  if (!soilType || !waterAvailability || !landSize) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const area = parseFloat(landSize);
  const waterPercent = parseFloat(waterAvailability); // 0-100%

  // MASTER CROP DATABASE
  const cropDatabase = {
    Sandy: [
      { crop: "Carrot", season: "Winter", expectedYield: "2.5 tons", waterPerAcre: 20000, fertilizer: "Compost 80 kg", instructions: "Deep plowing, frequent irrigation" },
      { crop: "Groundnut", season: "Kharif", expectedYield: "15 quintals", waterPerAcre: 15000, fertilizer: "NPK 45 kg", instructions: "Moderate watering, loose soil" },
      { crop: "Millet", season: "Any", expectedYield: "10 quintals", waterPerAcre: 9000, fertilizer: "Organic manure", instructions: "Low water needed" }
    ],
    Clay: [
      { crop: "Paddy", season: "Kharif", expectedYield: "30 quintals", waterPerAcre: 30000, fertilizer: "Urea 60 kg", instructions: "Requires flooding" },
      { crop: "Sugarcane", season: "Year-round", expectedYield: "40 tons", waterPerAcre: 40000, fertilizer: "NPK 90 kg", instructions: "High water crop" },
      { crop: "Cotton", season: "Kharif", expectedYield: "12 quintals", waterPerAcre: 25000, fertilizer: "Potash 40 kg", instructions: "Deep plowing needed" }
    ],
    Loamy: [
      { crop: "Wheat", season: "Rabi", expectedYield: "3 tons", waterPerAcre: 18000, fertilizer: "NPK 50 kg", instructions: "Light irrigation" },
      { crop: "Maize", season: "Kharif", expectedYield: "25 quintals", waterPerAcre: 15000, fertilizer: "DAP 45 kg", instructions: "Good drainage needed" },
      { crop: "Sunflower", season: "Any", expectedYield: "8 quintals", waterPerAcre: 12000, fertilizer: "NPK 40 kg", instructions: "Requires sunlight" }
    ],
    BlackSoil: [
      { crop: "Cotton", season: "Kharif", expectedYield: "15 quintals", waterPerAcre: 20000, fertilizer: "NPK 50 kg", instructions: "Good moisture retention" },
      { crop: "Soybean", season: "Kharif", expectedYield: "12 quintals", waterPerAcre: 16000, fertilizer: "Phosphate 40 kg", instructions: "Moderate water" }
    ],
    RedSoil: [
      { crop: "Ragi", season: "Any", expectedYield: "10 quintals", waterPerAcre: 10000, fertilizer: "Compost 50 kg", instructions: "Low water required" },
      { crop: "Groundnut", season: "Kharif", expectedYield: "14 quintals", waterPerAcre: 12000, fertilizer: "NPK 45 kg", instructions: "Dry land crop" },
    ],
    Peaty: [
      { crop: "Cabbage", season: "Winter", expectedYield: "5 tons", waterPerAcre: 22000, fertilizer: "Compost 60 kg", instructions: "Well-drained soil" },
      { crop: "Potato", season: "Winter", expectedYield: "10 tons", waterPerAcre: 25000, fertilizer: "Organic manure 50 kg", instructions: "Moderate watering" }
    ],
    Chalky: [
      { crop: "Barley", season: "Rabi", expectedYield: "8 quintals", waterPerAcre: 15000, fertilizer: "Compost 40 kg", instructions: "Light irrigation" },
      { crop: "Mustard", season: "Rabi", expectedYield: "10 quintals", waterPerAcre: 12000, fertilizer: "NPK 35 kg", instructions: "Well-drained soil" }
    ]
  };

  // Check if soil type exists
  const cropsForSoil = cropDatabase[soilType] || [];

  // Calculate available water in liters (assuming 100,000 L per acre at 100%)
  const availableWaterLiters = (waterPercent / 100) * 100000 * area;

  // Filter crops by available water
  const recommendedCrops = cropsForSoil.filter(crop => crop.waterPerAcre * area <= availableWaterLiters);

  if (recommendedCrops.length === 0) {
    return res.json({
      message: "No crops found for this soil type and water availability.",
      recommendedCrops: []
    });
  }

  return res.json({ recommendedCrops });
});

module.exports = router;
