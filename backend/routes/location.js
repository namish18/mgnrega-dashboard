const express = require('express');
const router = express.Router();
const { detectByIp, reverseGeocode } = require('../services/locationService');

router.get('/detect-by-ip', async (req, res) => {
  try {
    const clientIp = req.headers['x-forwarded-for'] || req.ip || req.connection.remoteAddress;
    const district = await detectByIp(clientIp);
    if (!district) return res.status(404).json({ error: 'not_found' });
    res.json(district);
  } catch (e) {
    res.status(500).json({ error: 'ip_detection_failed' });
  }
});

router.post('/reverse-geocode', async (req, res) => {
  try {
    const { latitude, longitude } = req.body || {};
    if (typeof latitude !== 'number' || typeof longitude !== 'number') return res.status(400).json({ error: 'invalid_coords' });
    const district = await reverseGeocode(latitude, longitude);
    if (!district) return res.status(404).json({ error: 'not_found' });
    res.json(district);
  } catch (e) {
    res.status(500).json({ error: 'reverse_geocode_failed' });
  }
});

module.exports = router;
