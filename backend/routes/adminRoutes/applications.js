import express from "express";
import db from "../../database/my_sql.js";

const router = express.Router();

router.post('/applicationsreject/:id', (req, res) => {
   
    const StudentId = req.params.id;
    const query = `
        UPDATE Applications SET status = 2 WHERE studentId = ?
    `;
    const values = [
        StudentId,
    ];

    db.query(query, values, (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json({
            message: 'status changed successfully',
        });
    });
});

router.post('/applicationsaccept/:id', (req, res) => {
    const StudentId = req.params.id;
    const query = `
        UPDATE Applications SET status = 1 WHERE studentId = ?
    `;
    const values = [
        StudentId,
    ];

    db.query(query, values, (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json({
            message: 'status changed successfully',
        });
    });
});

router.get('/students/:classValue', (req, res) => {
    const classValue = req.params.classValue;
    
    const query =  `
        SELECT * FROM Applications 
        WHERE class = ?
    `;
    
    db.query(query, [classValue], (err, result) => {
        if (err) {
            console.error("Error executing query:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        return res.json(result);
    });
});


export default router;