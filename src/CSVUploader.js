import React, { useState } from "react";
import { uploadFileToDropbox } from "./dropbox";

const CSVUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    console.log("File Change Triggered:", event.target.files);
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("No file selected");
      return;
    }

    console.log("Uploading file:", selectedFile);
    try {
      await uploadFileToDropbox(selectedFile);
      alert("Upload successful!");
    } catch (error) {
      console.error("Upload error:", error);
      alert(`Upload failed: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Upload CSV to Dropbox</h2>
      <form>
        <input type="file" accept=".csv" onChange={handleFileChange} />
        <button type="button" onClick={handleUpload}>Upload</button>
      </form>
    </div>
  );
};

export default CSVUploader;
