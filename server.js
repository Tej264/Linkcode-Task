const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

const registrationRoutes = require('./registration.js');

app.use(bodyParser.json());
app.use(express.static(__dirname));
app.use(registrationRoutes);

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

// Admin Section
app.get('/admin.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

//login 

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname)); // Serve static files (HTML, CSS, JS)

const USERS_FILE = path.join(__dirname, 'users.json');

// Login endpoint
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    let users = [];
    if (fs.existsSync(USERS_FILE)) {
        const content = fs.readFileSync(USERS_FILE, 'utf-8').trim();
        if (content) {
            try {
                users = JSON.parse(content);
            } catch (e) {
                return res.json({ success: false, message: 'User database corrupted.' });
            }
        }
    }
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        res.json({ success: true, message: 'Login successful' });
    } else {
        res.json({ success: false, message: 'Invalid email or password' });
    }
});

// Serve login.html as the root page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

