// import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import axios from "axios";

// export default function Visualize() {
//   const [autoGenerate, setAutoGenerate] = useState(true);
//   const [selectedDate, setSelectedDate] = useState(
//     new Date().toISOString().slice(0, 10)
//   );
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     location: "",
//   });
//   const [fileFormat, setFileFormat] = useState("pdf");
//   const handleAutoGenerate = () => {
//     setAutoGenerate(true);
//     setSelectedDate(new Date().toISOString().slice(0, 10));
//   };

//   const handleManualSelect = () => {
//     setAutoGenerate(false);
//     setSelectedDate("");
//   };

//   const handleInputChange = (e) => {
//     // console.log("e.t",e.target.name);
//     // console.log("e.t",e.target.value);

//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value ,fileFormat});
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const dataToSend = { ...formData, date: selectedDate };

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/visualize/data",
//         dataToSend
//       );
//       console.log(response.data);
//       alert("Data submitted successfully!");

//       setFormData({
//         name: "",
//         email: "",
//         phone: "",
//         location: "",
//       });

//       if (autoGenerate) {
//         setSelectedDate(new Date().toISOString().slice(0, 10));
//       } else {
//         setSelectedDate("");
//       }
//     } catch (error) {
//       console.error(error);
//       alert("Error submitting data.");
//     }
//   };

//   // const PDFDownload = async () => {
//   //       try {
//   //         console.log("formdate",formData);

//   //         const response = await axios.post("http://localhost:5000/api/visualize/pdfpath", formData, {
//   //           responseType: 'blob',
//   //         });
//   //         const blob = new Blob([response.data], { type: 'application/pdf' });
//   //         const url = window.URL.createObjectURL(blob);
//   //         console.log("response",url);
//   //         window.open(url, '_blank');
//   //       } catch (error) {
//   //         console.error('Error generating PDF:', error);
//   //         alert("Error generating PDF.");
//   //       }
//   //     };

//   return (
//     <div className="container  mt-4 ">
//       <h2 className="mb-4">Visualize</h2>
//       <div className="d-flex mb-3">
//         <button
//           className={`btn ${
//             autoGenerate ? "btn-primary" : "btn-outline-primary"
//           } me-2`}
//           onClick={handleAutoGenerate}
//         >
//           Auto Generate Date
//         </button>
//         <button
//           className={`btn ${
//             !autoGenerate ? "btn-primary" : "btn-outline-primary"
//           }`}
//           onClick={handleManualSelect}
//         >
//           Select Date Manually
//         </button>
//       </div>

//       {!autoGenerate && (
//         <div className="d-inline">
//           <input
//             type="date"
//             className="form-control d-inline w-auto"
//             value={selectedDate}
//             onChange={(e) => setSelectedDate(e.target.value)}
//           />
//         </div>
//       )}
//       {autoGenerate && (
//         <div>
//           <p>Auto-Generated Date: {selectedDate}</p>
//         </div>
//       )}

//       <hr />
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label htmlFor="name" className="form-label">
//             Name
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="name"
//             name="name"
//             placeholder="Enter your name"
//             value={formData.name}
//             onChange={handleInputChange}
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label htmlFor="email" className="form-label">
//             Email
//           </label>
//           <input
//             type="email"
//             className="form-control"
//             id="email"
//             name="email"
//             placeholder="Enter your email"
//             value={formData.email}
//             onChange={handleInputChange}
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label htmlFor="phone" className="form-label">
//             Phone Number
//           </label>
//           <input
//             type="number"
//             className="form-control"
//             id="phone"
//             // pattern={`[${formData.phone}].match(/^\d{10}$/)`}
//             // min="1000000000" max="9999999999"
//             name="phone"
//             placeholder="Enter your phone number"
//             value={formData.phone}
//             onChange={handleInputChange}
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label htmlFor="location" className="form-label">
//             Location
//           </label>
//           <select
//             className="form-select"
//             id="location"
//             name="location"
//             value={formData.location}
//             onChange={handleInputChange}
//             required
//           >
//             <option value="">Select Location</option>
//             <option value="Erode">Erode</option>
//             <option value="Salem">Salem</option>
//             <option value="Coimbatore">Coimbatore</option>
//             <option value="Tirupur">Tirupur</option>
//             <option value="Ooty">Ooty</option>
//           </select>
//         </div>
//        <select
//             id="fileFormat"
//             className="form-select"
//             value={fileFormat}
//             onChange={(e) => setFileFormat(e.target.value)}
//           >
//             <option value="pdf">PDF</option>
//             <option value="excel">Excel</option>
//           </select>
//         <button type="submit" className="btn btn-success">
//           Generate
//         </button>
//         {/* <button className="btn btn-primary" onClick={()=>{PDFDownload()}}>pdf</button> */}
//       </form>
//     </div>
//   );
// }
// import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import axios from "axios";

