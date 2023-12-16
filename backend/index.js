import express from 'express'
import cors from 'cors'
import mysql from 'mysql2'
import dotenv from 'dotenv';

dotenv.config();
const app = express()
app.use(express.json())
app.use(cors())



const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});


// root of the application
app.get("/", (req, res) => {
  res.json("Root of the Project_school")
})


app.post('/student_apf_1', (req, res) => {
  const q =
    'INSERT INTO Student_apf_1 (NameAsPerTC, NameAsPerAadhaar, AadhaarNo, DOBAsPerTC, DOBAsPerAadhaar, Gender, MotherName, FatherName, GuardianName, AadhaarNoMother, AadhaarNoFather, StudentNameAsPerAadhar, PresentAddress, Pincode, MobileNumber, AlternateMobileNumber, EmailId) VALUES (?)'
    
  const values = [
    req.body.NameAsPerTC,
    req.body.NameAsPerAadhaar,
    req.body.AadhaarNo,
    req.body.DOBAsPerTC,
    req.body.DOBAsPerAadhaar,
    req.body.Gender,
    req.body.MotherName,
    req.body.FatherName,
    req.body.GuardianName,
    req.body.AadhaarNoMother,
    req.body.AadhaarNoFather,
    req.body.StudentNameAsPerAadhar,
    req.body.PresentAddress,
    req.body.Pincode,
    req.body.MobileNumber,
    req.body.AlternateMobileNumber,
    req.body.EmailId
  ];

  db.query(q, [values], (err, data) => {
        if(err) return res.json(err)
        return res.json("new student enrolled !!")
  });
});


app.post('/student_apf_2/:id', (req, res) => {
  const StudentId= req.params.id;
  const q =
    'INSERT INTO student_apf_2 (StudentId, MotherTongue, SocialCategory, MinorityGroup, BPLBeneficiary, AAYBeneficiary, EWSDisadvantagedGroup, IsCWSN, CWSNImpairmentType, ChildIsIndianNational, ChildIsOutOfSchoolChild, MainstreamedDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

  const values = [
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
    req.body.MainstreamedDate
  ];

  db.query(q, [StudentId,...values], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error while adding student information" });
    }
    return res.json({ message: "Student information added successfully!" });
  });
});



app.listen(process.env.PORT,()=>{
    console.log("connected to server")
})