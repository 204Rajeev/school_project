import express from 'express';
import db from '../database/my_sql.js';
import multer from 'multer';

const router = express.Router();

const upload = multer();

router.post('/:studentId', upload.fields([
    { name: 'aadharCard', maxCount: 1 },
    { name: 'transferCertificate', maxCount: 1 },
    { name: 'results', maxCount: 1 },
    { name: 'passportPhoto', maxCount: 1 },
    { name: 'signature', maxCount: 1 },
    { name: 'affidavit', maxCount: 1 },
]), async (req, res) => {
    const studentId = req.params.studentId;

    const files = Object.keys(req.files);
    const fileData = {};

    // Extract file data and type for each field
    files.forEach((field) => {
        const file = req.files[field][0];
        fileData[field] = {
            data: file.buffer,
            type: file.originalname.split('.').pop(),
        };
    });

    // Build dynamic placeholders for the SQL query
    const placeholders = files.map(() => '?').join(', ');

    // Check if document already exists
    const checkQuery = 'SELECT * FROM documents WHERE StudentId = ?';
    const checkResult = db.query(checkQuery, [studentId]);

    let query;
    let queryParams;

    if (checkResult.length > 0) {
        // Document exists, construct update query
        query = `UPDATE documents SET ${files.map((field) => `${field} = ?`).join(', ')} WHERE StudentId = ?`;
    } else {
        // Document doesn't exist, construct insert query
        query = `INSERT INTO documents (documentId, ${files.join(', ')}) VALUES (?, ${placeholders})`;
    }

    queryParams = [studentId];
    files.forEach((field) => {
        queryParams.push(fileData[field].data, fileData[field].type);
    });

    try {
        db.query(query, queryParams);
        const q = 'UPDATE authprogress SET documents = TRUE WHERE StudentId = (?)'

        const values = [
            studentId
        ];

        db.query(q, [values], (err, data) => {
            if (err) return res.send(err);
            return res.json({
                message: 'New student documents Information added and authprogress updated!',
                studentId: studentId
            });
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

export default router;

// if documntId is already present then update it not insert
// also update authprogress
