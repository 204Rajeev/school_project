import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv';
import studentIdentityRouter from './routes/studentRoutes/student_identity.js'; 
import studentRegistrationRouter from './routes/studentRoutes/student_registration.js';
import authProgressRouter from './routes/studentRoutes/auth_progress.js';
import previousschoolRouter from './routes/studentRoutes/previous_school.js';
import documentedRouter from './routes/studentRoutes/submit_documents.js';
import documentPreviewRouter from './routes/studentRoutes/documents_preview.js';
import submitFormRouter from './routes/studentRoutes/submit_form.js';
import downloadFileRouter from './routes/studentRoutes/download_file.js';
import checkAdminRouter from './routes/adminRoutes/check_admin.js';
import rejectAppAdminRouter from './routes/adminRoutes/applications.js';
import noticeRouter from './routes/adminRoutes/notices.js';



dotenv.config();
const app = express()
app.use(express.json())
app.use(cors())


app.use('/authprogress', authProgressRouter);
app.use('/studentidentity', studentIdentityRouter);
app.use('/studentregistration', studentRegistrationRouter);
app.use('/previousschool', previousschoolRouter);
app.use('/submitdocuments',documentedRouter);
app.use('/documentspreview',documentPreviewRouter);
app.use('/submitform',submitFormRouter);
app.use('/downloadfile',downloadFileRouter);
app.use('/admin', rejectAppAdminRouter);
app.use('/admin', checkAdminRouter);
app.use('/admin',noticeRouter);



app.get("/", (req, res) => {
  res.json("Root of the Project_school")
})

app.listen(process.env.PORT,()=>{
    console.log("connected to server")
})