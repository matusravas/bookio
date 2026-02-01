import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;
const DATA_FILE = path.join(__dirname, 'data.json');

app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Get current data
app.get('/api/data', async (req, res) => {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    try {
      res.json(JSON.parse(data));
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      res.json({ months: {}, purposes: [] }); // Return default if corrupted/empty
    }
  } catch (error) {
    if (error.code === 'ENOENT') {
      res.json({ months: {}, purposes: [] }); // Return default if file doesn't exist
    } else {
      res.status(500).json({ error: 'Failed to read data' });
    }
  }
});

// Save data
app.post('/api/data', async (req, res) => {
  try {
    await fs.writeFile(DATA_FILE, JSON.stringify(req.body, null, 2), 'utf-8');
    res.json({ success: true });
  } catch (error) {
    console.error('Save error:', error);
    res.status(500).json({ error: 'Failed to save data' });
  }
});

app.listen(PORT, () => {
  console.log(`Persistence server running at http://localhost:${PORT}`);
});
