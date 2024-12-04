
// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import Slider from 'react-slick';  
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// export default function Image() {
//   const [uploadedFiles, setUploadedFiles] = useState([]);

  
// const fetchFiles = async () => {
//   try {
//     const response = await axios.get('http://localhost:5000/api/files/getimage');
//     console.log('Response data:', response.data);  // Log the full response

//     if (response.data.success) {
//       const images = [];
      
//       response.data.data.forEach((e) => {
//         const fileExtension = e.filename.split('.').pop().toLowerCase();
        
//         if (fileExtension === 'jpeg' || fileExtension === 'jpg') {
//           images.push(e.filename);
//         }
//       });
      
//       setUploadedFiles(images);
//     } else {
//       console.error('Failed to load files:', response.data.message);
//       alert('Failed to load files.');
//     }
//   } catch (error) {
//     console.error('Error fetching files:', error);
//     alert('Error fetching files.');
//   }
// };


//   useEffect(() => {
//     fetchFiles();
//   }, []);

//   return (
//     <div>
//       <button className="btn btn-primary" onClick={() => fetchFiles()}>
//         Upload
//       </button>

//       <div>
//         <h3>Uploaded Images</h3>
//         <ul>
//           {uploadedFiles.map((file, index) => (
//             <li key={index}>{file}</li>
//           ))}
//         </ul>

//         <div>
//           {uploadedFiles.map((file, index) => (
//             <img
//               key={index}
//               src={`http://localhost:5000/uploads/${file}`}
//               alt={`Uploaded ${file}`}
//               width="100vw"
//               height="100vh"
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }


 


// export default function Image() {
//   const [uploadedFiles, setUploadedFiles] = useState([]);

//   const fetchFiles = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/files/getimage');
//       console.log('Response data:', response.data);

//       if (response.data.success) {
//         const images = [];

//         response.data.data.forEach((e) => {
//           const fileExtension = e.filename.split('.').pop().toLowerCase();
          
//           if (fileExtension === 'jpeg' || fileExtension === 'jpg') {
//             images.push(e.filename);
//           }
//         });

//         setUploadedFiles(images);
//       } else {
//         console.error('Failed to load files:', response.data.message);
//         alert('Failed to load files.');
//       }
//     } catch (error) {
//       console.error('Error fetching files:', error);
//       alert('Error fetching files.');
//     }
//   };

//   useEffect(() => {
//     fetchFiles();
//   }, []);

  
//   const settings = {
//     dots: true,   
//     infinite: true,  
//     speed: 500,   
//     slidesToShow: 1,   
//     slidesToScroll: 1,  
//     autoplay: true, 
//     autoplaySpeed: 2000,  
//   };

//   return (
//     <div>
//       <button className="btn btn-primary" onClick={() => fetchFiles()}>
//         Upload
//       </button>

//       <div>
//         <h3>Uploaded Images</h3>
        
        
//         <Slider {...settings}>
//           {uploadedFiles.map((file, index) => (
//             <div key={index}>
//               <img
//                 src={`http://localhost:5000/uploads/${file}`}
//                 alt={`Uploaded ${file}`}
//                 width="100%"   
//                 height="auto"   
//               />
//             </div>
//           ))}
//         </Slider>
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Image() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [sliderRef, setSliderRef] = useState(null); 
  const [activeSlide, setActiveSlide] = useState(0);
  const [isNextVisible, setIsNextVisible] = useState(true);  
  const fetchFiles = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/files/getimage"
      );
      if (response.data.success) {
        const images = [];
        response.data.data.forEach((e) => {
          const fileExtension = e.filename.split(".").pop().toLowerCase();
          if (["jpeg", "jpg", "png"].includes(fileExtension)) {
            images.push(e.filename);
          }
        });
        setUploadedFiles(images);
      } else {
        alert("Failed to load files.");
      }
    } catch (error) {
      alert("Error fetching files.");
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
    beforeChange: (current, next) => setActiveSlide(next), 
  };

  
  const handleImageClick = (index) => {
    if (sliderRef) {
      sliderRef.slickGoTo(index); 
    }
  };

 
  const updateNavigationButton = (current, next) => {
    if (next === 0) {
      setIsNextVisible(true); // Show right button
    } else if (next === uploadedFiles.length - 1) {
      setIsNextVisible(false); // Show left button
    } else {
      setIsNextVisible(true); // Show right button
    }
  };

  return (
    <div
      style={{
        position: "relative",
        padding: "20px",
        maxWidth: "1000px",
        margin: "20px auto",
        backgroundColor: "#000",
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      {/* Navigation Button (only one visible at a time) */}
      {isNextVisible ? (
        <button
          onClick={() => sliderRef.slickNext()} // Move to the next slide
          style={{
            position: "absolute",
            top: "50%",
            right: "10px",
            transform: "translateY(-50%)",
            zIndex: 2,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "#fff",
            border: "none",
            borderRadius: "50%",
            padding: "10px",
            cursor: "pointer",
          }}
        >
          &#10095; {/* Right arrow */}
        </button>
      ) : (
        <button
          onClick={() => sliderRef.slickPrev()} // Move to the previous slide
          style={{
            position: "absolute",
            top: "50%",
            left: "10px",
            transform: "translateY(-50%)",
            zIndex: 2,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "#fff",
            border: "none",
            borderRadius: "50%",
            padding: "10px",
            cursor: "pointer",
          }}
        >
          &#10094; {/* Left arrow */}
        </button>
      )}

      {/* Slider */}
      <Slider {...settings} ref={setSliderRef} beforeChange={updateNavigationButton}>
        {uploadedFiles.map((file, index) => (
          <div
            key={index}
            onClick={() => handleImageClick(index)} // Handle image click
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "400px",
              transition: "transform 0.5s ease, opacity 0.5s ease",
              transform: index === activeSlide ? "scale(1)" : "scale(0.8)",
              opacity: index === activeSlide ? 1 : 0.6,
              cursor: "pointer",
            }}
          >
            <img
              src={`http://localhost:5000/uploads/${file}`}
              alt={`Uploaded ${file}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "10px",
                boxShadow:
                  index === activeSlide
                    ? "0 4px 15px rgba(255, 255, 255, 0.8)"
                    : "none",
              }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
