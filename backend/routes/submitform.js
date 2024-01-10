import express from 'express';
import db from "../database/my_sql.js";

const router = express.Router();

router.post('/:id', (req, res) => {
    const StudentId = req.params.id;
    const query = `UPDATE authprogress SET submitform = TRUE WHERE StudentId = (?)`;
    const values = [StudentId];
    db.query(query, values, (err, data) => {
        if (err) return res.json(err)

        return res.json({ message: 'form submitted successfully', StudentId: StudentId });
    });
});

export default router;