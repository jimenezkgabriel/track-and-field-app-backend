import express from 'express';
import dotenv from 'dotenv';
import { handler } from './netlify/functions/api.js';
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/.netlify/functions/api', handler);
const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => {
    res.send('Server is running');
});

app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});