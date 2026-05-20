import express from 'express';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

// Workaround for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

/*
// Database connection pool (Placeholder)
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
*/

// --- API Endpoints ---

// DB Query: Get all locations
app.get('/api/locations', async (req, res) => {
    // const [rows] = await pool.query('SELECT * FROM locations');
    res.json({ message: "Locations endpoint placeholder" });
});

// DB Query: Get narratives for a location
app.get('/api/narratives/:locationId', async (req, res) => {
    // const [rows] = await pool.query('SELECT * FROM folklore_narratives WHERE location_id = ?', [req.params.locationId]);
    res.json({ message: `Narratives for location ${req.params.locationId} placeholder` });
});

// External API Proxy: OpenRouteService
app.post('/api/route', async (req, res) => {
    // Proxy request to OpenRouteService API
    res.json({ message: "OpenRouteService proxy placeholder" });
});

// External API Proxy: Open-Meteo
app.get('/api/weather', async (req, res) => {
    // Proxy request to Open-Meteo API
    res.json({ message: "Open-Meteo proxy placeholder" });
});

// --- Server Init ---
app.listen(PORT, () => {
    console.log(`Peta Tutur backend running on port ${PORT}`);
});