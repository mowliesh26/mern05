const File = require('../models/uploadmodal');
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer')
const dotenv = require('dotenv');
const { text } = require('pdfkit');
dotenv.config()
const uploadFile = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded' });
  }

  try {
    const file = new File({
      filename: req.file.filename,
      path: req.file.path,
    });

    await file.save();
    res.json({ success: true, fileData: file });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error uploading file', error: error.message });
  }
};


const getFiles = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;

  try {
    const totalFiles = await File.countDocuments();
    const totalPages = Math.ceil(totalFiles / limit);

    const files = await File.find()
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      success: true,
      files,
      totalFiles,
      totalPages,
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching files', error: error.message });
  }
};
const getImageFiles = async (req, res) => {

  try {
    const data = await File.find()
    res.json({ success: true, data });
  }
  catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching files', error: error.message });
  }
};
const deleteFile = async (req, res) => {
  const { id } = req.params;
  console.log("id", id);

  try {
    const file = await File.findById(id);

    if (!file) {
      return res.status(404).json({ success: false, message: 'File not found' });
    }

    const filePath = path.join(__dirname, '..', file.path);
    console.log("filePath", filePath);

    fs.unlinkSync(filePath);

    await File.findByIdAndDelete(id);

    res.json({ success: true, message: 'File deleted successfully' });
  } catch (error) {
    console.error('Error deleting file:', error);
    res.status(500).json({ success: false, message: 'Error deleting file', error: error.message });
  }
};

const emailData = async (req, res) => {
  const { email, attachment, description } = req.body;

  if (!email || !description || !attachment) {
    return res.status(400).json({ success: false, message: 'Missing required email parameters' });
  }

  try {
     
    const file = await File.findOne({ filename: attachment });
    if (!file) {
      return res.status(404).json({ success: false, message: 'File not found' });
    }

    const filePath = path.join(__dirname, '..', file.path);
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
          cid: 'file001',
        }
      ]
    };

    mailTransporter.sendMail(mailDetails, (err, data) => {
      if (err) {
        console.log('Error Occurs', err);
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
};


module.exports = { uploadFile, getFiles, deleteFile, emailData, getImageFiles };
