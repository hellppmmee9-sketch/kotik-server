const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let leaderboard = [];

// Получить топ
app.get('/api/leaderboard', (req, res) => {
    const sorted = [...leaderboard].sort((a, b) => b.balance - a.balance).slice(0, 10);
    res.json(sorted);
});

// Обновить рекорд
app.post('/api/update-score', (req, res) => {
    const { name, balance } = req.body;
    if (!name || balance === undefined) return res.status(400).json({error: "Bad data"});
    
    const existing = leaderboard.find(p => p.name === name);
    if (existing) {
        if (balance > existing.balance) existing.balance = balance;
    } else {
        leaderboard.push({ name, balance });
    }
    res.json({ success: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server running on port ' + PORT));
