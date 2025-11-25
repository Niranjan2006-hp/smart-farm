const cropGuides = {
    Wheat: [
        "Step 1: Prepare the land by plowing and leveling.",
        "Step 2: Sow the seeds at a depth of 2-3 cm.",
        "Step 3: Irrigate immediately after sowing.",
        "Step 4: Apply nitrogen fertilizer 2 weeks after germination.",
        "Step 5: Harvest after 120 days or when grains turn golden."
    ],
    Maize: [
        "Step 1: Prepare the field by plowing.",
        "Step 2: Sow seeds 5-7 cm deep with 60cm spacing.",
        "Step 3: Irrigate weekly or according to rainfall.",
        "Step 4: Apply fertilizer 3 weeks after sowing.",
        "Step 5: Harvest after 90-100 days."
    ],
    Rice: [
        "Step 1: Prepare flooded fields (paddy fields).",
        "Step 2: Transplant seedlings after 20-30 days.",
        "Step 3: Maintain water level during growth.",
        "Step 4: Apply fertilizer 3 weeks after transplanting.",
        "Step 5: Harvest after 120 days."
    ],
    Tomato: [
        "Step 1: Prepare raised beds for planting.",
        "Step 2: Sow seeds in nursery trays.",
        "Step 3: Transplant seedlings after 4-6 weeks.",
        "Step 4: Water daily and apply fertilizer every 2 weeks.",
        "Step 5: Harvest fruits after 70-80 days."
    ],
    Soybean: [
        "Step 1: Plow and level the land.",
        "Step 2: Sow seeds 3-5 cm deep.",
        "Step 3: Apply starter fertilizer at sowing.",
        "Step 4: Irrigate based on rainfall.",
        "Step 5: Harvest after 90-100 days."
    ],
    Groundnut: [
        "Step 1: Plow the soil and remove weeds.",
        "Step 2: Sow seeds 5 cm deep with spacing 30cm.",
        "Step 3: Apply fertilizer at sowing.",
        "Step 4: Irrigate regularly.",
        "Step 5: Harvest after 120 days."
    ]
};

const getGuide = (crops) => {
    let result = {};
    crops.forEach(crop => {
        if(cropGuides[crop]){
            result[crop] = cropGuides[crop];
        }
    });
    return result;
};

module.exports = { getGuide };
