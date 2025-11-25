const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    districts: [
      {
        district: "Davanagere",
        villages: [
          "Harihara",
          "Jagalur",
          "Honnali",
          "Nyamathi",
          "Channagiri",
          "Santhebennur"
        ]
      },
      {
        district: "Bangalore Rural",
        villages: [
          "Nelamangala",
          "Devanahalli",
          "Hoskote",
          "Doddaballapura",
          "Vijayapura"
        ]
      },
      {
        district: "Shivamogga",
        villages: [
          "Thirthahalli",
          "Sagara",
          "Hosanagara",
          "Bhadravati",
          "Shikaripura"
        ]
      }
    ]
  });
});

module.exports = router;
