const express = require('express');
const router = express.Router();
const Record = require('../models/Record');

// POST /submit - Add record
router.post('/submit', async (req, res) => {
  try {
    const record = new Record(req.body);
    await record.save();
    res.status(201).json({ message: 'Record saved' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /records - Get all records
router.get('/records', async (req, res) => {
  try {
    const records = await Record.find();
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /summary - Data for visualization
router.get('/summary', async (req, res) => {
  try {
    const summary = await Record.aggregate([
      {
        $group: {
          _id: '$vaccine',
          count: { $sum: 1 }
        }
      }
    ]);
    
    const doseSummary = await Record.aggregate([
      {
        $group: {
          _id: '$dose',
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({ vaccineSummary: summary, doseSummary });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
