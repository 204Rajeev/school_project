import express from 'express';
import db from '../database/my_sql.js';

const router = express.Router();

router.post('/:id', (req, res) => {
    const StudentId = req.params.id;
    const q =
        "INSERT INTO studentidentity (StudentId, NameAsPerAadhar, AadharNo, DOBAsPerAadhar, Gender, MotherName, FatherName, GuardianName, AadharNoMother, AadharNoFather, PresentAddress, Pincode, MobileNumber, AlternateMobileNumber, EmailId) VALUES (?)";
    const values = [
        StudentId,
        req.body.NameAsPerAadhar,
        req.body.AadharNo,
        req.body.DOBAsPerAadhar,
        req.body.Gender,
        req.body.MotherName,
        req.body.FatherName,
        req.body.GuardianName,
        req.body.AadharNoMother,
        req.body.AadharNoFather,
        req.body.PresentAddress,
        req.body.Pincode,
        req.body.MobileNumber,
        req.body.AlternateMobileNumber,
        req.body.EmailId,
    ];

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err)

        const q = 'UPDATE authprogress SET studentidentity = TRUE WHERE StudentId = (?)'

        const values = [
            StudentId
        ];

        db.query(q, [values], (err, data) => {
            if (err) return res.send(err);
            return res.json({
                message: 'New student Identity Information added and authprogress updated!',
                studentId: StudentId
            });
        })
    });
});

export default router;