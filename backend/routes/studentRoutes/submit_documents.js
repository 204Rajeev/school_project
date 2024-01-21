import express from 'express';
import db from '../../database/my_sql.js';
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

  
  files.forEach((field) => {
    const file = req.files[field][0];
    fileData[field] = {
      data: file.buffer,
      type: file.originalname.split('.').pop(),
    };
  });

  // Build dynamic placeholders for the SQL query
  const placeholders = files.map(() => '?').join(', ');

  // Construct insert/update query
  const query = `
    INSERT INTO documents (documentId, ${files.join(', ')})
    VALUES (?, ${placeholders})
    ON DUPLICATE KEY UPDATE
    ${files.map((field) => `${field} = VALUES(${field})`).join(', ')}
  `;

  const queryParams = [studentId];
  files.forEach((field) => {
    queryParams.push(fileData[field].data, fileData[field].type);
  });

  try {
    await db.promise().query(query, queryParams);

    const authProgressQuery = 'UPDATE authprogress SET documents = TRUE WHERE StudentId = ?';
    await db.promise().query(authProgressQuery, [studentId]);

    res.json({
      message: 'Student documents information added/updated, and authprogress updated!',
      studentId: studentId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



export default router;