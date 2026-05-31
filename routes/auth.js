import express from 'express';
import db from '../db/db.js';

const router = express.Router();
const SUPERADMIN_GATE_KEY = process.env.SUPERADMIN_GATE_KEY || 'aksara-tutur-1979';

const parseSpecificData = (value) => {
    if (!value) return {};
    if (typeof value === 'object') return value;
    try {
        return JSON.parse(value);
    } catch {
        return {};
    }
};

// POST /api/auth/register
router.post('/register', async (req, res) => {
    const { name, email, password, role, specific_data } = req.body;
    
    try {
        if (!['Turis', 'Penyedia Jasa'].includes(role)) {
            return res.status(400).json({ message: 'Role registrasi tidak valid.' });
        }

        const status = role === 'Turis' ? 'approved' : 'pending';
        
        const [result] = await db.execute(
            'INSERT INTO users (name, email, password, role, status, specific_data) VALUES (?, ?, ?, ?, ?, ?)',
            [name, email, password, role, status, JSON.stringify(specific_data || {})]
        );
        
        const message = role === 'Turis'
            ? 'Registrasi berhasil. Silakan masuk menggunakan akun Anda.'
            : 'Registrasi berhasil. Akun penyedia jasa menunggu persetujuan Superadmin.';

        res.status(201).json({ message, userId: result.insertId });
    } catch (error) {
        console.error('Registration error:', error);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: 'Email sudah terdaftar.' });
        }
        res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
    }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const [rows] = await db.execute(
            'SELECT id, name, email, password, role, status, specific_data FROM users WHERE email = ?',
            [email]
        );
        
        if (rows.length === 0 || rows[0].password !== password) {
            return res.status(401).json({ message: 'Email atau password salah.' });
        }
        
        const user = rows[0];

        if (user.role === 'Superadmin') {
            return res.status(403).json({ message: 'Superadmin masuk melalui Gerbang Tutur khusus.' });
        }
        
        if (user.role === 'Turis' && user.status === 'pending') {
            await db.execute('UPDATE users SET status = "approved" WHERE id = ?', [user.id]);
            user.status = 'approved';
        }

        if (user.status === 'pending') {
            return res.status(403).json({ message: 'Akun penyedia jasa menunggu persetujuan Superadmin.' });
        }
        
        res.status(200).json({
            message: 'Login berhasil',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                status: user.status,
                specific_data: parseSpecificData(user.specific_data)
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
    }
});

// POST /api/auth/superadmin-gate
router.post('/superadmin-gate', async (req, res) => {
    const { gateKey } = req.body;

    if (gateKey !== SUPERADMIN_GATE_KEY) {
        return res.status(401).json({ message: 'Kunci Gerbang Tutur tidak cocok.' });
    }

    try {
        const [rows] = await db.execute(
            'SELECT id, name, email, role, status, specific_data FROM users WHERE role = "Superadmin" AND status = "approved" LIMIT 1'
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Akun Superadmin belum tersedia di database.' });
        }

        const user = rows[0];
        res.status(200).json({
            message: 'Gerbang Tutur terbuka.',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                status: user.status,
                specific_data: parseSpecificData(user.specific_data)
            }
        });
    } catch (error) {
        console.error('Superadmin gate error:', error);
        res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
    }
});

export default router;
