import express from 'express';
import db from '../database/my_sql.js'; // Adjust the path as needed

const router = express.Router();

router.post('/:id', (req, res) => {
    const StudentId = req.params.id;
    const q =
        'INSERT INTO studentregistration (StudentId, MotherTongue, SocialCategory, MinorityGroup, BPLBeneficiary, AAYBeneficiary, EWSDisadvantagedGroup, IsCWSN, CWSNImpairmentType, ChildIsIndianNational, ChildIsOutOfSchoolChild, MainstreamedDate,Disability) VALUES (?)';

    const values = [
        StudentId,
        req.body.MotherTongue,
        req.body.SocialCategory,
        req.body.MinorityGroup,
        req.body.BPLBeneficiary,
        req.body.AAYBeneficiary,
        req.body.EWSDisadvantagedGroup,
        req.body.IsCWSN,
        req.body.CWSNImpairmentType,
        req.body.ChildIsIndianNational,
        req.body.ChildIsOutOfSchoolChild,
        req.body.MainstreamedDate,
        req.body.Disability,
    ];

    db.query(q, [values], (err, data) => {
        if (err) {
            console.error(err);
            return res.json({ error: "Error while adding student information" });
        }

        const updateQuery = 'UPDATE authprogress SET studentregistration = TRUE WHERE StudentId = ?';
        const updateValues = [StudentId];

        db.query(updateQuery, [updateValues], (updateErr, updateData) => {
            if (updateErr) return res.json(updateErr);
            return res.json({
                message: 'New student Registration Information added and authprogress updated!',
                studentId: StudentId
            });
        });
    });
});

export default router;