// export default function Visualize() {
//   const [autoGenerate, setAutoGenerate] = useState(true);
//   const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     location: "",
//   });
//   const [fileFormat, setFileFormat] = useState("pdf");  

//   const handleAutoGenerate = () => {
//     setAutoGenerate(true);
//     setSelectedDate(new Date().toISOString().slice(0, 10));
//   };

//   const handleManualSelect = () => {
//     setAutoGenerate(false);
//     setSelectedDate("");
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };
 
//   const handleFileFormatChange = (e) => {
//     setFileFormat(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const dataToSend = { ...formData, date: selectedDate, fileFormat }; 
//     try {
//       const response = await axios.post("http://localhost:5000/api/visualize/data", dataToSend);
//       console.log(response.data);
//       alert("Data submitted successfully!");
//       setFormData({
//         name: "",
//         email: "",
//         phone: "",
//         location: "",
//       });
 
//       if (autoGenerate) {
//         setSelectedDate(new Date().toISOString().slice(0, 10));
//       } else {
//         setSelectedDate("");
//       }
//     } catch (error) {
//       console.error(error);
//       alert("Error submitting data.");
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <h2 className="mb-4">Visualize</h2>
//       <div className="d-flex mb-3">
//         <button
//           className={`btn ${autoGenerate ? "btn-primary" : "btn-outline-primary"} me-2`}
//           onClick={handleAutoGenerate}
//         >
//           Auto Generate Date
//         </button>
//         <button
//           className={`btn ${!autoGenerate ? "btn-primary" : "btn-outline-primary"}`}
//           onClick={handleManualSelect}
//         >
//           Select Date Manually
//         </button>
//       </div>

//       {!autoGenerate && (
//         <div className="d-inline">
//           <input
//             type="date"
//             className="form-control d-inline w-auto"
//             value={selectedDate}
//             onChange={(e) => setSelectedDate(e.target.value)}
//           />
//         </div>
//       )}
//       {autoGenerate && <p>Auto-Generated Date: {selectedDate}</p>}

//       <hr />
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label htmlFor="name" className="form-label">
//             Name
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="name"
//             name="name"
//             placeholder="Enter your name"
//             value={formData.name}
//             onChange={handleInputChange}
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label htmlFor="email" className="form-label">
//             Email
//           </label>
//           <input
//             type="email"
//             className="form-control"
//             id="email"
//             name="email"
//             placeholder="Enter your email"
//             value={formData.email}
//             onChange={handleInputChange}
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label htmlFor="phone" className="form-label">
//             Your Event 
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="phone"
//             name="phone"
//             placeholder="Enter your Event"
//             value={formData.phone}
//             onChange={handleInputChange}
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label htmlFor="location" className="form-label">
//             Location
//           </label>
//           <select
//             className="form-select"
//             id="location"
//             name="location"
//             value={formData.location}
//             onChange={handleInputChange}
//             required
//           >
//             <option value="">Select Location</option>
//             <option value="Erode">Erode</option>
//             <option value="Salem">Salem</option>
//             <option value="Coimbatore">Coimbatore</option>
//             <option value="Tirupur">Tirupur</option>
//             <option value="Ooty">Ooty</option>
//           </select>
//         </div>

