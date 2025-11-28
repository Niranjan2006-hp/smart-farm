const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Districts & Villages
const districts = [
  {
    district: "Bagalkot",
    villages: ["Aihole", "Badami", "Ronihal"]
  },
  {
    district: "Ballari",
    villages: ["Hospet", "Harapanahalli", "Hagaribommanahalli"]
  },
  {
    district: "Belagavi",
    villages: ["Chikkodi", "Gokak", "Athani"]
  },
  {
    district: "Bengaluru Rural",
    villages: ["Devanahalli", "Hoskote", "Nelamangala"]
  },
  {
    district: "Bengaluru Urban",
    villages: ["Yelahanka", "KR Puram", "Anekal"]
  },
  {
    district: "Bidar",
    villages: ["Bhalki", "Aurad", "Humnabad"]
  },
  {
    district: "Chamarajanagar",
    villages: ["Gundlupet", "Kollegal", "Hanur"]
  },
  {
    district: "Chikkaballapur",
    villages: ["Bagepalli", "Gauribidanur", "Sidlaghatta"]
  },
  {
    district: "Chikkamagaluru",
    villages: ["Mudigere", "Kadur", "Sringeri"]
  },
  {
    district: "Chitradurga",
    villages: ["Hosadurga", "Hiriyur", "Molakalmuru"]
  },
  {
    district: "Dakshina Kannada",
    villages: ["Moodbidri", "Puttur", "Belthangady"]
  },
  {
    district: "Davanagere",
    villages: ["Harihar", "Jagalur", "Harapanahalli"]
  },
  {
    district: "Dharwad",
    villages: ["Kalghatgi", "Hubli", "Navalgund"]
  },
  {
    district: "Gadag",
    villages: ["Ron", "Nargund", "Mundargi"]
  },
  {
    district: "Hassan",
    villages: ["Arsikere", "Alur", "Belur"]
  },
  {
    district: "Haveri",
    villages: ["Ranebennur", "Shiggaon", "Byadgi"]
  },
  {
    district: "Kalaburagi",
    villages: ["Aland", "Sedam", "Chincholi"]
  },
  {
    district: "Kodagu",
    villages: ["Madikeri", "Virajpet", "Somwarpet"]
  },
  {
    district: "Kolar",
    villages: ["Bangarapet", "Mulbagal", "Malur"]
  },
  {
    district: "Koppal",
    villages: ["Gangavati", "Kushtagi", "Yelburga"]
  },
  {
    district: "Mandya",
    villages: ["Srirangapatna", "Pandavapura", "Nagamangala"]
  },
  {
    district: "Mysuru",
    villages: ["Nanjangud", "T Narasipura", "Hunsur"]
  },
  {
    district: "Raichur",
    villages: ["Manvi", "Sindhanur", "Lingasugur"]
  },
  {
    district: "Ramanagara",
    villages: ["Channapatna", "Magadi", "Kanakapura"]
  },
  {
    district: "Shivamogga",
    villages: ["Bhadravati", "Thirthahalli", "Shikaripura"]
  },
  {
    district: "Tumakuru",
    villages: ["Gubbi", "Madhugiri", "Tiptur"]
  },
  {
    district: "Udupi",
    villages: ["Kundapur", "Karkala", "Udupi Town"]
  },
  {
    district: "Uttara Kannada",
    villages: ["Karwar", "Sirsi", "Dandeli"]
  },
  {
    district: "Vijayapura",
    villages: ["Indi", "Sindagi", "Muddebihal"]
  },
  {
    district: "Yadgir",
    villages: ["Shahapur", "Surpur", "Yadgir Town"]
  }
];
// Crop database
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
  Silty: [
    { crop: "Tomato", season: "Winter", expectedYield: "20 tons", waterPerAcre: 22000, fertilizer: "Compost 70 kg", instructions: "Frequent watering" },
    { crop: "Brinjal", season: "Winter", expectedYield: "15 tons", waterPerAcre: 20000, fertilizer: "NPK 50 kg", instructions: "Well-drained soil" },
    { crop: "Wheat", season: "Rabi", expectedYield: "3 tons", waterPerAcre: 18000, fertilizer: "NPK 50 kg", instructions: "Light irrigation" },
    { crop: "Millet", season: "Any", expectedYield: "10 quintals", waterPerAcre: 9000, fertilizer: "Organic manure", instructions: "Low water needed" }
  ],
  Peaty: [
    { crop: "Cabbage", season: "Any", expectedYield: "10 quintals", waterPerAcre: 15000, fertilizer: "Organic manure", instructions: "Moist soil preferred" },
    { crop: "Potato", season: "Winter", expectedYield: "15 quintals", waterPerAcre: 18000, fertilizer: "Compost 50 kg", instructions: "Loose, rich soil" }
  ],
  Chalky: [
    { crop: "Barley", season: "Rabi", expectedYield: "8 quintals", waterPerAcre: 12000, fertilizer: "NPK 30 kg", instructions: "Well-drained soil needed" },
    { crop: "Mustard", season: "Rabi", expectedYield: "10 quintals", waterPerAcre: 15000, fertilizer: "Compost 40 kg", instructions: "Moderate watering" }
  ],
  RedSoil: [
    { crop: "Ragi", season: "Any", expectedYield: "10 quintals", waterPerAcre: 10000, fertilizer: "Compost 50 kg", instructions: "Low water required" },
    { crop: "Groundnut", season: "Kharif", expectedYield: "14 quintals", waterPerAcre: 12000, fertilizer: "NPK 45 kg", instructions: "Dry land crop" }
  ],
  BlackSoil: [
    { crop: "Cotton", season: "Kharif", expectedYield: "15 quintals", waterPerAcre: 20000, fertilizer: "NPK 50 kg", instructions: "Good moisture retention" },
    { crop: "Soybean", season: "Kharif", expectedYield: "12 quintals", waterPerAcre: 16000, fertilizer: "Phosphate 40 kg", instructions: "Moderate water" }
  ]
};

// API Endpoints
app.get("/api/villages", (req, res) => res.json({ districts }));

app.post("/api/recommendation", (req, res) => {
  const { soilType, waterAvailability, landSize } = req.body;

  if (!soilType || !waterAvailability || !landSize)
    return res.status(400).json({ error: "Missing fields" });

  const area = parseFloat(landSize);
  const waterPercent = parseFloat(waterAvailability);

  // Ensure we have water in liters (assume 100,000 L per acre = max)
  const availableWaterLiters = (waterPercent / 100) * 100000 * area;

  // Get crops for this soil type
  let crops = cropDatabase[soilType] || [];

  // Filter crops that can grow with available water
  crops = crops.filter(crop => availableWaterLiters >= crop.waterPerAcre * area);

  res.json({ recommendedCrops: crops });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});