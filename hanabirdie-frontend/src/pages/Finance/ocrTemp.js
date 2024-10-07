// import React, { useState, useEffect } from "react";
// import Modal from "react-modal";
// import axios from "axios";

// // 모달 스타일 설정
// const customStyles = {
//   content: {
//     top: "50%",
//     left: "50%",
//     right: "auto",
//     bottom: "auto",
//     marginRight: "-50%",
//     transform: "translate(-50%, -50%)",
//   },
// };

// // 모달 접근성을 위한 설정
// Modal.setAppElement("#root");

// const FinancialStatementUploader = () => {
//   const [modalIsOpen, setIsOpen] = useState(false);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [previewSrc, setPreviewSrc] = useState("");
//   const [ocrText, setOcrText] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [parsedData, setParsedData] = useState([]);
//   const [error, setError] = useState(null); // 에러 상태 추가

//   // 모달 열기
//   const openModal = () => {
//     setIsOpen(true);
//   };

//   // 모달 닫기
//   const closeModal = () => {
//     setIsOpen(false);
//     setSelectedFile(null);
//     setPreviewSrc("");
//     setOcrText("");
//     setParsedData([]);
//     setError(null); // 에러 초기화
//   };

//   // 파일 선택 핸들러
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setSelectedFile(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreviewSrc(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // 파일 업로드 및 OCR 추출 핸들러
//   const handleUpload = async () => {
//     if (!selectedFile) {
//       alert("파일을 선택해주세요.");
//       return;
//     }

//     setLoading(true);
//     setError(null); // 에러 초기화

//     try {
//       const reader = new FileReader();
//       reader.onloadend = async () => {
//         const base64Image = reader.result.split(",")[1]; // base64 데이터만 추출

//         // base64Image가 비어있지 않은지 확인
//         if (!base64Image) {
//           throw new Error("이미지 파일을 읽는 데 실패했습니다.");
//         }

//         const requestPayload = {
//           requests: [
//             {
//               image: {
//                 content: base64Image,
//               },
//               features: [
//                 {
//                   type: "TEXT_DETECTION",
//                 },
//               ],
//             },
//           ],
//         };

//         const apiKey = process.env.REACT_APP_GOOGLE_VISION_API_KEY;
//         console.log("API Key:", apiKey); // API 키 확인용 로그

//         if (!apiKey || apiKey === "YOUR_API_KEY_HERE") {
//           throw new Error("Google Vision API 키가 설정되지 않았습니다.");
//         }

//         const response = await axios.post(
//           `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`,
//           requestPayload,
//           {
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         // 응답 데이터 확인
//         if (
//           response.data.responses &&
//           response.data.responses[0].fullTextAnnotation
//         ) {
//           const detectedText =
//             response.data.responses[0].fullTextAnnotation.text;
//           console.log("추출된 텍스트:", detectedText);
//           setOcrText(detectedText);
//           parseOcrText(detectedText);
//         } else {
//           console.warn("추출된 텍스트가 없습니다.");
//           setOcrText("");
//           setParsedData([]);
//         }

//         setLoading(false);
//         closeModal(); // 모달 닫기
//       };

//       reader.readAsDataURL(selectedFile);
//     } catch (error) {
//       console.error("OCR 처리 중 오류 발생:", error);
//       setError(error.response ? error.response.data : error.message);
//       setLoading(false);
//       alert("OCR 처리 중 오류가 발생했습니다.");
//     }
//   };

//   // OCR 텍스트를 파싱하여 재무상태표 형식으로 변환
//   const parseOcrText = (text) => {
//     const lines = text
//       .split("\n")
//       .map((line) => line.trim())
//       .filter((line) => line !== "");
//     const data = [];
//     let currentSection = null;
//     let currentSubSection = null;

//     lines.forEach((line) => {
//       // 섹션 (예: 자산, 부채)
//       if (/^(자산|부채|자본|수익|비용)$/.test(line)) {
//         currentSection = { title: line, subSections: [] };
//         data.push(currentSection);
//         currentSubSection = null;
//       }
//       // 하위 섹션 (예: 1. 유동자산, II. 비유동자산)
//       else if (/^\d+\.|^[IVX]+\.|^\(\d+\)/.test(line)) {
//         if (currentSection) {
//           currentSubSection = { title: line, items: [] };
//           currentSection.subSections.push(currentSubSection);
//         }
//       }
//       // 항목 및 값
//       else {
//         if (currentSubSection) {
//           // 항목과 값이 함께 있는 경우 (예: 현금및현금성자산 3,796,988,311)
//           const match = line.match(/^(.+?)\s+([\d,()]+)/);
//           if (match) {
//             const [_, item, value] = match;
//             currentSubSection.items.push({ item, value });
//           } else {
//             // 값만 있는 경우 (예: 4,913,025,580)
//             const valueMatch = line.match(/^([\d,()]+)/);
//             if (valueMatch) {
//               const [_, value] = valueMatch;
//               currentSubSection.items.push({ item: "", value });
//             }
//           }
//         }
//       }
//     });

//     setParsedData(data);
//   };

//   // 재무상태표를 화면에 렌더링
//   const renderFinancialStatement = (data) => {
//     return data.map((section, idx) => (
//       <div key={idx} style={{ marginBottom: "20px" }}>
//         <h3>{section.title}</h3>
//         {section.subSections.map((subSection, subIdx) => (
//           <div
//             key={subIdx}
//             style={{ marginLeft: "20px", marginBottom: "10px" }}
//           >
//             <h4>{subSection.title}</h4>
//             <table
//               style={{
//                 width: "100%",
//                 borderCollapse: "collapse",
//                 marginTop: "10px",
//               }}
//             >
//               <thead>
//                 <tr>
//                   <th style={{ border: "1px solid #ddd", padding: "8px" }}>
//                     항목
//                   </th>
//                   <th style={{ border: "1px solid #ddd", padding: "8px" }}>
//                     금액
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {subSection.items.map((item, itemIdx) => (
//                   <tr key={itemIdx}>
//                     <td style={{ border: "1px solid #ddd", padding: "8px" }}>
//                       {item.item}
//                     </td>
//                     <td
//                       style={{
//                         border: "1px solid #ddd",
//                         padding: "8px",
//                         textAlign: "right",
//                       }}
//                     >
//                       {item.value}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         ))}
//       </div>
//     ));
//   };

//   // useEffect로 OCR 데이터를 받았을 때 컴포넌트가 다시 렌더링되도록 설정
//   useEffect(() => {
//     if (ocrText && parsedData.length > 0) {
//       // 추출된 데이터가 있으면 컴포넌트를 다시 렌더링
//       console.log("데이터가 성공적으로 업데이트되었습니다.");
//     }
//   }, [ocrText, parsedData]); // ocrText 또는 parsedData가 변경될 때마다 호출

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>재무상태표 업로드</h2>
//       <button onClick={openModal}>재무상태표 업로드하기</button>

//       <Modal
//         isOpen={modalIsOpen}
//         onRequestClose={closeModal}
//         style={customStyles}
//         contentLabel="재무상태표 업로드 모달"
//       >
//         <h2>파일 첨부</h2>
//         <input
//           type="file"
//           accept="image/*,application/pdf"
//           onChange={handleFileChange}
//         />
//         {previewSrc && (
//           <div style={{ marginTop: "10px" }}>
//             {selectedFile.type.startsWith("image/") ? (
//               <img
//                 src={previewSrc}
//                 alt="미리보기"
//                 style={{ maxWidth: "100%", height: "auto" }}
//               />
//             ) : (
//               <p>PDF 파일은 미리보기를 지원하지 않습니다.</p>
//             )}
//           </div>
//         )}
//         {loading ? (
//           <p>OCR 처리 중...</p>
//         ) : (
//           <div style={{ marginTop: "10px" }}>
//             <button onClick={handleUpload}>업로드 및 추출</button>
//             <button onClick={closeModal} style={{ marginLeft: "10px" }}>
//               닫기
//             </button>
//           </div>
//         )}
//         {error && (
//           <div style={{ marginTop: "10px", color: "red" }}>
//             <p>오류: {error.error || error.message}</p>
//           </div>
//         )}
//       </Modal>

//       {ocrText && (
//         <div style={{ marginTop: "20px" }}>
//           <h3>추출된 재무상태표 데이터 (전체 텍스트)</h3>
//           <textarea
//             value={ocrText}
//             readOnly
//             rows={10}
//             style={{ width: "100%", resize: "none" }}
//           />
//         </div>
//       )}

//       {parsedData.length > 0 && (
//         <div style={{ marginTop: "20px" }}>
//           <h3>추출된 재무상태표 데이터 (재무상태표 형식)</h3>
//           {renderFinancialStatement(parsedData)}
//         </div>
//       )}
//     </div>
//   );
// };

// export default FinancialStatementUploader;
