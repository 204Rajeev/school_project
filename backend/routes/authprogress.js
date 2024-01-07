import express from 'express';
import db from '../database/my_sql.js'; 

const router = express.Router();

router.post('/', (req, res) => {
    const mobileNumber = req.body.MobileNumber;

    const checkMobileNumberQuery = 'SELECT StudentId FROM authprogress WHERE MobileNumber = ?';
    db.query(checkMobileNumberQuery, [mobileNumber], (err, data) => {
        if (err) {
            return res.json(err);
        }

        if (data.length > 0) {
            const existingStudentId = data[0].StudentId;
            return res.json({ message: 'Mobile number already exists.', studentId: existingStudentId });
        }

        const insertQuery = 'INSERT INTO authprogress (MobileNumber) VALUES (?)';
        const values = [mobileNumber];

        db.query(insertQuery, [values], (insertErr, insertData) => {
            if (insertErr) {
                return res.json(insertErr);
            }

            return res.json({
                message: "New student enrolled!",
                studentId: insertData.insertId
            });
        });
    });
});

router.get("/status/:id", (req, res) => {
    const StudentId = req.params.id;
    const q='SELECT studentidentity, studentregistration, previousschool, documents, submitform FROM authprogress WHERE StudentId=(?)'
    const values = [StudentId]
    db.query(q,[values],(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
  })



export default router;
