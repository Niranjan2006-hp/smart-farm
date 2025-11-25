const express = require('express');
const router = express.Router();

const guidesDB = {
    Wheat: [
        "Plow the field thoroughly.",
        "Sow wheat seeds 2-3 cm deep.",
        "Irrigate immediately after sowing."
    ],
    Maize: [
        "Plow the field.",
        "Sow maize seeds 5-7 cm deep.",
        "Maintain proper spacing."
    ],
    Rice: [
        "Prepare puddled field.",
        "Sow rice seeds or transplant seedlings.",
        "Keep water 2-3 cm above soil level."
    ],
    Tomato: [
        "Prepare well-drained soil.",
        "Plant seedlings at proper spacing.",
        "Apply mulch to retain moisture."
    ],
    Soybean: [
        "Plow and harrow the field.",
        "Sow seeds 3-5 cm deep.",
        "Ensure proper irrigation."
    ],
    Groundnut: [
        "Plow sandy soil deeply.",
        "Sow seeds in rows with spacing.",
        "Maintain soil moisture."
    ]
};

router.post('/', (req, res) => {
    const { crops } = req.body;
    if (!crops || !Array.isArray(crops)) return res.status(400).json({ error: "Invalid crops array" });

    const guide = {};
    crops.forEach(crop => {
        guide[crop] = guidesDB[crop] || ["Guide not available"];
    });

    res.json({ guide });
});

module.exports = router;
