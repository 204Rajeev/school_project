import express from "express";
import db from "../../database/my_sql.js";

const router = express.Router();

router.get("/checkAdmin/:phoneNumber", (req, res) => {
    const phoneNumber = req.params.phoneNumber;
    
    const checkQuery = "SELECT * FROM admins WHERE MobileNumber = ?";
    db.query(checkQuery, [phoneNumber], (err, result) => {
        if (err) {
            console.error("Error executing query:", err);
            res.status(500).json({ error: "Internal Server Error" });
        }

        if (result.length > 0) {
            // phoneNumber already exists so return true
            return res.json({
                value: true,
                adminid: result[0].adminid,
            });
        }
        return res.json({
            value: false,
        });
    });
});

export default router;
