import dotenv from 'dotenv';
// Carga las variables de entorno desde el .env
dotenv.config();

import app from './app.js';
const PORT = process.env.PORT || 4500;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