//         <div className="mb-3">
//           <label htmlFor="fileFormat" className="form-label">
//             File Format
//           </label>
//           <select
//             id="fileFormat"
//             className="form-select"
//             value={fileFormat}
//             onChange={handleFileFormatChange}
//           >
//             <option value="pdf">PDF</option>
//             <option value="excel">Excel</option>
//           </select>
//         </div>

//         <button type="submit" className="btn btn-success">
//           Generate
//         </button>
//       </form>
//     </div>
//   );
// }
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";

export default function Visualize() {
  const [autoGenerate, setAutoGenerate] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
  });
  const [fileFormat, setFileFormat] = useState("pdf");

  const handleAutoGenerate = () => {
    setAutoGenerate(true);
    setSelectedDate(new Date().toISOString().slice(0, 10));
  };

  const handleManualSelect = () => {
    setAutoGenerate(false);
    setSelectedDate("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileFormatChange = (e) => {
    setFileFormat(e.target.value);
  };

  const handleDownloadFile = () => {
    const { name, email, phone, location } = formData;
    const date = selectedDate;
    const fileData = {
      Name: name,
      Email: email,
      Event: phone,
      Location: location,
      Date: date,
    };

    if (fileFormat === "pdf") {
      // Generate PDF file
      const doc = new jsPDF();
      doc.text("Form Data", 20, 10);
      let y = 20;
      Object.entries(fileData).forEach(([key, value]) => {
        doc.text(`${key}: ${value}`, 20, y);
        y += 10;
      });
      doc.save(`${name}_form.pdf`);
    } else if (fileFormat === "excel") {
      // Generate Excel file
      const ws = XLSX.utils.json_to_sheet([fileData]);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Form Data");
      XLSX.writeFile(wb, `${name}_form.xlsx`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = { ...formData, date: selectedDate, fileFormat };
    try {
      const response = await axios.post("http://localhost:5000/api/visualize/data", dataToSend);
      console.log(response.data);
      alert("Data submitted successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        location: "",
      });

      if (autoGenerate) {
        setSelectedDate(new Date().toISOString().slice(0, 10));
      } else {
        setSelectedDate("");
      }

      // Trigger file download
      handleDownloadFile();
    } catch (error) {
      console.error(error);
      alert("Error submitting data.");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Visualize</h2>
      <div className="d-flex mb-3">
        <button
          className={`btn ${autoGenerate ? "btn-primary" : "btn-outline-primary"} me-2`}
          onClick={handleAutoGenerate}
        >
          Auto Generate Date
        </button>
        <button
          className={`btn ${!autoGenerate ? "btn-primary" : "btn-outline-primary"}`}
          onClick={handleManualSelect}
        >
          Select Date Manually
        </button>
      </div>

      {!autoGenerate && (
        <div className="d-inline">
          <input
            type="date"
            className="form-control d-inline w-auto"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
      )}
      {autoGenerate && <p>Auto-Generated Date: {selectedDate}</p>}

      <hr />
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Your Event
          </label>
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            placeholder="Enter your Event"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="location" className="form-label">
            Location
          </label>
          <select
            className="form-select"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Location</option>
            <option value="Erode">Erode</option>
            <option value="Salem">Salem</option>
            <option value="Coimbatore">Coimbatore</option>
            <option value="Tirupur">Tirupur</option>
            <option value="Ooty">Ooty</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="fileFormat" className="form-label">
            File Format
          </label>
          <select
            id="fileFormat"
            className="form-select"
            value={fileFormat}
            onChange={handleFileFormatChange}
          >
            <option value="pdf">PDF</option>
            <option value="excel">Excel</option>
          </select>
        </div>

        <button type="submit" className="btn btn-success">
          Generate & Download
        </button>
      </form>
    </div>
  );
}

