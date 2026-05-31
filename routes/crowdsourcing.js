import express from 'express';
import db from '../db/db.js';

const router = express.Router();
const ALLOWED_ROLES = ['Penyedia Jasa', 'Superadmin'];

const requireCrowdsourcingAccess = (req, res, next) => {
    const role = req.headers['x-user-role'];
    if (ALLOWED_ROLES.includes(role)) return next();
    res.status(403).json({ message: 'Akses crowdsourcing hanya untuk Penyedia Jasa dan Superadmin.' });
};

const requireSuperadmin = (req, res, next) => {
    const role = req.headers['x-user-role'];
    if (role === 'Superadmin') return next();
    res.status(403).json({ message: 'Aksi ini hanya untuk Superadmin.' });
};

// GET /api/crowdsourcing
router.get('/', requireCrowdsourcingAccess, async (req, res) => {
    try {
        const [rows] = await db.execute(`
            SELECT
                n.id,
                n.provider_id,
                n.location_name,
                n.description,
                n.media_path,
                n.approval_status,
                n.created_at,
                u.name AS provider_name,
                u.email AS provider_email
            FROM narratives n
            LEFT JOIN users u ON u.id = n.provider_id
            ORDER BY n.created_at DESC
        `);

        res.json(rows);
    } catch (error) {
        console.error('Crowdsourcing list error:', error);
        res.status(500).json({ message: 'Gagal memuat kontribusi crowdsourcing.' });
    }
});

// POST /api/crowdsourcing
router.post('/', requireCrowdsourcingAccess, async (req, res) => {
    const userId = Number(req.headers['x-user-id']);
    const role = req.headers['x-user-role'];
    const { locationName, description, locationId = null, mediaPath = null } = req.body;

    if (!userId || !locationName || !description) {
        return res.status(400).json({ message: 'Nama lokasi dan narasi wajib diisi.' });
    }

    try {
        const approvalStatus = role === 'Superadmin' ? 'approved' : 'pending';
        const [result] = await db.execute(
            'INSERT INTO narratives (provider_id, location_id, location_name, description, media_path, approval_status) VALUES (?, ?, ?, ?, ?, ?)',
            [userId, locationId, locationName, description, mediaPath, approvalStatus]
        );

        res.status(201).json({
            id: result.insertId,
            message: role === 'Superadmin'
                ? 'Kontribusi berhasil diterbitkan.'
                : 'Kontribusi terkirim dan menunggu kurasi Superadmin.'
        });
    } catch (error) {
        console.error('Crowdsourcing create error:', error);
        res.status(500).json({ message: 'Gagal menyimpan kontribusi crowdsourcing.' });
    }
});

// PATCH /api/crowdsourcing/:id/status
router.patch('/:id/status', requireSuperadmin, async (req, res) => {
    const { status } = req.body;

    if (!['pending', 'approved', 'rejected'].includes(status)) {
        return res.status(400).json({ message: 'Status kontribusi tidak valid.' });
    }

    try {
        const [result] = await db.execute(
            'UPDATE narratives SET approval_status = ? WHERE id = ?',
            [status, req.params.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Kontribusi tidak ditemukan.' });
        }

        res.json({ message: 'Status kontribusi berhasil diperbarui.' });
    } catch (error) {
        console.error('Crowdsourcing status error:', error);
        res.status(500).json({ message: 'Gagal memperbarui status kontribusi.' });
    }
});

export default router;
