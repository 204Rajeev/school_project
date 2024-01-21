import express from 'express';
import db from '../../database/my_sql.js';

const router = express.Router();

router.post('/:id', (req, res) => {
    console.log('student identity');
    const StudentId = req.params.id;
    const q = `
        INSERT INTO studentidentity (
            StudentId,
            NameAsPerAadhar,
            AadharNo,
            DOBAsPerAadhar,
            Gender,
            FatherName,
            MotherName,
            GuardianName,
            AadharNoMother,
            AadharNoFather,
            PresentAddress,
            Pincode,
            MobileNumber,
            AlternateMobileNumber,
            EmailId,
            PANNo,
            Class
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
            NameAsPerAadhar = VALUES(NameAsPerAadhar),
            AadharNo = VALUES(AadharNo),
            DOBAsPerAadhar = VALUES(DOBAsPerAadhar),
            Gender = VALUES(Gender),
            FatherName = VALUES(FatherName),
            MotherName = VALUES(MotherName),
            GuardianName = VALUES(GuardianName),
            AadharNoMother = VALUES(AadharNoMother),
            AadharNoFather = VALUES(AadharNoFather),
            PresentAddress = VALUES(PresentAddress),
            Pincode = VALUES(Pincode),
            MobileNumber = VALUES(MobileNumber),
            AlternateMobileNumber = VALUES(AlternateMobileNumber),
            EmailId = VALUES(EmailId),
            PANNo = VALUES(PANNo),
            Class = VALUES(Class)`;
    const values = [
        StudentId,
        req.body.NameAsPerAadhar,
        req.body.AadharNo,
        req.body.DOBAsPerAadhar,
        req.body.Gender,
        req.body.FatherName,
        req.body.MotherName,
        req.body.GuardianName,
        req.body.AadharNoMother,
        req.body.AadharNoFather,
        req.body.PresentAddress,
        req.body.Pincode,
        req.body.MobileNumber,
        req.body.AlternateMobileNumber,
        req.body.EmailId,
        req.body.PANNo,
        req.body.Class,
    ];

    db.query(q, values, (err, data) => {
        if (err) {
            return res.json(err);
        }

        const updateQuery = 'UPDATE authprogress SET studentidentity = TRUE WHERE StudentId = ?';
        const updateValues = [StudentId];

        db.query(updateQuery, updateValues, (updateErr, updateData) => {
            if (updateErr) {
                return res.json(updateErr);
            }
            return res.json({
                message: 'Student identity added/updated, and authprogress updated!',
                studentId: data.insertId || StudentId
            });
        });
    });
});

export default router;
