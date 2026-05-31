import express from 'express';
import db from '../db/db.js';

const router = express.Router();

const parseSpecificData = (value) => {
    if (!value) return {};
    if (typeof value === 'object') return value;
    try {
        return JSON.parse(value);
    } catch {
        return {};
    }
};

// Mock Middleware for Superadmin check
const isSuperadmin = (req, res, next) => {
    // In a real app, this would check a JWT or session
    // For now, we'll assume the requester provides their role in headers for simulation
    const role = req.headers['x-user-role'];
    if (role === 'Superadmin') {
        next();
    } else {
        res.status(403).json({ message: 'Akses ditolak. Hanya Superadmin yang diizinkan.' });
    }
};

// GET /api/admin/pending-users
router.get('/pending-users', isSuperadmin, async (req, res) => {
    try {
        const [rows] = await db.execute(
            'SELECT id, name, email, role, status, specific_data, created_at FROM users WHERE status = "pending" AND role = "Penyedia Jasa" ORDER BY created_at ASC'
        );

        res.json(rows.map(user => ({
            ...user,
            specific_data: parseSpecificData(user.specific_data)
        })));
    } catch (error) {
        console.error('Pending users error:', error);
        res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
    }
});

// GET /api/admin/users
router.get('/users', isSuperadmin, async (req, res) => {
    try {
        const [rows] = await db.execute(
            'SELECT id, name, email, role, status, specific_data, created_at FROM users WHERE role IN ("Turis", "Penyedia Jasa") ORDER BY created_at DESC'
        );

        res.json(rows.map(user => ({
            ...user,
            specific_data: parseSpecificData(user.specific_data)
        })));
    } catch (error) {
        console.error('Users list error:', error);
        res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
    }
});

// GET /api/admin/stats
router.get('/stats', isSuperadmin, async (req, res) => {
    try {
        await db.execute('UPDATE users SET status = "approved" WHERE role = "Turis" AND status = "pending"');

        const [rows] = await db.execute(
            'SELECT role, status, COUNT(*) AS total FROM users WHERE role IN ("Turis", "Penyedia Jasa") GROUP BY role, status'
        );

        const stats = {
            pendingPenyedia: 0,
            approvedTuris: 0,
            approvedPenyedia: 0
        };

        rows.forEach(row => {
            if (row.role === 'Penyedia Jasa' && row.status === 'pending') stats.pendingPenyedia = row.total;
            if (row.role === 'Turis' && row.status === 'approved') stats.approvedTuris = row.total;
            if (row.role === 'Penyedia Jasa' && row.status === 'approved') stats.approvedPenyedia = row.total;
        });

        res.json(stats);
    } catch (error) {
        console.error('Stats error:', error);
        res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
    }
});

// POST /api/admin/approve-user
router.post('/approve-user', isSuperadmin, async (req, res) => {
    const { user_id } = req.body;
    
    try {
        const [result] = await db.execute(
            'UPDATE users SET status = "approved" WHERE id = ? AND role = "Penyedia Jasa"',
            [user_id]
        );
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User tidak ditemukan.' });
        }
        
        res.status(200).json({ message: 'User berhasil disetujui.' });
    } catch (error) {
        console.error('Approval error:', error);
        res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
    }
});

// POST /api/admin/reject-user
router.post('/reject-user', isSuperadmin, async (req, res) => {
    const { user_id } = req.body;

    try {
        const [result] = await db.execute(
            'DELETE FROM users WHERE id = ? AND status = "pending" AND role = "Penyedia Jasa"',
            [user_id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User pending tidak ditemukan.' });
        }

        res.status(200).json({ message: 'Registrasi ditolak dan dihapus dari antrean.' });
    } catch (error) {
        console.error('Reject error:', error);
        res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
    }
});

export default router;
