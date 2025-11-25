const express = require('express');
const router = express.Router();

// Water requirement per acre (liters)
const waterRequirement = {
    Wheat: 4500,
    Maize: 6000,
    Rice: 7000,
    Tomato: 5000,
    Soybean: 4000,
    Groundnut: 4500
};

// Fertilizer per acre (kg)
const fertilizerRequirement = {
    Wheat: 50,
    Maize: 60,
    Rice: 70,
    Tomato: 40,
    Soybean: 35,
    Groundnut: 45
};

const calculateIrrigationAndFertilizer = (crops, landSize, weather) => {
    let result = {};
    crops.forEach(crop => {
        let rainfallEffect = weather.rainfall || 0;
        let water = waterRequirement[crop] * landSize;
        if (rainfallEffect > 0) water = Math.max(0, water - rainfallEffect * landSize * 10);
        let fertilizer = fertilizerRequirement[crop] * landSize;

        result[crop] = {
            water: Math.round(water),
            fertilizer: Math.round(fertilizer)
        };
    });
    return result;
};

router.post('/', (req, res) => {
    const { crops, landSize, weather } = req.body;
    if (!crops || !landSize || !weather) return res.status(400).json({ error: "Missing data" });

    const irrigationFertilizer = calculateIrrigationAndFertilizer(crops, landSize, weather);
    res.json({ irrigationFertilizer });
});

module.exports = router;
