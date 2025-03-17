const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const authenticateJWT = require("../middleware/authMiddleware");  // Import the JWT middleware
const router = express.Router();

// Google Login Route
router.get("/google", passport.authenticate("google", {
    scope: ["profile", "email"],
}));

// Google OAuth Callback Route
router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/login" }), (req, res) => {
    // Create a JWT token after successful authentication
    const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.redirect(`http://localhost:3000/dashboard?token=${token}`);  // Redirect to frontend with token
});

// Route to get current user
router.get("/current_user", authenticateJWT, (req, res) => {  // Apply middleware to protect this route
    res.send(req.user);  // Send current authenticated user
});

module.exports = router;
