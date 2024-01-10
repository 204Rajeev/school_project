import express from 'express';
import db from '../database/my_sql.js';

const router = express.Router();

router.post('/:id', (req, res) => {
    const StudentId = req.params.id;
    const q = `
  INSERT INTO previousschool 
    (StudentId, FatherName, MotherName, DOBAsPerTC, NameAsPerTC) 
  VALUES (?) 
  ON DUPLICATE KEY UPDATE 
    FatherName = VALUES(FatherName),
    MotherName = VALUES(MotherName),
    DOBAsPerTC = VALUES(DOBAsPerTC),
    NameAsPerTC = VALUES(NameAsPerTC);
`;
    const values = [
        StudentId,
        req.body.FatherName,
        req.body.MotherName,
        req.body.DOBAsPerTC,
        req.body.NameAsPerTC,
    ];

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err);

        const updateQuery = 'UPDATE authprogress SET previousschool = TRUE WHERE StudentId = ?';
        const updateValues = [StudentId];

        db.query(updateQuery, [updateValues], (updateErr, updateData) => {
            if (updateErr) return res.json(updateErr);
            return res.json({
                message: 'New student Previous School Information added/updated and authprogress updated!',
                studentId: StudentId
            });
        });
    });
});


export default router;

