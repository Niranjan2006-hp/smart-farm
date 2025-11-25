// server/controllers/farmUtils.js

// Simple example: water requirement per acre per crop (liters)
const waterRequirement = {
    Wheat: 4500,
    Maize: 6000,
    Rice: 7000,
    Tomato: 5000,
    Soybean: 4000,
    Groundnut: 4500
};

// Fertilizer requirement per acre per crop (kg)
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
        // Adjust water based on rainfall
        let rainfallEffect = weather.rainfall || 0;
        let water = waterRequirement[crop] * landSize;
        if (rainfallEffect > 0) {
            water = Math.max(0, water - rainfallEffect * landSize * 10); // reduce based on rainfall
        }

        let fertilizer = fertilizerRequirement[crop] * landSize;

        result[crop] = {
            water: Math.round(water),        // liters
            fertilizer: Math.round(fertilizer) // kg
        };
    });

    return result;
};

module.exports = { calculateIrrigationAndFertilizer };
