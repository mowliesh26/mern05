// const PDFDocument = require('pdfkit');
// const fs = require('fs');
const PDFDocument = require("pdfkit");
const fs = require("fs");
const DataModel = require("../models/visualizemodal");
const nodemailer =require('nodemailer')
const dotenv = require('dotenv');
const { text } = require('pdfkit');
dotenv.config()
module.exports = {
  saveData: async (req, res) => {
    const { name, email, phone, location, date } = req.body;

    try {
      const newData = new DataModel({
        name,
        email,
        phone,
        location,
        date,
      });

      await newData.save();
      res.status(201).send("Data saved successfully!");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error saving data.");
    }
  },
  getData:async (req, res) => {
    const page = parseInt(req.query.page) || 1;  
    const limit = parseInt(req.query.limit) || 5;  

    try {
      const skip = (page - 1) * limit;  
      const total = await DataModel.countDocuments(); 
      const files = await DataModel.find().skip(skip).limit(limit);

      res.json({
        success: true,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        files,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error fetching files",
        error: error.message,
      });
    }
  
  },
  pdfgenerator: async (req, res) => {
    const { name, email, phone, location } = req.body;

    const doc = new PDFDocument();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="generated.pdf"'
    );

    doc.pipe(res);

    doc.fontSize(18).text("Generated PDF", { align: "center" });
    doc.moveDown();
    doc.fontSize(12).text(`Name: ${name}`);
    doc.text(`Email: ${email}`);
    doc.text(`Event: ${phone}`);
    doc.text(`Location: ${location}`);

    doc.end();
  },
  deletepdf: async (req, res) => {
    const { id } = req.params;
    console.log("id", id);

    try {
      const file = await DataModel.findByIdAndDelete(id);
      res.json({ success: true, message: "File deleted successfully" });
    } catch (error) {
      console.error("Error deleting file:", error);
      res
        .status(500)
        .json({
          success: false,
          message: "Error deleting file",
          error: error.message,
        });
    }
  },
 
  emailData: async (req, res) => {
    const { email, attachment, description } = req.body;

    if (!email || !description || !attachment) {
      return res.status(400).json({ success: false, message: 'Missing required email parameters' });
    }

    try {
      // Find the file by filename (not _id)
      const file = await DataModel.findOne({ filename: attachment });
      if (!file) {
        return res.status(404).json({ success: false, message: 'File not found' });
      }

      const filePath = path.join(__dirname, '..', file.path); // Ensure the correct file path
      const fileName = file.filename;

      const mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.MAIL_ID,
          pass: process.env.MAIL_PASSWORD
        }
      });

      let mailDetails = {
        from: process.env.MAIL_ID,
        to: email,
        subject: `File: ${fileName}`,
        text: description,
        attachments: [
          {
            filename: fileName,
            path: filePath,
            cid: 'file001', // optional, for inline display in email body
          }
        ]
      };

      mailTransporter.sendMail(mailDetails, (err, data) => {
        if (err) {
          console.log('Error occurs', err);
          return res.status(500).json({ success: false, message: 'Error sending email', error: err.message });
        } else {
          console.log('Email sent successfully');
          return res.json({ success: true, message: 'Email sent successfully' });
        }
      });
    } catch (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ success: false, message: 'Error processing email', error: error.message });
    }
  }

//  emailData :  async (req, res) => {
//   const { email, attachment, description } = req.body;

//   if (!email || !description || !attachment) {
//     return res.status(400).json({ success: false, message: 'Missing required email parameters' });
//   }

//   try {
//     // Find the file by filename (not _id)
//     const file = await File.findOne({ filename: attachment });
//     if (!file) {
//       return res.status(404).json({ success: false, message: 'File not found' });
//     }

//     const filePath = path.join(__dirname, '..', file.path);
//     const fileName = file.filename;

//     const mailTransporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: process.env.MAIL_ID,
//         pass: process.env.MAIL_PASSWORD
//       }
//     });

//     let mailDetails = {
//       from: process.env.MAIL_ID,
//       to: email,
//       subject: `File: ${fileName}`,
//       text: description,
//       attachments: [
//         {
//           filename: fileName,
//           path: filePath,
//           cid: 'file001',
//         }
//       ]
//     };

//     mailTransporter.sendMail(mailDetails, (err, data) => {
//       if (err) {
//         console.log('Error Occurs', err);
//         // return res.status(500).json({ success: false, message: 'Error sending email', error: err.message });
//         return res.json({ success: true, message: 'Email sent successfully' });
//       } else {
//         console.log('Email sent successfully');
//         return res.json({ success: true, message: 'Email sent successfully' });
//       }
//     });
//   } catch (error) {
//     console.error('Error sending email:', error);
//     return res.status(500).json({ success: false, message: 'Error processing email', error: error.message });
//   }
// }
}