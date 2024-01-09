import express from 'express';
import db from '../database/my_sql.js';
import multer from 'multer';

const router = express.Router();

const upload = multer();

router.post('/submitdocuments/:studentId', upload.fields([
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

    
    const placeholders = files.map(() => '?').join(', ');

    // Wrap the SQL query in backticks, and ensure to use placeholders for dynamic values
    const query = `INSERT INTO documents (documentId, ${files.join(', ')}) VALUES (?, ${placeholders})`;
    const queryParams = [studentId];

    // Append file data to query parameters
    files.forEach((field) => {
        queryParams.push(fileData[field].data, fileData[field].type);
    });

    try {
        await db.query(query, queryParams); // Use 'await' here to make it asynchronous
        res.json({ message: 'Files uploaded successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

export default router;
