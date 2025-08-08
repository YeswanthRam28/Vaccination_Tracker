const express = require('express');
const fs = require('fs');
const cors = require('cors');
const https = require('https');

const app = express();
app.use(cors());
app.use(express.json());

// ----------------------
// Save vaccination data
// ----------------------
app.post('/submit', (req, res) => {
  fs.readFile('data.json', 'utf8', (err, data) => {
    let records = [];

    if (!err && data) {
      try {
        records = JSON.parse(data);
      } catch (e) {
        console.error('Invalid JSON format in data.json');
      }
    }

    records.push(req.body);

    fs.writeFile('data.json', JSON.stringify(records, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Could not save data' });
      }
      res.json({ message: 'Data saved successfully' });
    });
  });
});

// --------------------------
// Get vaccination summary
// --------------------------
app.get('/summary', (req, res) => {
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Could not read data file' });
    }

    let records = [];
    try {
      records = JSON.parse(data);
    } catch (e) {
      return res.status(500).json({ error: 'Invalid JSON format' });
    }

    const vaccineSummary = {};
    const doseSummary = {};
    const areaDoseSummary = {};

    records.forEach(r => {
      vaccineSummary[r.vaccine] = (vaccineSummary[r.vaccine] || 0) + 1;
      doseSummary[r.dose] = (doseSummary[r.dose] || 0) + 1;

      if (!areaDoseSummary[r.area]) {
        areaDoseSummary[r.area] = {};
      }
      areaDoseSummary[r.area][r.dose] = (areaDoseSummary[r.area][r.dose] || 0) + 1;
    });

    res.json({ vaccineSummary, doseSummary, areaDoseSummary });
  });
});

// -------------------
// Reminder System
// -------------------
const remindersFile = 'reminders.json';

app.get('/reminders', (req, res) => {
  fs.readFile(remindersFile, 'utf8', (err, data) => {
    if (err) return res.json([]);
    try {
      res.json(JSON.parse(data));
    } catch {
      res.json([]);
    }
  });
});

app.post('/reminders', (req, res) => {
  const { name, dueDate } = req.body;
  if (!name || !dueDate) {
    return res.status(400).json({ error: 'Name and due date required' });
  }

  fs.readFile(remindersFile, 'utf8', (err, data) => {
    let reminders = [];
    if (!err) {
      try {
        reminders = JSON.parse(data);
      } catch {
        reminders = [];
      }
    }

    reminders.push({ name, dueDate });
    fs.writeFile(remindersFile, JSON.stringify(reminders, null, 2), err => {
      if (err) return res.status(500).json({ error: 'Failed to save reminder' });
      res.json({ success: true });
    });
  });
});

// -------------------------------------
// ✅ FIXED: Official Vaccine Stats API
// -------------------------------------
app.get('/official-vaccine-stats', (req, res) => {
  const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
  const apiUrl = `https://api.cowin.gov.in/api/v1/reports/v2/getPublicReports?state_id=&district_id=&date=${today}`;

  https.get(apiUrl, (resp) => {
    let data = '';

    resp.on('data', (chunk) => {
      data += chunk;
    });

    resp.on('end', () => {
      try {
        const parsedData = JSON.parse(data);
        const totalDoses = parsedData?.topBlock?.vaccination?.total || 0;
        res.json({ totalDoses });
      } catch (err) {
        console.error('Error parsing CoWIN API:', err);
        res.status(500).json({ error: 'Invalid API response format' });
      }
    });

  }).on('error', (err) => {
    console.error('Error fetching CoWIN API:', err);
    res.status(500).json({ error: 'Unable to fetch official data' });
  });
});

// -------------------------
// Start the server
// -------------------------
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
