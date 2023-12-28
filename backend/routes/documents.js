import express from 'express';

import db from '../database/my_sql.js';


const router = express.Router();

router.post('/:id', (req, res) => {
    const StudentId = req.params.id;
    let sampleFile;
    let uploadPath;


    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(404).send('No files were uploaded')
    }

    sampleFile = req.files.sampleFile;
    uploadPath = __dirname + '/uploads/' + sampleFile.name;

    //console.log(sampleFile);

    sampleFile.mv(uploadPath, function (err) {
        if (err) return res.status(500).send(err);

        res.send('File Uploaded Successfully');
    })



});