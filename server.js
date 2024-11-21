import dotenv from 'dotenv';
import express from 'express';
import mysql from 'mysql2/promise'; // Use promise-based API
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Create a connection pool (better for scalability)
const db = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

// Signup Route
app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    // Validate input data
    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Name, email, and password are required.' });
    }

    const sql = "INSERT INTO login (name, email, password) VALUES (?)";
    const values = [name, email, password];

    try {
        const [result] = await db.query(sql, [values]);
        res.status(201).json(result); // Return created user data with status 201
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error inserting data into the database.' });
    }
});

// Login Route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Validate input data
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }

    const sql = "SELECT * FROM login WHERE `email` = ? AND `password` = ?";
    
    try {
        const [data] = await db.query(sql, [email, password]);

        if (data.length > 0) {
            console.log('Login success'); // Log before sending the response
            return res.json('success');
        } else {
            console.log('Login failed');
            return res.status(401).json({ error: 'Invalid email or password.' }); // Send 401 Unauthorized if credentials are wrong
        }
    } catch (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Error querying the database.' });
    }
});

// Server Listening
app.listen(8081, () => {
    console.log("Listening on port 8081");
});
