import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv';
import studentIdentityRouter from './routes/studentidentity.js'; 
import studentRegistrationRouter from './routes/studentregistration.js';
import authProgressRouter from './routes/authprogress.js';


dotenv.config();
const app = express()
app.use(express.json())
app.use(cors())


app.use('/authprogress', authProgressRouter);
app.use('/studentidentity', studentIdentityRouter);
app.use('/studentregistration', studentRegistrationRouter);



// app.put("/authprogress/PrevSchoolInfo/:id", (req, res) => {
//   const StudentId = req.params.id;
//   const q = 'UPDATE authprogress SET PrevSchoolInfo = TRUE WHERE StudentId = (?)'

//   const values = [
//     StudentId
//   ];

//   db.query(q, [values], (err, data) => {
//     if (err) return res.send(err);
//     return res.json(data);
//   })
// })

// app.put("/authprogress/studentidentity/:id", (req, res) => {
//   const StudentId = req.params.id;
//   const q = 'UPDATE authprogress SET studentidentity = TRUE WHERE StudentId = (?)'

//   const values = [
//     StudentId
//   ];

//   db.query(q, [values], (err, data) => {
//     if (err) return res.send(err);
//     return res.json(data);
//   })
// })

// app.put("/authprogress/UploadDoc/:id", (req, res) => {
//   const StudentId = req.params.id;
//   const q = 'UPDATE authprogress SET UploadDoc = TRUE WHERE StudentId = (?)'

//   const values = [
//     StudentId
//   ];

//   db.query(q, [values], (err, data) => {
//     if (err) return res.send(err);
//     return res.json(data);
//   })
// })

// app.put("/authprogress/SubmitForm/:id", (req, res) => {
//   const StudentId = req.params.id;
//   const q = 'UPDATE authprogress SET SubmitForm = TRUE WHERE StudentId = (?)'

//   const values = [
//     StudentId
//   ];

//   db.query(q, [values], (err, data) => {
//     if (err) return res.send(err);
//     return res.json(data);
//   })
// })

app.get("/", (req, res) => {
  res.json("Root of the Project_school")
})

app.listen(process.env.PORT,()=>{
    console.log("connected to server")
})