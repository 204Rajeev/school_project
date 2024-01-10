import express from 'express';
import db from "../database/my_sql.js"; 

const router = express.Router();

// Route to fetch document data for a specific student ID
router.get('/previewstudentidentity/:studentId', async (req, res) => {
    const studentId = req.params.studentId;

    console.log(studentId);
  
    const query = 'SELECT * FROM studentidentity WHERE studentId = ?';
  
    try {
        db.query(query, [studentId], (err, result) => {
            if (err) {
              console.error("Error executing query:", err);
              res.status(500).json({ error: "Internal Server Error" });
            } else {
              if (result.length === 1) {
                res.json(result[0]);
              } else {
                res.status(404).json({ error: "Student not found" });
              }
            }
          });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  router.get('/previewpreviousschool/:studentId', async (req, res) => {
    const studentId = req.params.studentId;
  
    const query = 'SELECT * FROM previousschool WHERE studentId = ?';
  
    try {
        db.query(query, [studentId], (err, result) => {
            if (err) {
              console.error("Error executing query:", err);
              res.status(500).json({ error: "Internal Server Error" });
            } else {
              if (result.length === 1) {
                res.json(result[0]);
              } else {
                res.status(404).json({ error: "Student not found" });
              }
            }
          });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  router.get('/previewstudentregistration/:studentId', async (req, res) => {
    const studentId = req.params.studentId;
  
    const query = 'SELECT * FROM studentregistration WHERE studentId = ?';
  
    try {
        db.query(query, [studentId], (err, result) => {
            if (err) {
              console.error("Error executing query:", err);
              res.status(500).json({ error: "Internal Server Error" });
            } else {
              if (result.length === 1) {
                res.json(result[0]);
              } else {
                res.status(404).json({ error: "Student not found" });
              }
            }
          });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

export default router;