const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const eventRoutes = require("./routes/events");

const app = express();
const port = process.env.PORT || 8080;

// Enable CORS for all origins
app.use(cors());

app.use(bodyParser.json());

app.use("/events", eventRoutes);

// Global error handler
app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Something went wrong.";
  res.status(status).json({ message: message });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
