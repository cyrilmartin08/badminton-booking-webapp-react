// Simple Express backend for bookings
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3001;

const BOOKINGS_FILE = path.join(__dirname, '../data/bookings.json');

app.use(express.json());

app.get('/api/bookings', (req, res) => {
  fs.readFile(BOOKINGS_FILE, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to read bookings.' });
    res.json(JSON.parse(data));
  });
});

app.post('/api/bookings', (req, res) => {
  const newBooking = req.body;
  fs.readFile(BOOKINGS_FILE, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to read bookings.' });
    let bookings = JSON.parse(data);
    bookings.push(newBooking);
    fs.writeFile(BOOKINGS_FILE, JSON.stringify(bookings, null, 2), (err) => {
      if (err) return res.status(500).json({ error: 'Failed to save booking.' });
      res.status(201).json(newBooking);
    });
  });
});

app.listen(PORT, () => {
  console.log(`Bookings backend running on http://localhost:${PORT}`);
});
