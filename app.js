const express = require("express");
const path = require("path");
const fetch = require("node-fetch"); // Ensure to install node-fetch if you haven't already

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Endpoint to fetch random image from Azure Function
app.get("/api/GetRandomImage", async (req, res) => {
    try {
        const response = await fetch("https://<your-function-app-name>.azurewebsites.net/api/GetRandomImage");
        const data = await response.json();
        
        if (!response.ok) {
            return res.status(response.status).json(data);
        }
        
        res.json(data); // Send the image URL to the client
    } catch (error) {
        console.error("Error fetching image:", error);
        res.status(500).json({ error: "Failed to fetch image." });
    }
});

// Serve index.html at root
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});