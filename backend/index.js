import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv';
import studentIdentityRouter from './routes/studentidentity.js'; 
import studentRegistrationRouter from './routes/studentregistration.js';
import authProgressRouter from './routes/authprogress.js';
import previousschoolRouter from './routes/previousschool.js';
import documentedRouter from './routes/submitdocuments.js';



dotenv.config();
const app = express()
app.use(express.json())
app.use(cors())


app.use('/authprogress', authProgressRouter);
app.use('/studentidentity', studentIdentityRouter);
app.use('/studentregistration', studentRegistrationRouter);
app.use('/previousschool', previousschoolRouter);
app.use('/submitdocuments',documentedRouter);





app.get("/", (req, res) => {
  res.json("Root of the Project_school")
})

app.listen(process.env.PORT,()=>{
    console.log("connected to server")
})