const express = require('express');
const router = express.Router();

let farmers = []; // temporary storage, replace with DB in production

router.post('/add', (req, res) => {
    const { name, location, landSize, soilType, waterAvailability } = req.body;
    if (!name || !location || !landSize || !soilType || !waterAvailability) {
        return res.status(400).json({ message: "All fields are required" });
    }

    farmers.push({ name, location, landSize, soilType, waterAvailability });
    res.json({ message: `Farmer ${name} added successfully` });
});

module.exports = router;
