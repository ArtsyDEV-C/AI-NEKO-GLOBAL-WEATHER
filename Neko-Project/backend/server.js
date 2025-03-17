require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const passport = require("passport");
const connectDB = require("./config/db"); // Import the new MongoDB connection file
require("./config/passport");  // Import passport configuration

// Import Routes
const authRoutes = require("./routes/authRoutes");
const weatherRoutes = require("./routes/weatherRoutes");
const chatbotRoutes = require("./routes/chatbotRoutes");

// Initialize Express App
const app = express();

// Middleware
app.use(express.json());  // Parses JSON requests
app.use(cors());  // Handles Cross-Origin Requests
app.use(morgan("dev"));  // Logs requests
app.use(helmet());  // Security headers
app.use(passport.initialize());  // Passport middleware

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/weather", weatherRoutes);
app.use("/api/chatbot", chatbotRoutes);

// Google Authentication Route
app.get('/api/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/api/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect home with JWT token.
    const token = req.user.generateJwt(); // Assuming generateJwt() is a method in user model
    res.redirect(`http://localhost:3000/dashboard?token=${token}`);
  });

// Connect to MongoDB
const PORT = process.env.PORT || 5000;
connectDB(); // Use the new MongoDB connection function
app.listen(PORT, () => console.log("Server running on port " + PORT));
console.log("MongoDB Connected");
