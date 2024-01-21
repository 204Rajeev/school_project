import express from 'express';
import db from "../../database/my_sql.js";

const router = express.Router();

router.post('/:id', (req, res) => {
    const StudentId = req.params.id;
    const UpdateQuery = `UPDATE authprogress SET submitform = TRUE WHERE StudentId = ?`;
    const values = [StudentId];

    // Update authprogress table
    db.query(UpdateQuery, values, (updateErr, updateData) => {
        if (updateErr) {
            // Handle update error
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        // Insert into Applications table
        const insertQuery = `
            INSERT INTO Applications (studentId, StudentName, MobileNumber, class)
            SELECT si.StudentId, si.NameAsPerAadhar, si.MobileNumber, si.Class
            FROM studentidentity AS si
            WHERE si.StudentId = ?`;
        
        db.query(insertQuery, [StudentId], (insertErr, insertData) => {
            if (insertErr) {
                // Handle insert error
                return res.status(500).json({ error: 'Internal Server Error',info:insertErr });
            }

            // Successfully submitted form and application
            return res.json({ message: 'Form and Application submitted successfully', StudentId: StudentId });
        });
    });
});

export default router;
