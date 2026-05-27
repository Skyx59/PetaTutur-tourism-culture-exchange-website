import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

// Mock Auth Routes
app.post('/api/register', (req, res) => {
    const { name, email, role, specific_data } = req.body;
    console.log(`Registering user: ${name} (${role})`);
    
    // Status is 'pending' for Produsen, 'approved' for Konsumen by default for this mock
    const status = role === 'Produsen' ? 'pending' : 'approved';
    
    res.status(201).json({
        message: 'User registered successfully',
        user: { name, email, role, status, specific_data }
    });
});

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    console.log(`Login attempt: ${email}`);
    
    // Mock login logic
    if (email === 'admin@petatutur.com' && password === 'admin123') {
        return res.json({
            message: 'Login successful',
            user: { name: 'Super Admin', role: 'Superadmin' }
        });
    }
    
    res.json({
        message: 'Login successful',
        user: { name: 'Budi Santoso', role: 'Konsumen' }
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
