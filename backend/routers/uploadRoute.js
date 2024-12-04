const express = require('express');
const router = express.Router();
const { uploadFile, getFiles ,deleteFile,emailData,getImageFiles} = require('../controller/uploadController.js'); 
const multer = require('multer'); 
const path = require('path');
const nodemailer =require('nodemailer')
const dotenv = require('dotenv');
const { text } = require('pdfkit');
dotenv.config()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});
const upload = multer({ storage: storage });


// router.post("/share",(req,res)=>{
//   // Filename - index.js

// const nodemailer = require('nodemailer');

// let mailTransporter =
//     nodemailer.createTransport(
//         {
//             service: 'gmail',
//             auth: {
//                 user:process.env.MAIL_ID,
//                 pass: process.env.MAIL_PASSWORD
//             }
//         }
//     );

// let mailDetails = {
//     from: process.env.MAIL_ID,
//     to: 'mowli1947@gmail.com',
//     subject: 'Test mail',
//     text: 'Node.js testing mail for GeeksforGeeks',
//     attachments:[
//       {
//         text:"file"
//       }
//     ]
// };

// mailTransporter
//     .sendMail(mailDetails,
//         function (err, data) {
//             if (err) {
//                 console.log('Error Occurs',err);
//             } else {
//                 console.log('Email sent successfully');
//             }
//         });
  
// })
router.post("/share",emailData)
router.post('/upload', upload.single('file'), uploadFile); 
router.get('/', getFiles); 
router.get('/getimage', getImageFiles); 
router.delete('/delete/:id', deleteFile);
module.exports = router;
