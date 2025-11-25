// server/controllers/recommendation.js

const recommendCrops = (soilType, weather) => {
    // Soil-based crop suggestions
    const cropsBySoil = {
        Sandy: ['Maize', 'Groundnut'],
        Clay: ['Rice', 'Soybean'],
        Loamy: ['Wheat', 'Tomato']
    };

    let suitableCrops = cropsBySoil[soilType] || [];

    // Refine crops based on rainfall
    if (weather.rainfall < 20) {
        suitableCrops = suitableCrops.filter(crop => crop !== 'Rice'); // Rice needs more water
    } else if (weather.rainfall > 100) {
        suitableCrops = suitableCrops.filter(crop => crop !== 'Groundnut'); // Too much rain for groundnut
    }

    // Refine crops based on temperature
    if (weather.temp < 15) {
        suitableCrops = suitableCrops.filter(crop => crop !== 'Tomato'); // Tomatoes prefer warmer
    } else if (weather.temp > 35) {
        suitableCrops = suitableCrops.filter(crop => crop !== 'Wheat'); // Wheat stressed by high temp
    }

    return suitableCrops;
};

module.exports = { recommendCrops };
