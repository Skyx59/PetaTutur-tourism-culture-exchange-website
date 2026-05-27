import express from 'express';
import db from '../db/db.js';

const router = express.Router();

// GET /api/catalog - Get all regions with narrative counts
router.get('/', async (req, res) => {
    try {
        const [regions] = await db.execute('SELECT region, COUNT(*) as count FROM locations GROUP BY region');
        
        const descriptions = {
            'Jawa Barat': 'Tanah Pasundan yang kaya akan tradisi lisan dan seni pertunjukan yang memukau.',
            'DI Yogyakarta': 'Pusat kebudayaan Jawa dengan filosofi mendalam dan situs sejarah yang ikonik.',
            'Bali': 'Pulau Dewata dengan harmoni antara ritual, alam, and ekspresi seni tanpa batas.',
            'Sumatera Barat': 'Ranah Minang dengan kekayaan arsitektur, kuliner, dan sistem sosial unik.'
        };

        const result = regions.map(r => ({
            region: r.region,
            count: r.count,
            description: descriptions[r.region] || 'Jelajahi keunikan budaya wilayah ini.'
        }));

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching catalog' });
    }
});

router.get('/:region/narratives', async (req, res) => {
    const { region } = req.params;
    try {
        const [rows] = await db.execute(
            'SELECT name, description, category FROM locations WHERE region = ?',
            [region]
        );
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching narratives' });
    }
});

// POST /api/catalog/contribute
router.post('/contribute', async (req, res) => {
    const { provider_id, location_name, description, latitude, longitude, region } = req.body;
    try {
        await db.execute(
            'INSERT INTO narratives (provider_id, location_name, description, approval_status) VALUES (?, ?, ?, ?)',
            [provider_id, location_name, description, 'pending']
        );
        res.status(201).json({ message: 'Kontribusi berhasil dikirim' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Gagal mengirim kontribusi' });
    }
});

export default router;
