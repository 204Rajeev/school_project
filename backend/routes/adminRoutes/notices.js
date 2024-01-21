import express from "express";
import db from "../../database/my_sql.js";

const router = express.Router();

router.post('/addnotice', (req, res) => {
    const query = `
        INSERT INTO notices 
        (heading, content, date)
        VALUES 
        (?, ?, NOW());
    `;
    
    const values = [
        req.body.heading,
        req.body.content,
    ];

    db.query(query, values, (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json({
            message: 'Notice added successfully',
            noticeid:data.insertId
        });
    });
});

router.get('/notices', (req, res) => {
    const query = `
        SELECT * FROM notices
    `;

    db.query(query, (err, result) => {
        if (err) {
            return res.json(err);
        }

        return res.json(result);
    });
});

export default router;
