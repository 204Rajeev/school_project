import express from "express";
import db from "../database/my_sql.js";

const router = express.Router();

router.post("/", (req, res) => {
  try {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
      return res.status(400).json({ error: "phoneNumber is required" });
    }

    const checkQuery = "SELECT * FROM authprogress WHERE MobileNumber = ?";

    db.query(checkQuery, [phoneNumber], (checkErr, checkResult) => {
      if (checkErr) {
        console.error(checkErr);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (checkResult.length > 0) {
        // If phoneNumber exists, return the existing studentId
        return res.json({
          message: "Student already enrolled!",
          studentId: checkResult[0].StudentId,
        });
      } else {
        // If phoneNumber doesn't exist, insert a new record
        const insertQuery =
          "INSERT INTO authprogress (MobileNumber) VALUES (?)";

        db.query(insertQuery, [phoneNumber], (insertErr, insertResult) => {
          if (insertErr) {
            console.error(insertErr);
            return res.status(500).json({ error: "Internal Server Error" });
          }

          // Return the newly inserted studentId
          return res.json({
            message: "New student enrolled!",
            studentId: insertResult.insertId,
          });
        });
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/status/:studentId", (req, res) => {
  const studentId = req.params.studentId;

  const query = "SELECT * FROM authprogress WHERE studentId = ?";
  db.query(query, [studentId], (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      // Assuming result is an array with a single object
      if (result.length === 1) {
        const { StudentId, MobileNumber, ...dataWithoutStudentId } = result[0];
        res.json(dataWithoutStudentId);
      } else {
        res.status(404).json({ error: "Student not found" });
      }
    }
  });
});

export default router;