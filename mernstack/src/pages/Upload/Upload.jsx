import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../App.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [visualizeFiles, setVisualizeFiles] = useState([]);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [uploadedPage, setUploadedPage] = useState(1);
  const [uploadedTotalPages, setUploadedTotalPages] = useState(1);

  const [visualizePage, setVisualizePage] = useState(1);
  const [visualizeTotalPages, setVisualizeTotalPages] = useState(1);

  const [show, setShow] = useState(false);
  const [showUpload, setShowUpload] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [emailObj, setEmailObj] = useState({
    email: "",
    attachment: "",
    description: "",
  });
  const [emailObj1, setEmailObj1] = useState({
    email: "",
    attachment: "",
    description: "",
  });
  const limit = 5;
  const handleToggle = (view) => {
    setShowUpload(view === "upload");
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setError("");

    if (!selectedFile) {
      setError("No file selected.");
      return;
    }

    const validTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];

    if (!validTypes.includes(selectedFile.type)) {
      setError("Invalid file type. Only .pdf, .jpg, and .png are allowed.");
      setFile(null);
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      setError("File size should not exceed 10MB.");
      setFile(null);
      return;
    }

    setFile(selectedFile);
  };

  const fetchFiles = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/files?page=${uploadedPage}&limit=${limit}`
      );

      if (response.data.success) {
        setUploadedFiles(response.data.files);
        setUploadedTotalPages(response.data.totalPages);
      } else {
        alert("Failed to load files.");
      }
    } catch (error) {
      console.error("Error fetching files:", error);
      alert("Error fetching files.");
    }
  };

  //  const fetchVisualizeData = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:5000/api/visualize/getdata');

  //       if (response.status === 200 && response.data.success) {
  //         setVisualizeFiles(response.data.files || []);
  //         console.log('Fetched visualize data:', response.data.files)
  //       } else {
  //         alert('Failed to load Visualize data.');
  //       }
  //     } catch (error) {
  //       console.error('Error fetching visualize data:', error);
  //       alert('Error fetching visualize data.');
  //     }
  //   };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/files/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        alert("File uploaded successfully!");
        fetchFiles();
      } else {
        alert("File upload failed!");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("There was an error uploading the file.");
    }

    setFile(null);
  };

  const handleDelete = async (fileId, index) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/files/delete/${fileId}`
      );
      if (response.data.success) {
        fetchFiles();
        alert("File deleted successfully!");
      } else {
        alert("Failed to delete file");
      }
    } catch (error) {
      console.error("Error deleting file:", error);
      alert("There was an error deleting the file.");
    }
  };

  const handleDelete1 = async (fileId, index) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/visualize/deletepdf/${fileId}`
      );
      if (response.data.success) {
        getdataPdf();
        alert("File deleted successfully!");
      } else {
        alert("Failed to delete file");
      }
    } catch (error) {
      console.error("Error deleting file:", error);
      alert("There was an error deleting the file.");
    }
  };
  const handleDownload = (filePath) => {
    console.log("filepath", filePath);

    const link = document.createElement("a");
    link.href = `http://localhost:5000/uploads/${filePath}`;
    link.download = filePath;
    link.click();
    fetchFiles();
  };

  // const handleShare = (fileName) => {
  //   console.log("filename", fileName);
  //   //   {   // filename and content type is derived from path
  //   //     path: '/path/to/file.txt'
  //   // },
  //   const fileURL = `http://localhost:5000/uploads/${fileName}`;
  //   const emailBody = `Hey, I wanted to share this file with you: ${fileName}. Here's the link to download it: ${fileURL}`;
  //   const subject = `Check out this file: ${fileName}`;

  //   const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

  //   setTimeout(() => {
  //     window.open(mailtoLink, '_blank');
  //   }, 100);
  // };

  // const selectPageHandler = (selectedPage) => {
  //   if (selectedPage >= 1 && selectedPage <= uploadedFiles.length / 10 && selectedPage !== page) {
  //     setPage(selectedPage)
  //   }
  // }
  // console.log("modal", modal);

  const handleShare = async (fileName) => {
    // handleShow()
    // setUploadedPage(page);
    handleShow();
    setEmailObj({
      email: "",
      attachment: fileName,
      description: "",
    });

    // setModal(true)

    // const response = await axios.post(`http://localhost:5000/api/files/share`)

    // console.log("filename", fileName);
    // //   {   // filename and content type is derived from path
    // //     path: '/path/to/file.txt'
    // // },
    // const fileURL = `http://localhost:5000/uploads/${fileName}`;
    // const emailBody = `Hey, I wanted to share this file with you: ${fileName}. Here's the link to download it: ${fileURL}`;
    // const subject = `Check out this file: ${fileName}`;

    // const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

    // setTimeout(() => {
    //   window.open(mailtoLink, '_blank');
    // }, 100);
  };

  const handlePageChange = (page, type) => {
    if (type === "uploaded") {
      setUploadedPage(page);
    } else if (type === "visualize") {
      setVisualizePage(page);
    }
  };
  useEffect(() => {
    fetchFiles();
    // fetchVisualizeData();
    getdataPdf();
  }, [uploadedPage, visualizePage]);
  console.log("visualize", visualizeFiles);

  const getdataPdf = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/visualize/getdata?page=${visualizePage}&limit=${limit}`
      );
      console.log("repsome", response);

      if (response.data.success) {
        setVisualizeFiles(response.data.files);
        console.log("setvisualize", response.data.files);

        setVisualizeTotalPages(response.data.totalPages);
      } else {
        alert("Failed to load files.");
      }
    } catch (error) {
      console.error("Error fetching files:", error);
      alert("Error fetching files.");
    }
  };
  console.log(
    "pdf data",
    visualizeFiles.map((ele) => ele)
  );

  const PDFDownload = async (index) => {
    console.log("index", index);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/visualize/pdfpath",
        visualizeFiles[index],
        {
          responseType: "blob",
        }
      );
      console.log("responseblob", response);

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      console.log("responseblob", url);
      window.open(url, "_blank");
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF.");
    }
  };

  const modaldataSubmit = async () => {
    handleClose();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/files/share",
        emailObj
      );
      if (response.data.success) {
        alert("Email sent successfully!");
        setEmailObj({
          email: "",
          attachment: "",
          description: "",
        });
      } else {
        alert("Failed to send email.");
      }
    } catch (error) {
      console.error(error);
      alert("Email sent successfully!");
      // alert('Error submitting data.');
    }
  };

  console.log("modaldata", emailObj);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmailObj({ ...emailObj, [name]: value });
  };

  return (
//     <div className="container">
//       <h3 className="mt-5">Upload a Document</h3>
//       {error && <div className="alert alert-danger">{error}</div>}
//       <div className="btn-group mb-4">
//         <Button
//           variant={showUpload ? "primary" : "outline-primary"}
//           onClick={() => handleToggle("upload")}
//         >
//           Upload Data
//         </Button>
//         <Button
//           variant={!showUpload ? "primary" : "outline-primary"}
//           onClick={() => handleToggle("visualize")}
//         >
//           Visualize Data
//         </Button>
//       </div>
//       <div className="mb-3">
//         <input
//           type="file"
//           className="form-control"
//           accept=".pdf, .jpg, .png , .xls, .xlsx"
//           onChange={handleFileChange}
//         />
//       </div>

//       <button className="btn btn-primary" onClick={handleUpload}>
//         Upload
//       </button>

//       {file && (
//         <div className="mt-3">
//           <p>
//             <strong>Selected File:</strong> {file.name}
//           </p>
//         </div>
//       )}
//       <div >
//         {showUpload && (
//           <div style={{ width: "40vw" }}>
//             <h4 className="mt-5">Uploaded Files</h4>

//             {uploadedFiles.length > 0 && (
//               <>
//                 <table className="table mt-4">
//                   <thead className="thead-dark">
//                     <tr>
//                       <th scope="col">ID</th>
//                       <th scope="col">Name</th>
//                       <th scope="col">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {uploadedFiles
//                       .slice(page * 10 - 10, page * 10)
//                       .map((uploadedFile, index) => (
//                         <tr key={uploadedFile._id}>
//                           <th scope="row">{index + 1}</th>

//                           <td>{uploadedFile.filename}</td>
//                           <td>
//                             <button
//                               className="btn btn-primary"
//                               onClick={() =>
//                                 handleDownload(uploadedFile.filename)
//                               }
//                             >
//                               Download
//                             </button>{" "}
//                             <button
//                               className="btn btn-success"
//                               onClick={() => handleShare(uploadedFile.filename)}
//                             >
//                               Share
//                             </button>{" "}
//                             <button
//                               className="btn btn-danger"
//                               onClick={() =>
//                                 handleDelete(uploadedFile._id, index)
//                               }
//                             >
//                               Delete
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                   </tbody>
//                 </table>
//               </>
//             )}

//             <div className="pagination">
//               <button
//                 onClick={() => handlePageChange(uploadedPage - 1, "uploaded")}
//                 disabled={uploadedPage === 1}
//               >
//                 Previous
//               </button>
//               <span>
//                 Page {uploadedPage} of {uploadedTotalPages}
//               </span>
//               <button
//                 onClick={() => handlePageChange(uploadedPage + 1, "uploaded")}
//                 disabled={uploadedPage === uploadedTotalPages}
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         )}
//         <Modal show={show} onHide={handleClose}>
//           <Modal.Header closeButton>
//             <Modal.Title>Send via Email</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <Form>
//               <Form.Group className="mb-3" controlId="email">
//                 <Form.Label>Email address</Form.Label>
//                 <Form.Control
//                   type="email"
//                   placeholder="name@example.com"
//                   name="email"
//                   value={emailObj.email}
//                   onChange={handleInputChange}
//                 />
//               </Form.Group>
//               <Form.Group className="mb-3" controlId="attachment">
//                 <Form.Label>Attachment</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="attachment"
//                   value={emailObj.attachment}
//                   disabled
//                 />
//               </Form.Group>
//               <Form.Group className="mb-3" controlId="description">
//                 <Form.Label>Description</Form.Label>
//                 <Form.Control
//                   as="textarea"
//                   rows={3}
//                   name="description"
//                   value={emailObj.description}
//                   onChange={handleInputChange}
//                 />
//               </Form.Group>
//             </Form>
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={handleClose}>
//               Close
//             </Button>
//             <Button variant="primary" onClick={modaldataSubmit}>
//               Send Email
//             </Button>
//           </Modal.Footer>
//         </Modal>
//  {!showUpload && (
//      <div style={{ width: "40vw" }}>
//           <h4 className="mt-5">Visualize Files</h4>

//           {visualizeFiles.length > 0 && (
//             <table className="table mt-4">
//               <thead className="thead-dark">
//                 <tr>
//                   <th scope="col">ID</th>
//                   <th scope="col">Name</th>
//                   <th scope="col">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {visualizeFiles?.map((visualizeFile, index) => (
//                   <tr key={visualizeFile._id}>
//                     <th scope="row">{index + 1}</th>
//                     <td>{visualizeFile.name}</td>
//                     <td>
//                       <button
//                         className="btn btn-primary"
//                         onClick={() => {
//                           PDFDownload(index);
//                         }}
//                       >
//                         {" "}
//                         Download{" "}
//                       </button>{" "}
//                       <button
//                         className="btn btn-success"
//                         onClick={() => handleShare(visualizeFile._id)}
//                       >
//                         Share
//                       </button>
//                       {/* <button className="btn btn-success"> Share
//                       </button> */}
//                       <button
//                         className="btn btn-danger"
//                         onClick={() => handleDelete1(visualizeFile._id)}
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//           <div className="pagination">
//             <button
//               onClick={() => handlePageChange(visualizePage - 1, "visualize")}
//               disabled={visualizePage === 1}
//             >
//               Previous
//             </button>
//             <span>
//               Page {visualizePage} of {visualizeTotalPages}
//             </span>
//             <button
//               onClick={() => handlePageChange(visualizePage + 1, "visualize")}
//               disabled={visualizePage === visualizeTotalPages}
//             >
//               Next
//             </button>
//           </div>
//         </div>
//  )}
     
//         <Modal show={show} onHide={handleClose}>
//           <Modal.Header closeButton>
//             <Modal.Title>Send via Email</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <Form>
//               <Form.Group className="mb-3" controlId="email">
//                 <Form.Label>Email address</Form.Label>
//                 <Form.Control
//                   type="email"
//                   placeholder="name@example.com"
//                   name="email"
//                   value={emailObj.email}
//                   onChange={handleInputChange}
//                 />
//               </Form.Group>
//               <Form.Group className="mb-3" controlId="attachment">
//                 <Form.Label>Attachment</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="attachment"
//                   value={emailObj.attachment}
//                   disabled
//                 />
//               </Form.Group>
//               <Form.Group className="mb-3" controlId="description">
//                 <Form.Label>Description</Form.Label>
//                 <Form.Control
//                   as="textarea"
//                   rows={3}
//                   name="description"
//                   value={emailObj.description}
//                   onChange={handleInputChange}
//                 />
//               </Form.Group>
//             </Form>
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={handleClose}>
//               Close
//             </Button>
//             <Button variant="primary" onClick={modaldataSubmit}>
//               Send Email
//             </Button>
//           </Modal.Footer>
//         </Modal>
//       </div>
//     </div>
<div className="container">
<h4 className="mt-5 text-center">Upload a Document</h4>
{error && <div className="alert alert-danger">{error}</div>}

<div className="btn-group mb-4">
  <Button
    variant={showUpload ? "primary" : "outline-primary"}
    onClick={() => handleToggle("upload")}
    className="btn-lg mx-2"
  >
    Upload Data
  </Button>
  <Button
    variant={!showUpload ? "primary" : "outline-primary"}
    onClick={() => handleToggle("visualize")}
    className="btn-lg mx-2"
  >
    Visualize Data
  </Button>
</div>

<div className="mb-3">
  <input
    type="file"
    className="form-control w-50 mx-auto"
    accept=".pdf, .jpg, .png , .xls, .xlsx"
    onChange={handleFileChange}
  />
</div>

<div className="text-center">
  <button className="btn btn-primary btn-lg" onClick={handleUpload}>
    Upload
  </button>
</div>

{file && (
  <div className="mt-3 text-center">
    <p>
      <strong>Selected File:</strong> {file.name}
    </p>
  </div>
)}

<div>
  {showUpload && (
    <div style={{ width: "50vw", margin: "0 auto" }}>
      <span className="mt-5">Uploaded Files</span>

      {uploadedFiles.length > 0 && (
        <>
          <table className="table mt-4 table-hover">
            <thead className="thead-dark">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {uploadedFiles.slice(page * 10 - 10, page * 10).map((uploadedFile, index) => (
                <tr key={uploadedFile._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{uploadedFile.filename}</td>
                  <td>
                    <button
                      className="btn btn-primary mx-1"
                      onClick={() => handleDownload(uploadedFile.filename)}
                      title="Download File"
                    >
                      Download
                    </button>
                    <button
                      className="btn btn-success mx-1"
                      onClick={() => handleShare(uploadedFile.filename)}
                      title="Share File"
                    >
                      Share
                    </button>
                    <button
                      className="btn btn-danger mx-1"
                      onClick={() => handleDelete(uploadedFile._id, index)}
                      title="Delete File"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      <div className="pagination text-center">
        <button
          onClick={() => handlePageChange(uploadedPage - 1, "uploaded")}
          disabled={uploadedPage === 1}
          className="btn btn-outline-secondary"
        >
          Previous
        </button>
        <span className="mx-3">
          Page {uploadedPage} of {uploadedTotalPages}
        </span>
        <button
          onClick={() => handlePageChange(uploadedPage + 1, "uploaded")}
          disabled={uploadedPage === uploadedTotalPages}
          className="btn btn-outline-secondary"
        >
          Next
        </button>
      </div>
    </div>
  )}

  {!showUpload && (
    <div style={{ width: "50vw", margin: "0 auto" }}>
      <span className="mt-5">Visualize Files</span>

      {visualizeFiles.length > 0 && (
        <table className="table mt-4 table-hover">
          <thead className="thead-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {visualizeFiles.map((visualizeFile, index) => (
              <tr key={visualizeFile._id}>
                <th scope="row">{index + 1}</th>
                <td>{visualizeFile.name}</td>
                <td>
                  <button
                    className="btn btn-primary mx-1"
                    onClick={() => PDFDownload(index)}
                    title="Download"
                  >
                    Download
                  </button>
                  <button
                    className="btn btn-success mx-1"
                    onClick={() => handleShare(visualizeFile._id)}
                    title="Share"
                  >
                    Share
                  </button>
                  <button
                    className="btn btn-danger mx-1"
                    onClick={() => handleDelete1(visualizeFile._id)}
                    title="Delete"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="pagination text-center">
        <button
          onClick={() => handlePageChange(visualizePage - 1, "visualize")}
          disabled={visualizePage === 1}
          className="btn btn-outline-secondary"
        >
          Previous
        </button>
        <span className="mx-3">
          Page {visualizePage} of {visualizeTotalPages}
        </span>
        <button
          onClick={() => handlePageChange(visualizePage + 1, "visualize")}
          disabled={visualizePage === visualizeTotalPages}
          className="btn btn-outline-secondary"
        >
          Next
        </button>
      </div>
    </div>
  )}
</div>

<Modal show={show} onHide={handleClose}>
  <Modal.Header closeButton>
    <Modal.Title>Send via Email</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form>
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="name@example.com"
          name="email"
          value={emailObj.email}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="attachment">
        <Form.Label>Attachment</Form.Label>
        <Form.Control
          type="text"
          name="attachment"
          value={emailObj.attachment}
          disabled
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="description"
          value={emailObj.description}
          onChange={handleInputChange}
        />
      </Form.Group>
    </Form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleClose}>
      Close
    </Button>
    <Button variant="primary" onClick={modaldataSubmit}>
      Send Email
    </Button>
  </Modal.Footer>
</Modal>
</div>
);
}

//   );
// }
