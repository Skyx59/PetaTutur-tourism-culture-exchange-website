import express from 'express';
import db from '../db/db.js';
import { REGION_DATA } from '../db/seed-cultural-data.js';

const router = express.Router();

function findSeedLocations(region) {
    const regionData = REGION_DATA.find(item => item.region === region);
    if (!regionData) return [];

    return regionData.locations.map(([city, name, description, category, tags]) => ({
        city,
        name,
        description,
        category,
        tags: JSON.stringify(tags)
    }));
}

function parseRouteData(value) {
    if (Array.isArray(value)) return value;
    if (!value) return [];
    try {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

function toDateOnly(value) {
    if (!value) return '';
    if (value instanceof Date) {
        const year = value.getFullYear();
        const month = String(value.getMonth() + 1).padStart(2, '0');
        const day = String(value.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    return String(value).slice(0, 10);
}

function deriveItineraryStatus(travelDate, routeData) {
    const dateOnly = toDateOnly(travelDate);
    if (!dateOnly) return 'Draft';

    const route = parseRouteData(routeData);
    const lastTime = route.length > 0 ? route[route.length - 1].time : '23:59';
    const [hours = '23', minutes = '59'] = String(lastTime).split(':');
    const endsAt = new Date(`${dateOnly}T${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`);

    return endsAt <= new Date() ? 'Completed' : 'Draft';
}

async function loadRegionLocations(region) {
    const seedLocations = findSeedLocations(region);

    try {
        const [locations] = await db.execute(
            'SELECT name, city, description, category, tags FROM locations WHERE region = ?',
            [region]
        );
        return seedLocations.length > 0 && locations.length < seedLocations.length ? seedLocations : locations;
    } catch (error) {
        if (seedLocations.length > 0) return seedLocations;
        throw error;
    }
}

// GET /api/itinerary/history/:userId
router.get('/history/:userId', async (req, res) => {
    try {
        const [rows] = await db.execute(
            `SELECT
                id,
                tourist_id,
                title,
                DATE_FORMAT(travel_date, '%Y-%m-%d') AS travel_date,
                region,
                hours,
                route_data,
                status,
                created_at
             FROM itineraries
             WHERE tourist_id = ?
             ORDER BY created_at DESC`,
            [req.params.userId]
        );

        const normalizedRows = rows.map(row => ({
            ...row,
            status: deriveItineraryStatus(row.travel_date, row.route_data)
        }));

        const completedIds = normalizedRows
            .filter(row => row.status === 'Completed')
            .map(row => row.id);

        if (completedIds.length > 0) {
            await Promise.all(completedIds.map(id => (
                db.execute('UPDATE itineraries SET status = ? WHERE id = ?', ['Completed', id])
            )));
        }

        res.json(normalizedRows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching history' });
    }
});

// POST /api/itinerary/generate
router.post('/generate', async (req, res) => {
    const { region, hours, travelDate } = req.body;
    try {
        const locations = await loadRegionLocations(region);

        if (locations.length === 0) {
            return res.status(404).json({ message: 'Wilayah belum memiliki data lokasi wisata.' });
        }

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
                city: loc.city,
                category: loc.category,
                tags: loc.tags,
                desc: `${loc.description} Kategori: ${loc.category}${loc.city ? ` di ${loc.city}` : ''}.`
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
        const status = deriveItineraryStatus(travelDate, routeData);
        const [result] = await db.execute(
            'INSERT INTO itineraries (tourist_id, title, travel_date, region, hours, route_data, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [touristId, title, travelDate, region, hours, JSON.stringify(routeData), status]
        );
        res.status(201).json({
            message: status === 'Completed'
                ? 'Itinerary tersimpan sebagai selesai karena waktu perjalanan sudah berlalu.'
                : 'Itinerary berhasil disimpan sebagai pending.',
            id: result.insertId,
            status
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error saving itinerary' });
    }
});

export default router;
