const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files (CSS, images, etc.)
app.use(express.static(path.join(__dirname)));

// Route to serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Amazon_clone.html'));
});

// Route for "see more" link
app.get('/see-more', (req, res) => {
    res.send('<h1>See More Page</h1><p>More content will be added here.</p>');
});

// Example routes for menu items
app.get('/fresh', (req, res) => {
    res.send('<h1>Fresh Page</h1><p>Welcome to the Fresh section.</p>');
});

app.get('/fashion', (req, res) => {
    res.send('<h1>Fashion Page</h1><p>Explore the latest fashion trends.</p>');
});

app.get('/electronics', (req, res) => {
    res.send('<h1>Electronics Page</h1><p>Find the best electronics here.</p>');
});

// Add more routes for other menu items as needed
app.get('/mobile', (req, res) => {
    res.send('<h1>Mobile Page</h1><p>Discover the latest mobile phones.</p>');
});

app.get('/bestseller', (req, res) => {
    res.send('<h1>Best Seller Page</h1><p>Check out our best-selling products.</p>');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});