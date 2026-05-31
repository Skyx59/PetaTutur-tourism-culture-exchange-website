import express from 'express';
import db from '../db/db.js';
import { REGION_DATA, buildNarratives } from '../db/seed-cultural-data.js';

const router = express.Router();

const REGION_META = {
    'DKI Jakarta': {
        description: 'Ruang temu Betawi, sejarah kolonial, museum nasional, dan kampung kota yang terus bergerak.',
        tags: ['betawi', 'sejarah', 'museum', 'maritim']
    },
    'Jawa Barat': {
        description: 'Tanah Pasundan dengan seni bambu, kampung adat, arsitektur kota, dan bentang alam vulkanik.',
        tags: ['sunda', 'angklung', 'kampung adat', 'vulkanik']
    },
    'Jawa Tengah': {
        description: 'Ruang candi, batik, kota lama, pesantren pesisir, dan lanskap pegunungan Jawa bagian tengah.',
        tags: ['candi', 'batik', 'jawa', 'kota lama']
    },
    'DI Yogyakarta': {
        description: 'Pusat kebudayaan Jawa dengan keraton, situs arkeologi, kampung kerajinan, dan narasi rakyat pesisir.',
        tags: ['keraton', 'batik', 'candi', 'jawa']
    },
    'Jawa Timur': {
        description: 'Bentang Majapahit, gunung api, pesantren pesisir, dan kota-kota lama di timur Jawa.',
        tags: ['majapahit', 'bromo', 'pesisir', 'candi']
    },
    Bali: {
        description: 'Pulau dengan desa adat, pura, subak, seni pertunjukan, dan lanskap sawah yang hidup bersama ritual.',
        tags: ['desa adat', 'pura', 'subak', 'ritual']
    },
    'Sumatera Barat': {
        description: 'Ranah Minang dengan rumah gadang, tradisi merantau, surau, kuliner, dan lanskap lembah vulkanik.',
        tags: ['minangkabau', 'rumah gadang', 'merantau', 'surau']
    },
    'Sumatera Utara': {
        description: 'Ruang Danau Toba, budaya Batak, kota Medan, perkebunan, dan koridor alam Sumatera bagian utara.',
        tags: ['batak', 'danau toba', 'medan', 'rumah adat']
    },
    Aceh: {
        description: 'Serambi Makkah dengan masjid bersejarah, memori tsunami, benteng pesisir, dan tradisi gampong.',
        tags: ['aceh', 'islam', 'tsunami', 'gampong']
    },
    'Sulawesi Selatan': {
        description: 'Bentang Bugis-Makassar, karst Maros, pelabuhan, benteng, dan tradisi Toraja di pegunungan.',
        tags: ['bugis', 'makassar', 'toraja', 'karst']
    },
    'Nusa Tenggara Barat': {
        description: 'Ruang Sasak, Rinjani, desa tenun, masjid tua, dan pesisir Lombok-Sumbawa.',
        tags: ['sasak', 'rinjani', 'tenun', 'desa adat']
    },
    'Kalimantan Timur': {
        description: 'Ruang Dayak, Kutai, hutan tropis, sungai, pesisir, dan kota-kota tambang serta pelabuhan.',
        tags: ['dayak', 'kutai', 'hutan', 'sungai']
    }
};

