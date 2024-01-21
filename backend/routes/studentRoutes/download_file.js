import express from 'express';
import db from '../../database/my_sql.js';
import multer from 'multer';

const router = express.Router();

const getDocumentData = (variableName) => {
    return (req, res) => {
        const documentId = req.params.id;
        const query = `SELECT ${variableName} FROM documents WHERE DocumentId = ?`;

        const values = [documentId];
        db.query(query, values, (err, data) => {
            if (err) {
                console.error(err);
                res.status(500).json({ message: 'Internal Server Error' });
            } else {
                const fileData = data[0][variableName];
                res.contentType('application/pdf');
                res.send(fileData);
            }
        });
    };
};

router.get('/TransferCertificate/:id', getDocumentData('TransferCertificate'));
router.get('/Results/:id', getDocumentData('Results'));
router.get('/AdharCard/:id', getDocumentData('AdharCard'));
router.get('/PassportPhoto/:id', getDocumentData('PassportPhoto'));
router.get('/Signature/:id', getDocumentData('Signature'));
router.get('/Affidavit/:id', getDocumentData('Affidavit'));


export default router;