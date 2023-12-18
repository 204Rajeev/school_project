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


app.get("/", (req, res) => {
  res.json("Root of the Project_school")
})


app.post("/authprogress", (req, res) => {
  const q='INSERT INTO authprogress (MobileNumber) VALUES (?)'

  const values =[req.body.MobileNumber]

  db.query(q, [values], (err, data) => {
    if(err) return res.json(err)
    return  res.json({ message: "New student enrolled!", studentId: data.insertId});
  });

})


app.post('/studentidentity/:id', (req, res) => {
  const StudentId= req.params.id;
  const q =
    'INSERT INTO studentidentity (StudentId, NameAsPerTC, NameAsPerAadhar, AadharNo, DOBAsPerTC, DOBAsPerAadhar, Gender, MotherName, FatherName, GuardianName, AadharNoMother, AadharNoFather, StudentNameAsPerAadhar, PresentAddress, Pincode, MobileNumber, AlternateMobileNumber, EmailId) VALUES (?)'
  const values = [
    StudentId,
    req.body.NameAsPerTC,
    req.body.NameAsPerAadhar,
    req.body.AadharNo,
    req.body.DOBAsPerTC,
    req.body.DOBAsPerAadhar,
    req.body.Gender,
    req.body.MotherName,
    req.body.FatherName,
    req.body.GuardianName,
    req.body.AadharNoMother,
    req.body.AadharNoFather,
    req.body.StudentNameAsPerAadhar,
    req.body.PresentAddress,
    req.body.Pincode,
    req.body.MobileNumber,
    req.body.AlternateMobileNumber,
    req.body.EmailId
  ];

  db.query(q, [values], (err, data) => {
        if(err) return res.json(err)
        return  res.json({ message: "New student Identity Information added !"});
  });
});


app.post('/studentregistration/:id', (req, res) => {
  const StudentId= req.params.id;
  const q =
    'INSERT INTO studentregistration (StudentId, MotherTongue, SocialCategory, MinorityGroup, BPLBeneficiary, AAYBeneficiary, EWSDisadvantagedGroup, IsCWSN, CWSNImpairmentType, ChildIsIndianNational, ChildIsOutOfSchoolChild, MainstreamedDate) VALUES (?)';

  const values = [
    StudentId,
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

  db.query(q, [values], (err, data) => {
    if (err) {
      console.error(err);
      return res.json({ error: "Error while adding student information" });
    }
    return res.json({ message: "Student Registration information added successfully!" });
  });
});



app.listen(process.env.PORT,()=>{
    console.log("connected to server")
})