function parseJsonArray(value) {
    if (Array.isArray(value)) return value;
    if (!value) return [];
    try {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

function findSeedRegion(regionName) {
    return REGION_DATA.find(item => item.region === regionName);
}

function buildSeedRegionSummary(regionData) {
    return {
        region: regionData.region,
        count: buildNarratives(regionData).length,
        locationCount: regionData.locations.length,
        description: regionData.description,
        tags: regionData.tags
    };
}

function buildSeedNarrativeGroups(regionData) {
    const byLocation = new Map(regionData.locations.map(([city, name, description, category, tags], index) => [
        name,
        {
            id: `seed-location-${index + 1}`,
            city,
            name,
            description,
            category,
            tags,
            narratives: []
        }
    ]));

    buildNarratives(regionData).forEach((narrative, index) => {
        const target = byLocation.get(narrative.locationName);
        if (!target) return;

        target.narratives.push({
            id: `seed-narrative-${index + 1}`,
            title: narrative.title,
            description: narrative.description,
            narrativeType: narrative.narrativeType,
            mediaType: narrative.mediaType,
            mediaPath: narrative.mediaPath || '',
            providerName: 'Peta Tutur Cultural Seed',
            tags: narrative.tags
        });
    });

    return [...byLocation.values()];
}

// GET /api/catalog - Get all regions with narrative counts
router.get('/', async (req, res) => {
    try {
        const [regions] = await db.execute(`
            SELECT
                l.region,
                COUNT(DISTINCT l.id) AS location_count,
                COUNT(n.id) AS narrative_count
            FROM locations l
            LEFT JOIN narratives n
                ON n.location_id = l.id
               AND n.approval_status = 'approved'
            GROUP BY l.region
            ORDER BY l.region
        `);

        const rowsByRegion = new Map(regions.map(row => [row.region, row]));
        const seededRegionNames = new Set(REGION_DATA.map(item => item.region));

        const result = REGION_DATA.map(regionData => {
            const row = rowsByRegion.get(regionData.region);
            if (!row) return buildSeedRegionSummary(regionData);

            const narrativeCount = Number(row.narrative_count);
            if (narrativeCount === 0) return buildSeedRegionSummary(regionData);

            return {
                region: row.region,
                count: narrativeCount,
                locationCount: Number(row.location_count) || regionData.locations.length,
                description: REGION_META[row.region]?.description || regionData.description,
                tags: REGION_META[row.region]?.tags || regionData.tags
            };
        });

        regions
            .filter(row => !seededRegionNames.has(row.region))
            .forEach(row => {
                result.push({
                    region: row.region,
                    count: Number(row.narrative_count) || Number(row.location_count),
                    locationCount: Number(row.location_count),
                    description: REGION_META[row.region]?.description || 'Jelajahi keunikan budaya wilayah ini.',
                    tags: REGION_META[row.region]?.tags || []
                });
            });

        res.json(result);
    } catch (error) {
        console.error(error);
        res.json(REGION_DATA.map(buildSeedRegionSummary));
    }
});

router.get('/:region/narratives', async (req, res) => {
    const { region } = req.params;
    try {
        const [rows] = await db.execute(
            `SELECT
                l.id AS location_id,
                l.city,
                l.name,
                l.description AS location_description,
                l.category,
                l.tags AS location_tags,
                n.id AS narrative_id,
                n.title,
                n.description AS narrative_description,
                n.narrative_type,
                n.media_type,
                n.media_path,
                n.tags AS narrative_tags,
                u.name AS provider_name
            FROM locations l
            LEFT JOIN narratives n
                ON n.location_id = l.id
               AND n.approval_status = 'approved'
            LEFT JOIN users u ON u.id = n.provider_id
            WHERE l.region = ?
            ORDER BY l.city, l.name, n.narrative_type, n.id`,
            [region]
        );

        const grouped = new Map();
        rows.forEach(row => {
            if (!grouped.has(row.location_id)) {
                grouped.set(row.location_id, {
                    id: row.location_id,
                    city: row.city,
                    name: row.name,
                    description: row.location_description,
                    category: row.category,
                    tags: parseJsonArray(row.location_tags),
                    narratives: []
                });
            }

            if (row.narrative_id) {
                grouped.get(row.location_id).narratives.push({
                    id: row.narrative_id,
                    title: row.title || row.name,
                    description: row.narrative_description,
                    narrativeType: row.narrative_type || 'Cerita/Narasi',
                    mediaType: row.media_type || 'text',
                    mediaPath: row.media_path || '',
                    providerName: row.provider_name || 'Peta Tutur',
                    tags: parseJsonArray(row.narrative_tags)
                });
            }
        });

        const groupedValues = [...grouped.values()];
        const totalNarratives = groupedValues.reduce((sum, item) => sum + item.narratives.length, 0);
        const seedRegion = findSeedRegion(region);

        if (seedRegion && totalNarratives === 0) {
            return res.json(buildSeedNarrativeGroups(seedRegion));
        }

        res.json(groupedValues);
    } catch (error) {
        console.error(error);
        const seedRegion = findSeedRegion(region);
        if (seedRegion) {
            return res.json(buildSeedNarrativeGroups(seedRegion));
        }
        res.status(500).json({ message: 'Error fetching narratives' });
    }
});

export default router;
