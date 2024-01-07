import express from 'express';
import db from '../database/my_sql.js';

const router = express.Router();

router.post('/:id', (req, res) => {
    const StudentId = req.params.id;
    const q =
        'INSERT INTO studentidentity (StudentId, NameAsPerAadhar, AadharNo, DOBAsPerAadhar, Gender, GuardianName, AadharNoMother, AadharNoFather, StudentNameAsPerAadhar, PresentAddress, Pincode, MobileNumber, AlternateMobileNumber, EmailId) VALUES (?)';
    const values = [
        StudentId,
        req.body.NameAsPerAadhar,
        req.body.AadharNo,
        req.body.DOBAsPerAadhar,
        req.body.Gender,
        req.body.GuardianName,
        req.body.AadharNoMother,
        req.body.AadharNoFather,
        req.body.StudentNameAsPerAadhar,
        req.body.PresentAddress,
        req.body.Pincode,
        req.body.MobileNumber,
        req.body.AlternateMobileNumber,
        req.body.EmailId
    ];

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err);

        const updateQuery = 'UPDATE authprogress SET studentidentity = TRUE WHERE StudentId = ?';
        const updateValues = [StudentId];

        db.query(updateQuery, [updateValues], (updateErr, updateData) => {
            if (updateErr) return res.json(updateErr);
            return res.json({
                message: 'New student Identity Information added and authprogress updated!',
                studentId: StudentId
            });
        });
    });
});

export default router;
