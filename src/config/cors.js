const cors = require("cors");

const allowedOrigins = [
  "http://localhost:5173", // local dev
  "https://ogenz.com",
  "https://ogenzzz.vercel.app",
  "https://ogenzzz-co8vc9lin-sivas-projects-249659f8.vercel.app",
];

module.exports = cors({
  origin: function (origin, callback) {
    // allow requests with no origin (Postman, curl)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed"));
    }
  },
  methods: ["GET", "POST"],
});
