// const express = require("express");
// const router = express.Router();
// const dataController = require("../controller/visualizeController");

// router.post("/data", dataController.saveData);
// router.get("/getdata", dataController.getData);
// router.post("/pdfpath", dataController.pdfgenerator);


// module.exports = router;

const express = require("express");
const router = express.Router();
const dataController = require("../controller/visualizeController");

router.post("/share",dataController.emailData)
router.post("/data", dataController.saveData);
router.get("/getdata", dataController.getData);
router.post("/pdfpath", dataController.pdfgenerator);
router.delete("/deletepdf/:id", dataController.deletepdf);

module.exports = router;


 
 
// const multer = require('multer'); 
// const path = require('path');

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, './visualize'); 
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname)); 
//   }
// });
// const upload = multer({ storage: storage });


// router.post('/upload', upload.single('file'), uploadFile); 