import express from 'express';
import db from '../db/db.js';

const router = express.Router();

// GET /api/itinerary/history/:userId
router.get('/history/:userId', async (req, res) => {
    try {
        const [rows] = await db.execute(
            'SELECT * FROM itineraries WHERE tourist_id = ? ORDER BY created_at DESC',
            [req.params.userId]
        );
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching history' });
    }
});

// POST /api/itinerary/generate
router.post('/generate', async (req, res) => {
    const { region, hours, travelDate } = req.body;
    try {
        const [locations] = await db.execute(
            'SELECT name, description, category FROM locations WHERE region = ?',
            [region]
        );

        // Randomize order for variety
        const shuffled = locations.sort(() => 0.5 - Math.random());
        
        // Calculate number of locations based on hours (approx 2 hours per spot)
        const spotCount = Math.min(shuffled.length, Math.floor(hours / 2));
        const selected = shuffled.slice(0, spotCount);

        let currentHour = 9;
        const route = selected.map((loc) => {
            const time = String(currentHour).padStart(2, '0') + ':00';
            currentHour += 2;
            return {
                time,
                location: loc.name,
                desc: loc.description
            };
        });

        res.json({
            title: 'Eksplorasi ' + region,
            region,
            travelDate,
            hours,
            route
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error generating itinerary' });
    }
});

// POST /api/itinerary/save
router.post('/save', async (req, res) => {
    const { touristId, title, travelDate, region, hours, routeData } = req.body;
    try {
        const [result] = await db.execute(
            'INSERT INTO itineraries (tourist_id, title, travel_date, region, hours, route_data, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [touristId, title, travelDate, region, hours, JSON.stringify(routeData), 'Draft']
        );
        res.status(201).json({ message: 'Draft berhasil disimpan', id: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error saving itinerary' });
    }
});

// POST /api/itinerary/validate-location
router.post('/validate-location', async (req, res) => {
    const { userId, lat, lng } = req.body;
    try {
        // Find if user is near any cultural location (within ~500m)
        const [locations] = await db.execute('SELECT * FROM locations');
        
        let found = false;
        for (const loc of locations) {
            const dist = Math.sqrt(Math.pow(loc.latitude - lat, 2) + Math.pow(loc.longitude - lng, 2));
            if (dist < 0.005) { // Roughly 500m
                found = true;
                break;
            }
        }

        if (found) {
            // Update user points in DB
            const [users] = await db.execute('SELECT specific_data FROM users WHERE id = ?', [userId]);
            let data = users[0].specific_data || {};
            data.points = (data.points || 0) + 20;
            
            await db.execute('UPDATE users SET specific_data = ? WHERE id = ?', [JSON.stringify(data), userId]);
            res.json({ success: true, message: 'Lokasi tervalidasi!' });
        } else {
            res.json({ success: false, message: 'Anda tidak berada di lokasi budaya.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error validating location' });
    }
});

export default router;
